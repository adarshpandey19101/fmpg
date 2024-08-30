
//index.js
var express = require('express');
var router = express.Router();
const userModel = require("../models/users");
const roomModel = require("../models/Room");
const passport = require('passport');
const localStrategy = require("passport-local");
const { error } = require('console');
const Booking = require('../models/Booking'); 
const Property=require('../models/Property');
const flash=require("connect-flash");

// const bookingModel = require("./Booking");

passport.use(new localStrategy(userModel.authenticate()));



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/api/bookings', (req, res) => {
  res.json({ message: 'Bookings fetched successfully' });
});

router.get('/booking', isLoggedIn, async function(req, res, next) {
  const user =await userModel.findOne({
    username: req.session.passport.user
  })
  try {
    const rooms = await roomModel.find();
    // res.render('/', {rooms:rooms });
    console.log(rooms)
  } catch (err) {
    console.error('Error fetching room:', err);
    res.status(500).send('Error fetching room');
  }
  console.log("here is it", user);
  res.render('booking', { user });

});
 

router.get('/TermsAndConditions', function(req, res, next) {
  res.render('TermsAndConditions');
});

router.get('/privacypolicy', function(req, res, next) {
  res.render('privacypolicy');
});

router.get('/FAQs', function(req, res, next) {
  res.render('FAQs');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});


router.get('/readmore', async function(req, res, next) {
  try {
      const propertyID = req.query.PropertyID.trim();  // Ensure propertyID is defined
      console.log(propertyID)
      const property = await Property.findById(propertyID).populate('rooms');
      if (!property) {
          return res.status(404).json({ error: 'Property not found' });
      }
      res.render('Readmore/readmore', { properties: property });
  } catch (err) {
      console.error("Error fetching property:", err);
      res.status(500).json({ error: err.message });
  }
});


router.get('/Radhe-Shyam-PG', function(req, res, next) {
  res.render('Radhe-Shyam-PG');
});

router.get('/Divine-Home', function(req, res, next) {
  res.render('Readmore/Divine-Home');
});

router.get('/Sahara-PG', function(req, res, next) {
  res.render('Sahara-PG');
});

router.get('/Heaven-PG', function(req, res, next) {
  res.render('Heaven-PG');
});

router.get('/Dadra-Farm-PG', function(req, res, next) {
  res.render('Dadra-Farm-PG');
});

router.get('/Shivalik-PG', function(req, res, next) {
  res.render('Shivalik-PG');
});

router.get('/404', function(req, res, next) {
  res.render('404');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/destination', function(req, res, next) {
  res.render('destination');
});

router.get('/search-page', function(req, res, next) {
  res.render('search-page');
});

router.get('/service', function(req, res, next) {
  res.render('service');
});

router.get('/team', function(req, res, next) {
  res.render('team');
});
router.get('/profile', isLoggedIn, async function(req, res, next) {
  try {
    const user = await userModel.findOne({ username: req.session.passport.user });
    const bookings = await Booking.find({ user: user._id }).populate('roomType').populate({
      path: 'roomType',
      populate: {
        path: 'property', // Assuming roomType has a reference to property
        model: 'Property', // Specify the model if necessary (optional if Mongoose can infer)
      }
    });
    
    console.log(user, bookings);
    
    res.render("profile", { user, bookings });
  } catch (err) {
    console.error("Error fetching profile data:", err);
    res.status(500).send("Internal Server Error");
  }
});





router.get('/signup', function(req, res) {
  res.render('signup');
});

router.post('/register', function(req, res) {
  const { username, email, mobile} = req.body;
  const userData = new userModel({ username, email, mobile });

  userModel.register(userData, req.body.password)
    .then(function(){
      passport.authenticate("local")(req, res, function() {
        res.redirect("/profile");
      })
    })
    .catch(function(err) {
      console.error(err);
      res.redirect("/login");
    });
});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/index",
  failureRedirect: "/login",
  failureFlash: true
}), function(req, res) {
});

router.get('/login', function(req, res) {
  const errorMessage = req.flash('error',"Invalid Username and Passward");
  console.log('Flash message:', errorMessage); // Add this to debug
  res.render('login', { error: errorMessage });
});


router.get('/logout', function(req, res ) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};



// router.get('/booking', async function(req, res, next) {
//   console.log("ho gya");
//   try {
//     console.log('Room ID from session:', req.session.passport.room);
    
//     const roomT = await roomModel.findOne({
//       property: req.session.passport.room
//     });

//     if (!roomT) {
//       console.log('Room not found');
//       return res.status(404).send('Room not found');
//     }

//     console.log('Fetched Room:', roomT); // Debugging line
//     res.render("booking", { roomT });
//   } catch (err) {
//     console.error('Error fetching room:', err);
//     res.status(500).send('Error fetching room');
//   }
// });




module.exports = router;