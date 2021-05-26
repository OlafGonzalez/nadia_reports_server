const router = require('express').Router();
const coordinadorController = require('../controllers/coordinadoresController');

router.get("/",coordinadorController.home)



module.exports = router;