const express = require('express');
const router = express.Router();
const Property = require('../models/Property'); // Ensure the path is correct
const rooms=require("../models/Room")

// Create a new property
router.get('/createproperty', async (req, res) => {
  try {
    console.log("Entered create property route");
    const properties = await Property.insertMany([
      {
        name: "Shivalik PG",
        location: ["Pussgrc  :-  600m", "Hoshiarpur bus stand :- 7km","Hoshiarpur Railway Station :- 6.5km"],
        type: "PG",
        images: ["https://icecube-eu-406.icedrive.io/thumbnail?p=5dnOk_v4Br0SaUXbvqH_YwRTWBCIBeD8bMCzWo8OzWSw17VAV503LTqmNFWNxIXPadhGDJt9efZBMoWKBIQ.NyDlyLGz8uHpUKktTHrYuxBW5vNvCcpi4KLTxaTjTHZFY2SKApj8zCyvI7Pp4HqeeQ--&w=1024&h=1024&m=cropped","https://icecube-eu-406.icedrive.io/thumbnail?p=hFV6rX_SOzSpBhV0BjH8GaVEzF8X.bla6azkF8ay1DlhuASrhN8Ub0.CFGcqhpD8s2_5PL9yO47ga4eydx2TLyDlyLGz8uHpUKktTHrYuxBW5vNvCcpi4KLTxaTjTHZFY2SKApj8zCyvI7Pp4HqeeQ--&w=1024&h=1024&m=cropped","https://icecube-eu-406.icedrive.io/thumbnail?p=2u1KHHTOqJTINRvSGgu4HaKfjTP3I0O3UBj17bcG71BACxmR_PkvRb0CvkqbR9kltx.KHEcG4HHZGCwugcZD6yDlyLGz8uHpUKktTHrYuxBW5vNvCcpi4KLTxaTjTHZFY2SKApj8zCyvI7Pp4HqeeQ--&w=1024&h=1024&m=cropped","https://icecube-eu-406.icedrive.io/download?p=n0F519plW9FD.traplC7eaj0S8oifSE73gTk0kgnHH.g7FE4unL_InEwlj9m5xoUdXhr5n3mOT6l1f7.qAEYx8nn9TOyO4ZLEuvVVU7nWEbip4ZNSk59M35XDgV9lppK6DE.RdtjWMsNFxi3A9XGUp2zXw4s9UomsoH5LYCIuqfm9pfTzXqRRKmtc13tindij_anpiOaV9XhFOIBPWFKKM5b7U20NtdVO.TJdzM2u9A-","https://ice-eu-11554568.icedrive.io/thumbnail?p=4m3C3mJywPcq6iDfOs9tu3YBrtwKtLCZPTWXqxQ0gRdbFwiMmIpeD_JWj08aESDL6C2EOnvaOIj2z8pR_z1z9yDlyLGz8uHpUKktTHrYuxBW5vNvCcpi4KLTxaTjTHZFY2SKApj8zCyvI7Pp4HqeeQ--&w=1024&h=1024&m=cropped"],
        map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d596.2901051922025!2d75.96645261982982!3d31.521505581003648!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ae3c77ed7b187%3A0x7e1e97621f579c17!2sPanjab%20University%20Swami%20Sarvanand%20Giri%20Regional%20Centre!5e1!3m2!1sen!2sin!4v1724883652954!5m2!1sen!2sin",
        amenities: ["Common Toilet and Bathroom Block", "Bed","Water","24*7 Electricity","Wifi(not include in rent)","Garden Available"],
        description: "Find yourself in a secure and comfortable living space that combines practical design with a welcoming atmosphere. With a focus on reliability and peace, this environment is crafted to enhance your stay, providing you with everything you need for a smooth and enjoyable experience.",
        rooms: []
      }
    ]);
    res.status(201).json(properties);
  } catch (err) {
    console.error("Error creating properties:", err);
    res.status(400).json({ error: err.message });
  }
});



// Get a property by ID
router.get('/:id', async (req, res) => {
  try {
    console.log("searching")
    const property = await Property.findById(req.params.id); // Fixed typo
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    console.log(property);
    res.status(200).json(property);
  } catch (err) {
    console.error("kaam ho gya");
    res.status(500).json({ error: err.message });
  }
});

// Update a property by ID
// router.put('/properties/:id', async (req, res) => {
//   try {
//     const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Fixed typo
//     if (!property) {
//       return res.status(404).json({ error: 'Property not found' });
//     }
//     res.status(200).json(property);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });


// Delete a property by ID
// router.delete('/properties/:id', async (req, res) => {
//   try {
//     const property = await Property.findByIdAndDelete(req.params.id); // Fixed typo
//     if (!property) {
//       return res.status(404).json({ error: 'Property not found' });
//     }
//     res.status(200).json({ message: 'Property deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// Get all properties
// router.get('/properties', async (req, res) => {
//   try {
//     const properties = await Property.find(); // Fixed typo
//     res.status(200).json(properties);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
