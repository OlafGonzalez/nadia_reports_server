const router = require('express').Router();
const coordinadorController = require('../controllers/coordinadoresController');

router.get("/",coordinadorController.home)
router.post('/addreport', coordinadorController.save);




module.exports = router;