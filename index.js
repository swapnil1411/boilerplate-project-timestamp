// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function isUnixTimestampString(value) {
 
  if (/^\d+$/.test(value)) {
      const unixTimestamp = parseInt(value, 10);
      return unixTimestamp >= 0 && unixTimestamp <= 2147483648000;
  }
  return false;
}
function isDateValid(date) {
  // The 'isValid' method was introduced in ECMAScript 6 (ES6)
  return !isNaN(date) && !isNaN(date.getTime());
}

// your first API endpoint... 
app.get("/api/:value", function (req, res) {
  let final_date;
  if (req.params.value.length == 0){
final_date = new Date();
  }
  else if (isUnixTimestampString(req.params.value)) {
     final_date = new Date(parseInt(req.params.value));
  }
  else {
    final_date = new Date(req.params.value);
  }

  if (isDateValid(final_date)) {
  let unix_timestamp = final_date.getTime();
let date = final_date.toUTCString();


  res.json({ "unix":unix_timestamp, "utc":date});
}

  else {
    res.json({ error : "Invalid Date" });
  }
});

app.get("/api/", function (req, res) {
  let final_date;
final_date = new Date();
  
   
  let unix_timestamp = final_date.getTime();
let date = final_date.toUTCString();


  res.json({ "unix":unix_timestamp, "utc":date});
  
});






// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
