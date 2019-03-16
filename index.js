require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const app = express();

module.exports = require('./config/express')(app);


app.listen(process.env.PORT, () => {
	console.log(`Server listening at ${process.env.PORT}...`);
});