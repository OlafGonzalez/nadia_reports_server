const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy
const usuarioService = require('../services/usuario')
const bycryptjs = require('bcryptjs')
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

passport.use('local-signup', new LocalStrategy({
    usuario: 'username',
    contrasena:'password',
    passReqToCallback:true
}, async (req,usuario,contrasena,done) => {

    let user = await usuarioService.findbyUser(usuario)
    if(user){
        return done(null,false, req.flash('signupMessage','El usuario ya existe.'));
    }else{
        let new_user = {}
        new_user.nombre = req.body.nombre
        new_user.usuario = usuario
        new_user.contrasena = await bycryptjs.hash(contrasena,8)
        new_user.rol =  req.body.rol
        let user = await usuarioService.Save(req,new_user)
        user.id = user.insertId
        await done(null,user)
    }
}))

passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(async function(id,done){
    const user = await usuarioService.findbyId(id)
    done(null,user)
})


passport.use('local-signin', new LocalStrategy({
    usuario: 'username',
    contrasena:'password',
    passReqToCallback:true
}, async (req,usuario,contrasena,done) => {
    let user = await usuarioService.findbyUser(usuario)
    if(!user){
        return done(null,false, req.flash('signupMessage','El usuario no existe'));
    }
    let isPassvalid = await bycryptjs.compare(contrasena,user.contrasena)
    if(!isPassvalid){
        ////USUARIO O CONTRA INCORRECTO
        return done(null,false, req.flash('signupMessage','La contrasena es incorrecta.'));
    }
    sessionStorage.setItem('id_user', user.id);
    sessionStorage.setItem('rol',user.rol)

    done(null,user)



}))