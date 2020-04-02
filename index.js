var express = require("express");
var app = express();
var compression = require("compression");
var bodyParser = require("body-parser");
var morgaon = require("morgan");
var http = require("http");
var helmet = require("helmet");
const routes = require("./Source/Router/route.js");

require("./Source/Config/dbConfig");

var port = process.env.PORT ? process.env.PORT : "3000";
app.set("port", port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

app.use(
  bodyParser.json({
    extended: false,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10
  })
);

app.use(helmet());
app.use(morgaon("combined"));
app.use(compression());
app.use("/api", routes);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}
