const db = require('../../config/dbconfig');

const getOrders = (req, res) => {
    db.query("SELECT * FROM tb_orders", (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getOrders,
}