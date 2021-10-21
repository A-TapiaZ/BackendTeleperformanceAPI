console.clear();

const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv').config();

const http = require('http');
const { dbConnection } = require('./config/mongoConfig');
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dbConnection()

require('./routes')(app);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () =>{
    console.log(`Running on port ${port}`);
});

module.exports = app;