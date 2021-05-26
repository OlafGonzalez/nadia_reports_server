const controller = {};
const bycryptjs = require('bcryptjs')

controller.home = (req,res) =>{
    res.render('login');
}

controller.login = (req, res) => {
    const usuario = req.body.username
    const contrasena = req.body.password

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios where usuario = ?',[usuario], async (err, usuario) => {
            if (err) {
                res.json(err);
            }
            if(usuario){
                if(usuario.length == 0 || !(await bycryptjs.compare(contrasena,usuario[0].contrasena))){
                    ////USUARIO O CONTRA INCORRECTO
                    console.log("LOGIN FAIL")

                }else{
                    ////LOGIN CORRECTO
                    console.log("LOGIN")
                }
            }else{
                ///ERROR USUARIO NO EXISTE 
                console.log("LOGIN FAIL USER")

            }
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