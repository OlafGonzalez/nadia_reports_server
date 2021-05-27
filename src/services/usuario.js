const pool = require("../settings/PoolMySQL");

exports.Save = async (req,data) => {
    let promise = new Promise(async (resolve, reject) => {
        try {
            await pool.getConnection(async (err, connection) => {
                connection.query('INSERT INTO usuarios set ?', data, (err, usuario) => {
                    if (err) {
                        resolve(null)
                    } else {
                        resolve(usuario)
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

exports.findbyId = async (id) => {
    let promise = new Promise(async (resolve, reject) => {
        try {
            await pool.getConnection(async (err, connection) => {
                connection.query('SELECT * FROM usuarios where id = ?',id, (err, usuario) => {
                    if (err) {
                        resolve(null)
                    } else {
                        resolve(usuario[0])
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

exports.findbyUser = async (user) => {
    let promise = new Promise(async (resolve, reject) => {
        try {
            await pool.getConnection(async (err, connection) => {
                connection.query('SELECT * FROM usuarios where usuario = ?',user, (err, usuario) => {
                    if (err) {
                        resolve(null)
                    } else {
                        resolve(usuario[0])
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