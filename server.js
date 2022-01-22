// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Una solicitud para /api/:date? con una fecha válida debe devolver un objeto JSON con una clave unix que es una marca de tiempo Unix de la fecha de entrada en milisegundos
app.get("/api/:date?", (req, res) => {
  let givenDate = req.params.date,
    date;

  if (!givenDate) {
    date = new Date();
  } else {
    let checkUnix = givenDate * 1;

    date = isNaN(givenDate) ? new Date(givenDate) : new Date(checkUnix);
    //  si givenDate no es un numero, Date(checkUnix) me va a dar "Invalid Date"
  }

  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    let unix = date.getTime(),
      utc = date.toUTCString();

    res.json({ unix, utc });
  }
});

// Una petición para /api/:date? con una fecha válida debe devolver un objeto JSON con una clave utc que es una cadena de la fecha de entrada en el formato: Thu, 01 Jan 1970 00:00:00 GMT
// Una solicitud a /api/1451001600000 debe devolver { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
// Your project can handle dates that can be successfully analyzed bynew Date(date_string)
// If the entry date is invalid, the api returns an object with the structure{ error : "Invalid Date" }
// An empty date parameter must return the current time in a JSON object with a keyunix
// An empty date parameter must return the current time in a JSON object with a keyutc

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
