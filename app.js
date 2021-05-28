const express = require('express'),path = require('path'),morgan = require('morgan'),mysql = require('mysql'),myConnection = require('express-myconnection');
const app = express();
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
require("dotenv").config();

// importing routes
const customerRoutes = require('./src/routes/customer');
const usuarioRoutes = require('./src/routes/usuarios')
const appRoutes = require('./src/routes/app')
const coordinadoresRoutes = require('./src/routes/coordinador')
const historialRoutes = require('./src/routes/historial')


// settings
require('./src/settings/passport')
app.set('port', process.env.PORT_SERVER || 3000);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs')


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret:'mykey',
    resave:false,
    saveUninitialized:false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session());

app.use((req,res,next) =>{
    app.locals.signupMessage = req.flash('signupMessage')
    next();
})

// routes
app.use('/admin', usuarioRoutes);
app.use('/historial', historialRoutes);
app.use('/reportes',coordinadoresRoutes)
app.use('/',appRoutes)

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});