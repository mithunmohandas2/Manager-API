var express = require('express');
var admin_router = express.Router();
const adminController = require('../controllers/adminController')

/* GET home page. */
admin_router.post('/login', adminController.loginAdmin);
admin_router.get('/loadUsers', adminController.loadUsers);
admin_router.put('/updateUser/:_id', adminController.updateUser);




module.exports = admin_router;
