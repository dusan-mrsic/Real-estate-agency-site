const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("./models/user.js");
const RealEstate = require("./models/real_estate");
const RealEstateOffer = require("./models/real_estate_offer.js");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
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
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    console.log(name);
    cb(null, name + "-" + Date.now() + "." + ext);
  },
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

appLogin.post(
  "/addRealEstate",
  multer({ storage: storage }).array("files"),
  (req, res, next) => {
    images = new Array();
    const url = req.protocol + "://" + req.get("host");
    var files = [];
    var fileKeys = Object.keys(req.files);
    fileKeys.forEach(function (key) {
      images.push(url + "/images/" + req.files[key].filename);
    });
    console.log(files);
    const estate = new RealEstate({
      description: req.body.description,
      city: req.body.city,
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
      user_or_agency: req.body.owner,
      username: req.body.username,
      accepted: parseInt(req.body.accepted),
      promoted: parseInt(req.body.promoted),
    });

    estate.save().then((result) => {
      if (!result) {
        return res.status(500).json({
          message: "Error Creating Estate!",
        });
      }
      res.status(201).json({
        message: "Added real estate!",
        result: result,
      });
    });
  }
);

appLogin.post("/changeRealEstate", (req, res, next) => {
  const estate = new RealEstate({
    _id: req.body._id,
    description: req.body.description,
    city: req.body.city,
    municipality: req.body.municipality,
    address: req.body.address,
    house_or_apartment: req.body.house_or_apartment,
    numberOfFloorsHouse: req.body.numberOfFloorsHouse,
    floorApartment: req.body.floorApartment,
    floorsOfBuilding: req.body.floorsOfBuilding,
    images: req.body.images,
    quadrature: req.body.quadrature,
    numberOfRooms: req.body.numberOfRooms,
    furnished_or_unfurnished: req.body.furnished_or_unfurnished,
    forRent_or_forSale: req.body.forRent_or_forSale,
    price: req.body.price,
    user_or_agency: req.body.user_or_agency,
    username: req.body.username,
    accepted: req.body.accepted,
    promoted: req.body.promoted,
  });
  console.log(estate);
  RealEstate.replaceOne({ description: req.body.description }, estate)
    .then((result) => {
      if (!result) {
        return res.status(500).json({
          message: "Error changing info!",
        });
      }
      res.status(201).json({
        message: "Info changed!",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

appLogin.post("/searchEstates", (req, res, next) => {
  if (req.body.city) {
    RealEstate.find({
      city: req.body.city,
      price: { $gt: req.body.priceMin, $lt: req.body.priceMax },
    }).then((realEstate) => {
      res.json(realEstate);
    });
  } else {
    RealEstate.find({
      price: { $gt: req.body.priceMin, $lt: req.body.priceMax },
    }).then((realEstate) => {
      res.json(realEstate);
    });
  }
});

appLogin.post("/searchMyEstates", (req, res, next) => {
  console.log(req.body.username);
  RealEstate.find({ username: req.body.username }).then((realEstate) => {
    res.json(realEstate);
  });
});

appLogin.post("/getAllEstates", (req, res, next) => {
  RealEstate.find({}).then((realEstates) => {
    res.json(realEstates);
  });
});

appLogin.post("/promoted", (req, res, next) => {
  RealEstate.find({promoted: 1}).then((realEstates) => {
    res.json(realEstates);
  });
});

appLogin.post(
  "/register",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const url = req.protocol + "://" + req.get("host");
      console.log(req.body.password);
      const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hash,
        email: req.body.email,
        city: req.body.city,
        state: req.body.state,
        image: url + "/images/" + req.file.filename,
        accepted: parseInt(req.body.accepted),
      });

      User.findOne({ username: req.body.username })
        .then((user1) => {
          if (user1) {
            return res.status(401).json({
              message: "User Already Exist!",
            });
          }

          user.save().then((result) => {
            if (!result) {
              return res.status(500).json({
                message: "Error Creating User!",
              });
            }
            res.status(201).json({
              message: "User created!",
              result: result,
            });
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    });
  }
);

appLogin.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ username: req.body.username, accepted: 1 })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed! User does not exist!",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password).then((result) => {
        if (!result) {
          return res.status(401).json({
            message: "Authentication failed! Inccorect password!",
          });
        }
        const token = jwt.sign(
          { username: fetchedUser.username, userId: fetchedUser._id },
          "secret_this_should_be_longer", // make other secret
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id,
        });
      });
    })
    .catch((e) => {
      res.status(500).json({
          message: "Authentication failed! User does not exist!"
      });
    });
});

