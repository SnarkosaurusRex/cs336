//Setup
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));


//have it go straight to the html page
app.get('/', function(req, res) {
  res.redirect('/lab07.html');
});


app.get('/hello', function (req, res) {
  res.json('Hello, ' + req.query.name + '!');
});

