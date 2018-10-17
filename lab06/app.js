//Setup
const express = require('express');
const bodyParser = require('body-parser');
const httpStatus = require('http-status-codes');
const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));


app.get('/', function (req, res) {
  res.send('Hello, Lab 6!' + "\n");
});


app.head('/', function (req, res) {
    res.status(200).send("Got a HEAD request\n");
});


app.post('/', function (req, res) {
  if (req.body !== null && req.body !== "") {
    res.send('Got a POST request with message: ' + req.body + "\n");
  }
  else {
    res.send('Got a POST request\n');
  }
});


app.put('/request', function (req, res) {
  if (req.body !== "" || req.body !== null) {
    res.send('Got a PUT request at /request with message: ' + req.body + "\n");
  }
  else {
    res.send('Got a PUT request at /request\n');
  }
});


app.delete('/request', function (req, res) {
  if (req.body !== null && req.body !== "") {
    res.send('Got a DELETE request with message: ' + req.body + "\n");
  }
  else {
    res.send('Got a DELETE request at /request\n');
  }
});


app.get('/my-handling-form-page', function(req, res) {
  res.redirect('/forms');
});


app.post('/forms', function(req, res) {
  res.send('Hello, form POST!\n' + req.body.user_name + ' (' + req.body.user_mail + ') says \"' + req.body.user_message + '\"\n');
});


app.all('*', function(req, res) {
  res.sendStatus(httpStatus.BAD_REQUEST);
});