appLogin.post("/getUser", (req, res, next) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res.status(401).json({
        message: "User does not exist!",
      });
    }
    res.status(200).json({
      user: user,
    });
  });
});

appLogin.post(
  "/changePersonalInfo",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const user = new User({
      _id: req.body._id,
      name: req.body.name,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      city: req.body.city,
      state: req.body.state,
      image: url + "/images/" + req.file.filename,
      accepted: 1
    });

    console.log(user);

    User.replaceOne({ _id: req.body._id }, user)
      .then((result) => {
        if (!result) {
          return res.status(500).json({
            message: "Error Creating User!",
          });
        }
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
);

appLogin.post("/changePersonalInfoWithNoImage", (req, res, next) => {
  const user = new User({
    _id: req.body._id,
    name: req.body.name,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    city: req.body.city,
    state: req.body.state,
    image: req.body.image,
    accepted: 1
  });

  console.log(user);

  User.replaceOne({ _id: req.body._id }, user)
    .then((result) => {
      if (!result) {
        return res.status(500).json({
          message: "Error Creating User!",
        });
      }
      res.status(201).json({
        message: "User created!",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

appLogin.post("/getAllUsers", (req, res, next) => {
  User.find().then((allUsers) => {
    res.json(allUsers);
  });
});

appLogin.post("/deleteUser", (req, res, next) => {
  User.deleteOne({ username: req.body.username })
    .then((result) => {
      if (!result) {
        return res.status(500).json({
          message: "Error deleteing User!",
        });
      }
      res.status(201).json({
        message: "User deleted!",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

appLogin.post("/acceptUser", (req, res, next) => {
  console.log(req.body.username);
  User.findOneAndUpdate(
    { username: req.body.username },
    { $set: { accepted: 1 } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
    }
  );
});

appLogin.post("/acceptEstate", (req, res, next) => {
  console.log(req.body.estate);
  RealEstate.findOneAndUpdate(
    { description: req.body.estate },
    { $set: { accepted: 1 } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
});

appLogin.post("/deleteEstate", (req, res, next) => {
  RealEstate.deleteOne({ description: req.body.estate })
    .then((result) => {
      if (!result) {
        return res.status(500).json({
          message: "Error deleteing User!",
        });
      }
      res.status(201).json({
        message: "User deleted!",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

appLogin.post("/promoteEstate", (req, res, next) => {
  RealEstate.findOneAndUpdate(
    { description: req.body.estate },
    { $set: { promoted: 1 } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
    }
  );
});

appLogin.post("/unpromoteEstate", (req, res, next) => {
  RealEstate.findOneAndUpdate(
    { description: req.body.estate },
    { $set: { promoted: 0 } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
    }
  );
});

appLogin.post("/getAllUserRequests", (req, res, next) => {
  User.find({ accepted: 0 }).then((users) => {
    if (!users) {
      return res.status(401).json({
        message: "User does not exist!",
      });
    }
    res.status(200).json(users);
  });
});

appLogin.post("/getAllEstateRequests", (req, res, next) => {
  RealEstate.find({ accepted: 0 }).then((estates) => {
    if (!estates) {
      return res.status(401).json({
        message: "Estate does not exist!",
      });
    }
    res.status(200).json(estates);
  });
});

appLogin.post("/getOffers", (req, res, next) => {
  RealEstateOffer.find({ ownerEstate: req.body.username }).then((offers) => {
    if (!offers) {
      return res.status(401).json({
        message: "Estate does not exist!",
      });
    }
    res.status(200).json(offers);
  });
});

appLogin.post("/getAllOffers", (req, res, next) => {
  RealEstateOffer.find().then((offers) => {
    if (!offers) {
      return res.status(401).json({
        message: "Estate does not exist!",
      });
    }
    res.status(200).json(offers);
  });
});

appLogin.post("/addOffer", (req, res, next) => {
  const estateOffer = new RealEstateOffer({
    idEstate: req.body.idEstate,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    ownerEstate: req.body.ownerEstate,
    offerUsername: req.body.offerUsername,
    accepted: req.body.accepted,
  });

  estateOffer.save().then((result) => {
    if (!result) {
      return res.status(500).json({
        message: "Error Creating Estate offer!",
      });
    }
    res.status(201).json({
      message: "Added real estate offer!",
      result: result,
    });
  });
});

appLogin.post("/acceptOffer", (req, res, next) => {
  RealEstateOffer.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { accepted: 1 } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
    }
  );
  RealEstateOffer.deleteMany({ description: req.body.description, accepted: 0 })
  .then((result) => {
    if (!result) {
      return res.status(500).json({
        message: "Error deleteing Offer!",
      });
    }
    res.status(201).json({
      message: "Offer deleted!",
      result: result,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
});

appLogin.post("/declineOffer", (req, res, next) => {
  RealEstateOffer.deleteOne({ _id: req.body._id })
    .then((result) => {
      if (!result) {
        return res.status(500).json({
          message: "Error deleteing Offer!",
        });
      }
      res.status(201).json({
        message: "Offer deleted!",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

appLogin.post("/confirmOffer", (req, res, next) => {
  RealEstateOffer.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { accepted: 2 } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
    }
  );
  RealEstate.deleteOne({ description: req.body.description })
    .then((result) => {
      if (!result) {
        return res.status(500).json({
          message: "Error deleteing estate!",
        });
      }
      res.status(201).json({
        message: "Estate deleted!",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

appLogin.post('/getAllEstatesByCity', (req,res,next) => {

  RealEstate.aggregate([
    {$match : {accepted: 1}},
    {$group : { _id : "$city", count : {$sum : 1}}}]
  ).then( estates => {
    res.status(201).json(JSON.stringify(estates));
  });

});

appLogin.post('/getAllHouseForSale', (req,res,next) => {

  RealEstate.find({house_or_apartment: 1}).count(function (err, count) {
    if (err) console.log(err)
    else res.json(count);
});
})


appLogin.post('/getAllApartmentsForSale', (req,res,next) => {

  RealEstate.find({house_or_apartment: 2}).count(function (err, count) {
    if (err) console.log(err)
    else res.json(count);
});
})

appLogin.post('/getAllEstatesByPrice', (req,res,next) => {

  RealEstate.find({price : { $gt: 0, $lt: 100000 }}).count(function (err, count) {
    if (err) console.log(err)
    var val1 = count;
    RealEstate.find({price : { $gt: 100000, $lt: 300000 }}).count(function (err, count) {
      if (err) console.log(err)
      var val2 = count;
      RealEstate.find({price : { $gt: 300000, $lt: 500000 }}).count(function (err, count) {
        if (err) console.log(err)
        var val3 = count;
        RealEstate.find({price : { $gt: 500000, $lt: 700000 }}).count(function (err, count) {
          if (err) console.log(err)
          var val4 = count;
          RealEstate.find({price : { $gt: 700000 }}).count(function (err, count) {
            if (err) console.log(err)
            var val5 = count;
            res.json({val1: val1, val2: val2, val3: val3, val4: val4, val5: val5});
        });
      });
    });
  });
});
})

appLogin.post("/changePassword", (req, res, next) => {
  console.log(req.body.username);
  console.log(req.body.oldP);
  console.log(req.body.newP);
  console.log(req.body.confirmP);
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "User does not exist!",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.oldP, user.password).then((result) => {
        if (!result) {
          return res.status(401).json({
            message: "Bad old password!",
          });
        }
        if(req.body.newP != req.body.confirmP){
          return res.status(401).json({
            message: "Passwords must match!",
          });
        }
        bcrypt.hash(req.body.newP, 10).then((hash) => {
          User.findOneAndUpdate(
            { username: req.body.username },
            { $set: { password: hash } },
            { new: true },
            (err, doc) => {
              if (err) {
                console.log("Something wrong when updating password!");
              }
            }
          );
        });
      });
    })
    .catch((e) => {
      res.status(500).json({
          message: "Pasword change failed!"
      });
    });
});



module.exports = appLogin;
