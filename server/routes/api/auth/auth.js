const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/verifyJWT', authController.verifyJWT, (req, res) => {
    res.json({ message: 'Token is valid', userId: req.userId });
});

module.exports = router;
