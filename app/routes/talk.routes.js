module.exports = app => {
  const talks = require("../controllers/talk.controller.js");

  var router = require("express").Router();

  // Create a new talk
  router.post("/", talks.create);

  // Retrieve all talks
  router.get("/", talks.findAll);

  // Retrieve a single talk by id
  router.get("/:id", talks.findOne);

  // Update a talk by id
  router.put("/:id", talks.update);

  // Delete a talk by id
  router.delete("/:id", talks.delete);

  // Delete all talks
  router.delete("/", talks.deleteAll);

  app.use('/api/talks', router);
};
