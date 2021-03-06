var express = require('express');
var user_controller = require('./../controllers/user');
var router = express.Router();
var auth = require('./../middlewares/auth');


// const validationRules = [
//   check('password').isLength({ min: 6 }),
//   check('username').isAlphanumeric(),
// ]

router.post('/login', user_controller.login_post);

router.get('/city', auth.verifyToken, user_controller.cities_get);

router.post('/city', auth.verifyToken, user_controller.cities_post);

module.exports = router;
