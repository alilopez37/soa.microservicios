const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')

router.get('/usernameValidate/:username',userController.usernameValidate);
router.post('/',userController.signup)
router.get('/',userController.login)

module.exports = router;
