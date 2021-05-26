const controller = {};
const bycryptjs = require('bcryptjs')

controller.login = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {
                data: customers
            });
        });
    });
};

controller.register = async (req,res) =>{
    const nombre = req.body.nombre
    const apellidos = req.body.apellidos
    const usuario = req.body.usuario
    const correo = req.body.correo
    const rol = req.body.rol
    const numero = req.body.numero
    const contrasena = req.body.contrasena
    let password_encriptada = await bycryptjs.hash(contrasena,8)

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO usuarios set ?',{nombre:nombre,apellidos:apellidos,usuario:usuario,correo:correo,rol:rol,contrasena:password_encriptada,numero:numero}, (err, usuario) => {
            if (err) {
                res.json(err);
            }
            console.log(usuario)
            //REDIRIGIR A TABLA DE usuarios
        });
    });

}


module.exports = controller;