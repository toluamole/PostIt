const {Router} = require('express');
const users = require('../controllers/users');

const router = Router();

router.post('/api/user/signup', users.signup_post);
router.post('/api/user/login', users.login_post)

module.exports = router;