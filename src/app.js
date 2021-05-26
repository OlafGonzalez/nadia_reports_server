const express = require('express'),path = require('path'),morgan = require('morgan'),mysql = require('mysql'),myConnection = require('express-myconnection');

const app = express();

// importing routes
const customerRoutes = require('./routes/customer');
const usuarioRoutes = require('./routes/usuarios')
const appRoutes = require('./routes/app')
const coordinadoresRoutes = require('./routes/coordinador')

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'nch_reports_'
}, 'single'));
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/usuarios', usuarioRoutes);
app.use('/coordinador',coordinadoresRoutes)
app.use('/',appRoutes)

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});