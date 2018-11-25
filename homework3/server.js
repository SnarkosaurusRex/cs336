//Setup
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// var fs = require('fs');
// var path = require('path');
// app.use('/', express.static(path.join(__dirname, 'public')));

var MongoClient = require('mongodb').MongoClient;
var db;


// app.get('/', (req, res) => res.send('Welcome to Homework3!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


app.get('/api/people', function(req, res) {
    db.collection('people').find().toArray(function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(data);
    });
});


app.post('/api/people', function(req, res) {
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newPerson = {
    	fname: req.body.fname,
    	lname: req.body.lname,
    	logId: req.body.logId,
    	startDate: req.body.startDate,
    	yrs: getYrs(req.body.startDate)
    };

    db.collection('people').insertOne(newPerson, function(err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
});


//Routes
app.get('/people', function (req, res) {
    // res.send(squad);
    db.collection('people').find({}).toArray(function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(data);
    });
});

//add new person
app.post('/people', function (req, res) {
    // var noob = new Person(req.body.fname, req.body.lname, req.body.logId, req.body.startDate);
    // squad.push(noob);
    var newPerson = {
    	fname: req.body.fname,
    	lname: req.body.lname,
    	logId: req.body.logId,
    	startDate: req.body.startDate,
    	yrs: getYrs(req.body.startDate)
    };

    db.collection('people').insertOne(newPerson, function(err, result) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });

    res.send('Person added!');
});


//ability to get, update, or delete the person record with the given ID
app.get('/person/:id', function (req, res) {
    // var result = getBylogId(req.params['id']);
    db.collection('people').find({'logId':req.params['id']}).toArray(function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(data);
    });

    // if (result == null) {
    //     res.sendStatus(404);
    // }
    // res.json(result);
});


app.put('/person/:id', function (req, res) {
	console.log(req.body);
    // var result = getBylogId(req.params['id']);
    // if (result == null) {
    //     res.sendStatus(404);
    // }
    // else {
        if (req.body.fname != null) {
            // result.fname = req.body.fname;
            db.collection('people').updateOne({'logId':req.params['id']}, {$set: {fname: req.body.fname}}, function(err, result) {
            	if (err) {
            		console.error(err);
            		process.exit(1);
        		}
            });
        }
        if (req.body.lname != null) {
            // result.lname = req.body.lname;
            db.collection('people').updateOne({'logId':req.params['id']}, {$set: {lname: req.body.lname}}, function(err, result) {
            	if (err) {
            		console.error(err);
            		process.exit(1);
        		}
            });
        }
        if (req.body.startDate != null) {
            // result.startDate = req.body.startDate;
            db.collection('people').updateOne({'logId':req.params['id']}, {$set: {startDate: req.body.startDate}}, function(err, result) {
            	if (err) {
            		console.error(err);
            		process.exit(1);
        		}
            });
            db.collection('people').updateOne({'logId':req.params['id']}, {$set: {yrs: getYrs(req.body.startDate)}}, function(err, result) {
            	if (err) {
            		console.error(err);
            		process.exit(1);
        		}
            });
        }
        res.send('Person updated!\n');
    // }
});


app.delete('/person/:id', function (req, res) {
    // var result = getBylogId(req.params['id']);
    // if (result == null) {
    //     res.sendStatus(404);
    // }
    // else {
    //     squad.splice(squad.indexOf(result), 1);
    //     res.send('Person ' + result.logId + ' deleted!\n');
    // }
    db.collection('people').deleteOne({'logId':req.params['id']}, function(err, result) {
        	if (err) {
        		console.error(err);
        		process.exit(1);
    		}
    	}
	);

    res.send('Person deleted!\n');
})


//Leave these routes as they are
app.get('/person/:id/name', function (req, res) {
    // var result = getBylogId(req.params['id']);
    // if (result == null || result.fname == null || result.lname == null) {
    //     res.sendStatus(404);
    // }
    // var fname = db.collection('people').find({logId: req.params['id']}, {fname: 1, _id: 0});

    var fname;
    var lname;
    db.collection('people').find({logId: req.params['id']}, {fname: 1, lname: 1, _id: 0}).toArray(function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
     //    console.log(data);
     //    fname = data;
     //    // console.log(fname);
    	// console.log(typeof fname);
    	// console.log("GET THE DAMN THING");
    	// console.log(data[0]);
    	// // console.log(data[0][fname]);
    	// console.log(data[0].fname);
    	// // console.log(data["fname"]);
    	// console.log(data.fname);
        res.send(String.raw`{ "full name": "` + data[0].fname + ' ' + data[0].lname + String.raw`" }`);
    });

    // console.log(db.collection('people').find({logId: req.params['id']}, {fname: 1, _id: 0}));
    // console.log(fname);
    // console.log(typeof fname);
    // var lname = db.collection('people').find({logId: req.params['id']}, {lname: 1, _id: 0});

    // res.send(String.raw`{ "full name": "` + fname + ' ' + lname + String.raw`" }`);
})


app.get('/person/:id/years', function (req, res) {
    // var result = getBylogId(req.params['id']);
    // if (result == null || result.yrs == null || isNaN(result.yrs)) {
    //     res.sendStatus(404);
    // }
    var yrs = db.collection('people').find({logId: req.params['id']}, {yrs: 1, _id: 0}).toArray(function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    	res.send(String.raw`{ "seniority": ` + data[0].yrs + ' }');
    });

})


// need to have MONGO_PASSWORD set as an environment variable for this to work
MongoClient.connect('mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds125381.mlab.com:25381/cs336', function (err, client) {
    if (err) throw err

    db = client;

    app.listen(app.get('port'), function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
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

/*
var p1 = new Person("Darth", "Vader", "DarthDad", "07-16-2005");
var p2 = new Person("Poe", "Dameron", "RedBaron", "12-18-2015");
var p3 = new Person("Qui-Gon", "Jinn", "ManBunMan", "05-03-1964");
var p4 = new Person("Obi Wan", "Kenobi", "Padawan1", "11-04-1970");
var p5 = new Person("Leia", "Organa", "TheGeneral", "06-21-1988");
var p6 = new Person("C-3PO", null, "C3PO", "");

var squad = [p1, p2, p3, p4, p5, p6];
*/

