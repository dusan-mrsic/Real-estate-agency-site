const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoose1 = require('mongoose');

const User = require('./models/user.js');
const RealEstate = require('./models/real_estate');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

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
    console.log(name);
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});





const appLogin = express();
appLogin.use(cors());
appLogin.use(bodyParser.json());
appLogin.use("/images", express.static(path.join("src/backend/images")));

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

appLogin.post('/addRealEstate', multer({ storage: storage }).array('files'), (req, res, next) => {

  images = new Array();
  const url = req.protocol + '://' + req.get("host");
  var files = [];
  var fileKeys = Object.keys(req.files);
  fileKeys.forEach(function(key) {
    images.push(url + "/images/" + req.files[key].filename)
  });
  console.log(files);
    const estate =  new RealEstate({
      description: req.body.description,
      city:req.body.city,
      municipality: req.body.municipality,
      address: req.body.address,
      house_or_apartment: req.body.houseOrApartment,
      numberOfFloorsHouse: parseInt(req.body.house),
      floorApartment: parseInt(req.body.apartment1),
      floorsOfBuilding: parseInt(req.body.apartment2),
      images: images,
      quadrature: parseInt(req.body.quadrature),
      numberOfRooms: parseInt(req.body.rooms),
      furnished_or_unfurnished: req.body.furnished,
      forRent_or_forSale: req.body.forRent,
      price: parseInt(req.body.price),
      user_or_agency: req.body.owner
    })

    estate.save().then(result => {
      if(!result){
        return res.status(500).json({
          message: "Error Creating Estate!"
        })
      }
      res.status(201).json({
        message: "User created!",
        result: result
      })
    })
})


appLogin.post('/searchEstates', (req, res, next) => {

  if(req.body.city) {RealEstate.find({city: req.body.city, price: {$gt : req.body.priceMin, $lt : req.body.priceMax}}).then(realEstate => {
      res.json(realEstate);
    })
  }else{
    console.log(req.body.priceMin);
    console.log(req.body.priceMax);
    RealEstate.find({price: {$gt : req.body.priceMin, $lt : req.body.priceMax}}).then(realEstate => {
      res.json(realEstate);})
  }

})

appLogin.post('/register',  multer({ storage: storage }).single("image"), (req, res, next) => {

  bcrypt.hash(req.body.password, 10).then( hash => {
    const url = req.protocol + '://' + req.get("host");
    console.log(req.body.password);
    const user =  new User({
      name: req.body.name,
      lastName: req.body.lastName,
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
