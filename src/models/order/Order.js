const Sequelize = require("sequelize");
const db = require("../../config/dbconfig");

const Order = db.define(
  "Order",
  {
    order_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    creation_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "tb_orders",
    timestamps: false
  }
);

module.exports = Order;
