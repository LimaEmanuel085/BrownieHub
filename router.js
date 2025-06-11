const express = require('express');
const router = express.Router();

//Importando controllers
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const transsactionController = require('./controllers/transationController')

//Welcome route
router.get('/', homeController.welcomeController);

//Admin routes
router.get('/users', adminController.viewUsers);

//User routes - public
router.post('/user/register', userController.registerUser);

//User routes - private
router.delete('/user/delete', userController.deleteUser);
router.put('/user/update', userController.updateUser);
router.get('/user/:userEmail', userController.viewUser);

//Transaction routes - private
router.post('/transaction/deposit', transsactionController.depositMoney);
router.post('/transaction/transfer', transsactionController.transferMoney);

module.exports = router;