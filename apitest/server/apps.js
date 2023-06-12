const express = require("express");
const apps = express()
const cors = require("cors")
const logger = require ("./logger")
apps.use(cors());
apps.use(express.json)
apps.use(logger);

apps.get('/', async (req, res) => {
    res.send(`Welcome to the quotes API! There are ${quotes.length} available.`);
})
apps.get('/audio', (req, res) => {
    res.send(Audio);
})

module.exports = apps;
