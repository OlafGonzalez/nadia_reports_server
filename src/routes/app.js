const router = require('express').Router();

const appController = require('../controllers/appController');

router.post('/login',appController.login)
router.post('/register',appController.register)


module.exports = router;