module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("Order", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        creation_date:{
            type: Sequelize.DATE,
            allowNull: false
        }
    });
  
    return Order;
  };