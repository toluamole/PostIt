const {Router} = require('express');
const users = require('../controllers/users');

const router = Router();

router.get('/signup', users.signup_get);
router.post('/signup', users.signup_post);

module.exports = router;