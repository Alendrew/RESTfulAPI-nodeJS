const Sequelize = require('sequelize').Sequelize;
const db = require("../../config/dbconfig");

const Order = db.define(
  "Order",
  {
    order_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    creation_date: {
      type: Sequelize.DATE,
      allowNull: false,
    }
  },
  {
    tableName: "tb_orders",
    timestamps: false
  }
);

module.exports = Order;