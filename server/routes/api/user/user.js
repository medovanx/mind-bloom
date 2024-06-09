const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/userController');
const authController = require('../../../controllers/authController');

router.get('/getBasicProfile', authController.verifyJWT, userController.getBasicProfile);
router.get('/getAllUsers', authController.verifyJWT, userController.getAllUsers);
router.get('/getUserCertificates', authController.verifyJWT, userController.getUserCertificates);
router.put('/updateProfile', authController.verifyJWT, userController.updateProfile);
module.exports = router;
