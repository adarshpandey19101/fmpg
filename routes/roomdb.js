var express = require('express');
var router = express.Router();
const userModel = require("../models/users");
const roomSchema = require("../models/Room")
const propertySchema = require("../models/Property")
const passport = require('passport');
const localStrategy = require("passport-local");
const { error } = require('console');
const mongoose=require("mongoose")


router.get('/create', async function(req, res, next) {
  console.log("Entering the create route");
  try {
    const createdRoom = await roomSchema.create({
      property: "66cfa380712e965bbca4c607",
      number: "9417272282",
      type: "Shared",
      price: "1200",
      available: true
    });

    const propertyID = createdRoom.property;
    const property = await propertySchema.findByIdAndUpdate(propertyID, {
      $push: { rooms: createdRoom._id }
    })
    console.log(propertyID, property)

    console.log("Room created successfully:", createdRoom);
    res.status(201).json(createdRoom); // Respond with JSON and 201 status code
  } catch (err) {
    console.error("Error creating room:", err);
    res.status(500).json({ error: 'Failed to create room' }); // Handle error response
  }
});


  // router.get('/alluser', async function(req, res, next) {
  //   let alluser = await roomSchema.find();
  //   res.send(alluser)
  // });


  router.get('/find/:roomID', async function(req, res, next) {
    const roomID = req.params.roomID;
    console.log("RoomID: ", roomID)
    try{
      const room = await roomSchema.findById(roomID);
      res.status(200).send({ success: true, message: "Finded room successfully", data: room })
    }catch(err){
      console.log("Error while finding the room" + err);
      res.status(404).send({ message: "Error while finding the room" });
    }
  });

  module.exports=router;