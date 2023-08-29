const Sequelize = require("sequelize");
const db = require("../../config/dbconfig");

const Item = db.define(
  "Item",
  {
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "tb_items",
    timestamps: false
  }
);

Item.removeAttribute('id');

module.exports = Item;
