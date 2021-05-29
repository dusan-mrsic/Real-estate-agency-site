const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/user.js');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer")

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "src/backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

mongoose.connect("mongodb+srv://dusan:dusan@cluster0.fhqxu.mongodb.net/UsersDB?retryWrites=true&w=majority")
  .then(() => {
      console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!")
  });

const appLogin = express();
appLogin.use(cors());
appLogin.use(bodyParser.json());

appLogin.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


appLogin.post('/register',  multer({ storage: storage }).single("image"), (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then( hash => {
    const url = req.protocol + '://' + req.get("host");
    console.log(req.body.password);
    const user =  new User({
      name: req.body.name,
      lastName: req.body.lastname,
      username: req.body.username,
      password: hash,
      email: req.body.email,
      city: req.body.city,
      state: req.body.state,
      image: url + "/images/" + req.file.filename
    })

    User.findOne({ username:req.body.username }).then(user1 => {
      if(user1){
        return res.status(401).json({
          message: "User Already Exist!"
        })
      }

      user.save().then(result => {
        if(!result){
          return res.status(500).json({
            message: "Error Creating User!"
          })
        }
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  });
});

appLogin.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ username: req.body.username }).then(user => {
      if(!user){
        return res.status(401).json({
          message: "Authentication failed! User does not exist!"
        })
      }
      fetchedUser=user;
      console.log(req.body.password);
      console.log(user.password);
      return bcrypt.compare(req.body.password, user.password).then( result => {
        if(!result){
          return res.status(401).json({
            message: "Authentication failed! Inccorect password!"
          })
        }
        const token = jwt.sign(
          { username: fetchedUser.username, userId: fetchedUser._id },
          "secret_this_should_be_longer", // make other secret
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id
        });
      })
    })
    .catch(e=>{
      console.log(e)
    });
});


module.exports = appLogin;
