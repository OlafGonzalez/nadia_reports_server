const controller = {};
const coordinadorService = require("../services/coordinador");
const utilities = require('../utilities/Various')
const pool = require("../settings/PoolMySQL");


controller.home = async (req,res) =>{
    var sedes_user = null
    var reportes = null
    let id_user = localStorage.getItem('id_user')
    let rol = localStorage.getItem('rol')
    let hoy = utilities.formatDateOnlyDate(new Date())

    if(rol == "ADMIN"){
        reportes = await coordinadorService.FindReportesDiariosForAdmin(req,hoy)
    }else{
        reportes = await coordinadorService.FindReportesDiarios(req,id_user,hoy)
    }

    sedes_user = await coordinadorService.FindSedeUserByIdUser(req,id_user)

    res.render('reportes_sede',{
        sedes:sedes_user,
        reportes:reportes,
        rol:rol
    });

}

controller.save = async (req,res) =>{
    const data = req.body;
    let hoy = new Date()
    data.fecha_reporte = hoy
    console.log(req.body)
    pool.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO reportes_sedes set ?', data, (err, report) => {
            res.redirect('/reportes');
        })
        connection.release();

    })
}

controller.edit = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, connection) => {
        connection.query("SELECT * FROM reportes_sedes WHERE id = ?", [id], (err, rows) => {
            res.render('reporte_edit', {
                data: rows[0]
            })
        });
        connection.release();
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const updateReport = req.body;
    pool.getConnection((err, connection) => {
        connection.query('UPDATE reportes_sedes set ? where id = ?', [updateReport, id], (err, rows) => {
            res.redirect('/reportes');
        });
        connection.release();
    });
};


module.exports = controller;