var express = require('express');
var user_router = express.Router();
const userController = require('../controllers/userController')

/* Test */
user_router.get('/', function (req, res, next) { res.send('respond with a resource')});

user_router.post('/register', userController.registerUser);
user_router.post('/login', userController.loginUser);

module.exports = user_router;
