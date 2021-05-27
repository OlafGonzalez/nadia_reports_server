const router = require('express').Router();
const coordinadorController = require('../controllers/coordinadoresController');
const {isLoggedIn} = require('../settings/auth')


router.get("/",isLoggedIn,coordinadorController.home)
router.get('/update/:id', coordinadorController.edit);
router.post('/add', coordinadorController.save);
router.post('/update/:id', coordinadorController.update);




module.exports = router;