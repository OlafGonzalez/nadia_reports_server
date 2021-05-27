const controller = {};
const bycryptjs = require('bcryptjs')

controller.sigin = (req,res) =>{
    res.render('login');
}

controller.home = (req,res) =>{
    let rol = sessionStorage.getItem('rol')
    res.render('home',{
        rol:rol
    });
}




module.exports = controller;