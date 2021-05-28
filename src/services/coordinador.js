const pool = require("../settings/PoolMySQL");

exports.FindSedeUserByIdUser = async (req, id_user) => {
    let promise = new Promise(async (resolve, reject) => {
        try {
            await pool.getConnection(async (err, connection) => {
                await connection.query('select * from  nch_reports_.sede_user as SU inner join nch_reports_.sedes as S on SU.id_sede = S.id where SU.id_user = '+id_user+' ',function (err, sedes_user) {
                    if (err) {
                        resolve(null)
                    } else {
                        resolve(sedes_user)
                    }
                });
                connection.release();
            })
        } catch (error) {
            reject(error);
        }
    });
    return promise;
}

exports.FindSedeUserForAdmin = async () => {
    let promise = new Promise(async (resolve, reject) => {
        try {
            await pool.getConnection(async (err, connection) => {
                await connection.query('select * from  nch_reports_.sede_user as SU inner join nch_reports_.sedes as S on SU.id_sede = S.id',function (err, sedes_user) {
                    if (err) {
                        resolve(null)
                    } else {
                        resolve(sedes_user)
                    }
                });
                connection.release();
            })
        } catch (error) {
            reject(error);
        }
    });
    return promise;
}

exports.FindReportesDiarios = async (req, id_user,hoy) => {
    let promise = new Promise(async (resolve, reject) => {
        try {
            await pool.getConnection(async (err, connection) => {
                await connection.query('select RS.*, S.nombre from reportes_sedes as RS left join sedes as S on S.id = RS.id_sede where fecha_reporte = "'+hoy+'" AND id_usuario = '+id_user+'',function (err, reportes) {
                    if (err) {
                        resolve(null)
                    } else {
                        resolve(reportes)
                    }
                });
                connection.release();
            })
        } catch (error) {
            reject(error);
        }
    });
    return promise;
}

exports.FindReportesDiariosForAdmin = async (req,hoy) => {
    let promise = new Promise(async (resolve, reject) => {
        try {
            await pool.getConnection(async (err, connection) => {
                await connection.query('select RS.*, S.nombre from reportes_sedes as RS left join sedes as S on S.id = RS.id_sede where fecha_reporte = "'+hoy+'" ',function (err, reportes) {
                    if (err) {
                        resolve(null)
                    } else {
                        resolve(reportes)
                    }
                });
                connection.release();
            })
        } catch (error) {
            reject(error);
        }
    });
    return promise;
}
