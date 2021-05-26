const controller = {};

controller.FindSedeUserByIdUser = (req,res) =>{
    req.getConnection((err, conn) => {
    conn.query('SELECT * FROM sede_user where id_user = 2', (err, sedes_user) => {
        if (err) {
            return null
        }else{
            return sedes_user
        }
    });
    })
}


module.exports = controller;