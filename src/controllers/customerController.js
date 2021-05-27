const controller = {};
const pool = require("../settings/PoolMySQL");

controller.list = (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {
                data: customers
            });
            connection.release();
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body)
    pool.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO customer set ?', data, (err, customer) => {
            console.log(customer)
            res.redirect('/');
        })
        connection.release();
    })
};

controller.edit = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, connection) => {
        connection.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
            res.render('customers_edit', {
                data: rows[0]
            })
        });
        connection.release();
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    pool.getConnection((err, connection) => {
        connection.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
        connection.release();
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    pool.getConnection((err, connection) => {
        connection.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
        connection.release();
    });
}

module.exports = controller;