const router = require('express').Router();
const coordinadorController = require('../controllers/coordinadoresController');
const {isLoggedIn} = require('../settings/auth')


router.get("/",isLoggedIn,coordinadorController.home)
router.get('/update/:id',isLoggedIn, coordinadorController.edit);
router.post('/add',isLoggedIn, coordinadorController.save);
router.post('/update/:id', isLoggedIn,coordinadorController.update);
router.get('/delete/:id', coordinadorController.delete);




module.exports = router;