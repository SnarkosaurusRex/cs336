//Setup
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Welcome to Homework1!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//Routes
app.get('/people', function (req, res) {
	res.send(squad)
})

app.get('/person/:id', function (req, res) {
	var result = getBylogId(req.params['id']);
	if (result == null) {
		res.sendStatus(404);
	}
	res.json(result);
})

app.get('/person/:id/name', function (req, res) {
	var result = getBylogId(req.params['id']);
	if (result == null || result.fname == null || result.lname == null) {
		res.sendStatus(404);
	}
	res.send(String.raw`{ "full name": "` + result.fname + ' ' + result.lname + String.raw`" }`);
})

app.get('/person/:id/years', function (req, res) {
	var result = getBylogId(req.params['id']);
	if (result == null || result.yrs == null || isNaN(result.yrs)) {
		res.sendStatus(404);
	}
	res.send(String.raw`{ "seniority": ` + result.yrs + ' }');
})


/* Set up the people records */
//Define what people are
function Person(fname, lname, logId, startDate) {
    this.fname = fname;
    this.lname = lname;
    this.logId = logId;
    this.startDate = startDate;
    this.yrs = getYrs(startDate);
}

function getYrs(startDate) {
    var today = new Date();
    var sd = new Date(startDate);

    var yrs = today.getFullYear() - sd.getFullYear();
    var m = today.getMonth() - sd.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < sd.getDate())) {
        yrs--;
    }
    return yrs;
};

function getBylogId(logId) {
	var result;
	for (var i = 0; i < squad.length; i++) {
		if (squad[i].logId === logId) {
			result = squad[i];
		}
	}
	return result;
}


var p1 = new Person("Darth", "Vader", "DarthDad", "07-16-2005");
var p2 = new Person("Poe", "Dameron", "RedBaron", "12-18-2015");
var p3 = new Person("Qui-Gon", "Jinn", "ManBunMan", "05-03-1964");
var p4 = new Person("Obi Wan", "Kenobi", "Padawan1", "11-04-1970");
var p5 = new Person("Leia", "Organa", "TheGeneral", "06-21-1988");
var p6 = new Person("C-3PO", null, "C3PO", "");

var squad = [p1, p2, p3, p4, p5, p6];


