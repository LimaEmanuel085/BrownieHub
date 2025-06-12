const express = require('express');
const router = express.Router();

//Importando controllers
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const transsactionController = require('./controllers/transationController')
const loginController = require('./controllers/loginController');

//Middlewares
const verifyJWT = require('./middlewares/verifyJWT');

//Welcome route
router.get('/', homeController.welcomeController);

//Admin routes
router.get('/users', adminController.viewUsers);

//User routes - public
router.post('/user/register', userController.registerUser);
router.post('/user/login', loginController.loginUser);

//User routes - private
router.delete('/user/delete', verifyJWT.checkToken, userController.deleteUser);
router.put('/user/update', verifyJWT.checkToken, userController.updateUser);
router.get('/user/:userEmail', verifyJWT.checkToken, userController.viewUser);

//Transaction routes - private
router.post('/transaction/deposit', verifyJWT.checkToken, transsactionController.depositMoney);
router.post('/transaction/transfer', verifyJWT.checkToken, transsactionController.transferMoney);

module.exports = router;