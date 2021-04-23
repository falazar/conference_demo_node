module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve a single user by id
  router.get("/:id", users.findOne);

  // Update a user by id
  router.put("/:id", users.update);

  // Delete a user by id
  router.delete("/:id", users.delete);

  // Delete all users
  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};
