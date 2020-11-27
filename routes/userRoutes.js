const {Router} = require('express');
const users = require('../controllers/users');

const router = Router();

router.post('/api/user/signup', users.signup_post);
router.post('/api/user/login', users.login_post);
router.post('/api/user/forgotPassword', users.sendResetLink);
router.post('/reset_password/:token', users.resetPassword);

module.exports = router;