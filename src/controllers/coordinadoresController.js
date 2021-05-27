const controller = {};
const coordinadorService = require("../services/coordinador");

controller.home = async (req,res) =>{
    var sedes_user = null
    var reportes = null
    sedes_user = await coordinadorService.FindSedeUserByIdUser(req,2)
    reportes = await coordinadorService.FindReportesDiarios(req,1)

    res.render('reportes_sede',{
        sedes:sedes_user,
        reportes:reportes
    });

}

controller.save = async (req,res) =>{
    const data = req.body;
    let hoy = new Date()
    data.fecha_reporte = hoy
    console.log(req.body)
    req.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO reportes_sedes set ?', data, (err, report) => {
            res.redirect('/coordinador');
        })
    })
}

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM reportes_sedes WHERE id = ?", [id], (err, rows) => {
            res.render('reporte_edit', {
                data: rows[0]
            })
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const updateReport = req.body;
    req.getConnection((err, conn) => {

        conn.query('UPDATE reportes_sedes set ? where id = ?', [updateReport, id], (err, rows) => {
            res.redirect('/coordinador');
        });
    });
};


module.exports = controller;