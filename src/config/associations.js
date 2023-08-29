const Order = require('../models/order/Order');
const Item = require('../models/item/Item');

Item.belongsTo(Order, { foreignKey: 'order_id' });
Order.hasMany(Item, { foreignKey: 'order_id' });
