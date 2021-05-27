var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 50,
  host:     'localhost',
  user:     'root',
  port:     3306,
  password: '',
  database: 'nch_reports_',
});

module.exports = pool

