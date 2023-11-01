var express = require('express');
var admin_router = express.Router();
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')


admin_router.post('/login', adminController.loginAdmin);
admin_router.get('/loadUsers', auth.verifyToken, adminController.loadUsers);
admin_router.put('/updateUser/:_id', auth.verifyToken, adminController.updateUser);
admin_router.post('/userSearch',auth.verifyToken, adminController.userSearch);
admin_router.post('/deleteUser', auth.verifyToken, adminController.deleteUser);


module.exports = admin_router;
