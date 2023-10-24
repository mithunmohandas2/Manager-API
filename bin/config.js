const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
module.exports = mongoose.connect('mongodb://localhost:27017/Manager');
