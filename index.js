const express = require('express')
const path = require('path')
const router = express.Router();
const cors = require('cors');
const app = express()
const port = 3000
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
const problems = {};

const requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
}

const requestProblems = function (req, res, next) {
    req.requestProblems = problems;
    next();
}

app.use(requestTime, express.urlencoded());
app.use(cors(), requestProblems);
app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/reports', (req, res) => {
    res.send(req.requestProblems);
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/menu.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/about.html'));
});

app.post('/add', function (req, res) {
    if (req.body.issue != undefined) problems[req.body.loc] = req.body.issue;
    console.log(problems);
    res.sendFile(path.join(__dirname + '/public/index.html'));
});