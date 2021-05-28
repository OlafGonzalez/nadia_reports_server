const controller = {};
const coordinadorService = require("../services/coordinador");
const utilities = require('../utilities/Various')
const pool = require("../settings/PoolMySQL");


controller.busqueda = async (req,res) =>{
    let params = req.query;
    console.log(params)

    let historial = await 

    res.render('reportes_historial',{
        
    });

}

module.exports = controller;