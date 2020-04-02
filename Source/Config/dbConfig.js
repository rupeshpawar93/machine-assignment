const mongoose = require("mongoose");
const dbURI = "mongodb://root:rupesh18@ds016148.mlab.com:16148/pratice";

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.set("useCreateIndex", true);

// Db Connection
var db = mongoose.connection;

db.on("connected", function() {
  console.log("Mongoose connected to " + dbURI);
});

db.on("error", function(err) {
  console.log("Mongoose connection error: " + err);
});

db.on("disconnected", function() {
  console.log("Mongoose disconnected");
});

//Exported the database connection to be imported at the server
exports.default = db;
