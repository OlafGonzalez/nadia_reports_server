const controller = {};
const bycryptjs = require('bcryptjs')

controller.sigin = (req,res) =>{
    res.render('login');
}

controller.home = (req,res) =>{
    //let rol = req.session.getItem('rol')
    let rol = req.session.usuario.rol
    res.render('home',{
        rol:rol
    });
}




module.exports = controller;