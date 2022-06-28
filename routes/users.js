var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')


router.get('/usernameValidate/:username',userController.usernameValidate);
router.post('/signup',userController.signup)
router.post('/login',userController.login)

module.exports = router;
