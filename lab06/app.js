//Setup
const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/', function (req, res) {
  res.send('Hello, Lab 6!')
})

app.head('/', function (req, res) {
	res.status(200).send("Got a HEAD request");
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.put('/request', function (req, res) {
  res.send('Got a PUT request at /request')
})

app.delete('/request', function (req, res) {
  res.send('Got a DELETE request at /request')
})



/* stuff copied from homework1
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
*/

