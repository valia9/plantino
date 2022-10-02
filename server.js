const express = require('express');
const Plant = require('./models/Plant');
const User = require('./models/User');
const connectDB = require("./db/db.js");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');
const MongoStore = require('connect-mongo');

if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}


const secret = process.env.SECRET;

const app = express();

connectDB();

app.set('port', (process.env.PORT || 5000));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "//plantino.herokuapp.com/mylist"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(session({
  secret,
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    touchAfter: 24 * 3600 // time period in seconds
  })
}));

const sessionConfig = {
  secret,
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 3600000,
    }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function generateAccessToken(username) {
    return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: "1800s", });
  }


  // routes

  

    app.get("/api", async (req, res) => {
        try {
          const plants = await Plant
          .find({ owner: req.user._id })
          // .find({})
          .sort({lastWatered: -1});
          // console.log(req.user)
          res.set('Content-Type', 'application/json');
          res.status(200).send(plants)
      } catch (err) {
          console.log(err);
          res.status(500).send();
      }
      })

    app.patch("/api", async (req, res) => {
        const id = req.body;
        const date = new Date();

        try {
        const plant = await Plant.findOneAndUpdate(
            { "_id": id } , 
            { $set: { lastWatered: date } }
            );
        await plant.save();
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
        })

    app.delete("/api", async (req, res) => {
        const id = req.body;

        try {
        await Plant.findByIdAndDelete(id);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
        })

    app.post("/addplant", 
    // validation on adding the new plant
      body('name').isAlphanumeric('cs-CZ', {ignore: ' '}),
      body('lastWatered').isDate(),
      body('daysBtwWatering').isNumeric({no_symbols: true}),
      body('notes').isLength({min:0, max: 180}).escape(),
      // [body('name').blacklist(input, '\\[\\]').trim()],
      // [body('notes').blacklist(input, '\\[\\]').trim()],

      async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

          const {name, lastWatered, daysBtwWatering, notes} = req.body;
          const owner = req.user._id; 

          const newPlant = await Plant.create({
              name,
              lastWatered,
              daysBtwWatering,
              notes,
              owner
          }); 
        

          newPlant.save((err, plant) => {
            if (err) {
              res.send(err);
            }
            res.json(plant);
            });
          });

    app.post("/signup", 
        // validation on creating a new account
        body('username').isLength({min:6, max: 20}).escape(),
        body('email').isEmail().escape(),
        body('password').isLength({min:8, max: 20}).escape().isAlphanumeric(),

        async (req, res) => {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

            const {username, email, password} = req.body;
            const user = new User({username, email});
            const newUser = await User.register(user, password);
            res.redirect('/');
        })

    app.post("/signin",
        // sanitizing the login
        body('username').escape(),
        body('password').escape(),

        passport.authenticate('local', {failureRedirect: '/signin'}), (req, res) => {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
            const {username} = req.body;
            console.log('success')
            const user = User.findOne(
                { "username": username }
                )
          
          if (user) {
            const token = generateAccessToken(user.username);
            res.json({
              token: `Bearer ${token}`,
            });
            console.log('token generated!')
          } else res.sendStatus(401); 
        })

    app.post('/logout', function(req, res, next) {
          req.logout(function(err) {
            if (err) { return next(err); }
          console.log('logged out!')
          res.redirect('/');
          });
        });

        if (process.env.NODE_ENV === "production") {
          app.use(express.static("./frontend/build"));
          const path = require('path')
        
          app.get("/", (req, res) => {
            res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'))
          });
        
          app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'))
          });
        }

    app.listen(process.env.PORT || 5000, console.log(`Server running`));