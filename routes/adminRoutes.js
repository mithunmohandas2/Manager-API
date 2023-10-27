var express = require('express');
var admin_router = express.Router();
const adminController = require('../controllers/adminController')


admin_router.post('/login', adminController.loginAdmin);
admin_router.get('/loadUsers', adminController.loadUsers);
admin_router.put('/updateUser/:_id', adminController.updateUser);
admin_router.post('/userSearch', adminController.userSearch);


module.exports = admin_router;
