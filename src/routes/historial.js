const historialController = require('../controllers/historialController');
const router = require('express').Router();

router.get('/', historialController.busqueda);


module.exports = router;