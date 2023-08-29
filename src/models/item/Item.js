const Sequelize = require('sequelize').Sequelize;
const db = require("../../config/dbconfig");

const Item = db.define(
  "Item",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
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
    subTotal:{
      type: Sequelize.VIRTUAL,
      get() {
        return parseFloat((this.quantity * this.price).toFixed(2));
      },
    }
    
  },
  {
    tableName: "tb_items",
    timestamps: false,
  }
);

module.exports = Item;