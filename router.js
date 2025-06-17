const express = require('express');
const router = express.Router();

//Importando controllers
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const transsactionController = require('./controllers/transationController')
const loginController = require('./controllers/loginController');
const brownieController = require('./controllers/brownieController');
const buyAndSellController = require('./controllers/buyAndSellController');

//Middlewares
const verifyJWT = require('./middlewares/verifyJWT');
const verifyAdmin = require('./middlewares/adminVerify')

//Welcome route
router.get('/', homeController.welcomeController);

//Admin routes
router.get('/users', verifyAdmin.verifyAdmin, adminController.viewUsers);

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

//Brownie routes - private
router.get('/brownies', verifyAdmin.verifyAdmin, brownieController.viewBrownies);
router.delete('/brownie/delete', verifyAdmin.verifyAdmin, brownieController.deleteBrownie);
router.post('/brownie/add-flavor', verifyAdmin.verifyAdmin, brownieController.addBrownieFlavor);
router.post('/brownie/add', verifyAdmin.verifyAdmin, brownieController.addBrownie);
router.put('/brownie/update', verifyAdmin.verifyAdmin, brownieController.updateBrownie);

//Buy and Sell routes - private
router.post('/brownie/buy', verifyAdmin.verifyAdmin, buyAndSellController.buyBrownie);

module.exports = router;