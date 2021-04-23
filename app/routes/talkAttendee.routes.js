module.exports = app => {
  const talkAttendees = require("../controllers/talkAttendee.controller.js");

  var router = require("express").Router();

  // Create a new talkattendee
  router.post("/", talkAttendees.create);

  // Retrieve all talkAttendees
  router.get("/", talkAttendees.findAll);

  // Retrieve a single talkAttendee by id
  router.get("/:id", talkAttendees.findOne);

  // Update a talkAttendee by id
  router.put("/:id", talkAttendees.update);

  // Delete a talkAttendee by id
  router.delete("/:id", talkAttendees.delete);

  // Delete all talkAttendees
  router.delete("/", talkAttendees.deleteAll);

  app.use('/api/talkAttendees', router);
};
