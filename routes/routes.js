const express = require('express');
const router = express.Router();
const { auth, userRedirect } = require('../middleware/auth');

const authController = require('../controllers/authController');

router.get('/login', userRedirect, authController.login_get);
router.post('/login', authController.login_post);
router.get('/register', userRedirect, authController.register_get);
router.post('/register', authController.register_post);
router.get('/logout', authController.logout_get);
router.get('/users', auth, authController.user_get);

module.exports = router;
