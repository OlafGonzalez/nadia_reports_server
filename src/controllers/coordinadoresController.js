const controller = {};

controller.home = (req,res) =>{
    var sedes = null
    req.getConnection((err, conn) => {
    conn.query('SELECT * FROM sede_user where id_user = 2', (err, sedes_user) => {
        if (err) {
            res.json(err);
        }else{
            console.log(sedes_user)
            res.render('reportes_sede',{
                sedes:sedes_user
            });
        }
    });
    })
}


module.exports = controller;