const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
module.exports = mongoose.connect(process.env.MongoDB_Link);
