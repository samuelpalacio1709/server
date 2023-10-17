const { httpGetServerStatus } = require('./server.controller')
const cors = require('cors')
const express = require('express');
const path = require('path')
const api = express();
api.use(cors({ origin: '*' }));
api.use(express.json()); // Middleware to procces data as JSON
api.use(express.static(path.join(__dirname, 'public')))
api.use('/', express.static('index.html'))
api.get('/init', httpGetServerStatus)
module.exports = api;