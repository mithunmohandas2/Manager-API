var express = require('express');
var admin_router = express.Router();

/* GET home page. */
admin_router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = admin_router;
