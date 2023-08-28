const Order = require('../models/order/Order');
const Item = require('../models/item/Item');

Order.hasMany(Item, { foreignKey: 'order_id' });
Item.belongsTo(Order, { foreignKey: 'order_id' });