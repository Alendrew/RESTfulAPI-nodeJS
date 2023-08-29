const Order = require('../models/order/Order')
const Item = require('../models/item/Item')
Order.hasMany(Item, { foreignKey: 'order_id', onDelete: 'CASCADE', as: 'items' });
Item.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = { Order, Item };