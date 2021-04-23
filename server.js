const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs')

const db = require("./app/models");
// Create all tables if needed.
db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// Main route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Conference Talk Service/Application." });
});

app.get("/about", (req, res) => {
  res.send("Welcome to Conference Talk Application.");
});

// Object Routes.
require("./app/routes/talk.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/talkAttendee.routes")(app);


// Set server port, and start listening for requests.
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
