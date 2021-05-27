const controller = {};
const coordinadorService = require("../services/coordinador");
const utilities = require('../utilities/Various')
const pool = require("../settings/PoolMySQL");


controller.home = async (req,res) =>{
    var sedes_user = null
    var reportes = null
    let id_user = sessionStorage.getItem('id_user')
    let rol = sessionStorage.getItem('rol')
    let hoy = utilities.formatDateOnlyDate(new Date())

    let t_ua = 0
    let t_ei = 0
    let t_ar = 0
    let t_sc = 0

    if(rol == "ADMIN"){
        reportes = await coordinadorService.FindReportesDiariosForAdmin(req,hoy)
    }else{
        reportes = await coordinadorService.FindReportesDiarios(req,id_user,hoy)
    }

    for (const reporte of reportes) {
        t_ua+= reporte.usuarios_atendidos
        t_ei+= reporte.expedientes_iniciados
        t_ar+= reporte.acuerdos_reparatorios
        t_sc+= reporte.sesiones_conjuntas
    }

    sedes_user = await coordinadorService.FindSedeUserByIdUser(req,id_user)

    res.render('reportes_sede',{
        sedes:sedes_user,
        reportes:reportes,
        rol:rol,
        t_ua:t_ua,
        t_ei:t_ei,
        t_ar:t_ar,
        t_sc:t_sc
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