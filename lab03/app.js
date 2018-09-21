/**
 * Lab 3 - Node & Express
 *    app.js = main file
 * Name: Lydia Holtrop
 * Date: Fall 2018
 */


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World! (add "/lab3page.html" to the URL to view lab answers)'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(express.static('public'))

