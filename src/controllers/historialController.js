const controller = {};
const coordinadorService = require("../services/coordinador");
const utilities = require('../utilities/Various')
const pool = require("../settings/PoolMySQL");


controller.busqueda = async (req,res) =>{
    let params = req.query;
    console.log(params)
    let rol = req.session.usuario.rol

    let condition = ''

    if(params.Initialdate != '')
        condition += 'RS.fecha_reporte >= ' + '"'+ params.Initialdate + '"'
    if(params.Finaldate == '')
        condition += ' AND RS.fecha_reporte <= '  + '"' + params.Initialdate + '"'
    if(params.Finaldate != '')
        condition += ' AND RS.fecha_reporte <= ' + '"' + params.Finaldate + '"'
    if(params.id_sede != '')
        condition+= ' AND id_sede = ' +params.id_sede
    
    console.log(condition)
    let reportes = await coordinadorService.FindReportesByFilters(condition)

    for (const reporte of reportes) {
        let date = new Date(reporte.fecha_reporte)
        reporte.fecha_reporte = utilities.formatDateOnlyDateView(date)
        
    }

    res.render('reportes_historial',{
        rol:rol,
        reportes:reportes
    });

}

module.exports = controller;