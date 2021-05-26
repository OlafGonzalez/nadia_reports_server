
exports.FindSedeUserByIdUser = async (req, id_user) => {
    let promise = new Promise(async (resolve, reject) => {
        try {
            await req.getConnection(async (err, conn) => {
                await conn.query('select * from  nch_reports_.sede_user as SU inner join nch_reports_.sedes as S on SU.id_sede = S.id where SU.id_user = 2',function (err, sedes_user) {
                    if (err) {
                        resolve(null)
                    } else {
                        resolve(sedes_user)
                    }
                });
            })
        } catch (error) {
            reject(error);
        }
    });
    return promise;
}

exports.FindReportesDiarios = async (req, id_user) => {
    let promise = new Promise(async (resolve, reject) => {
        try {
            await req.getConnection(async (err, conn) => {
                await conn.query('select * from reportes_sedes where fecha_reporte = "2021-05-26" ',function (err, reportes) {
                    if (err) {
                        resolve(null)
                    } else {
                        resolve(reportes)
                    }
                });
            })
        } catch (error) {
            reject(error);
        }
    });
    return promise;
}
