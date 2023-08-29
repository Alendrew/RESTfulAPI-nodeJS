const db = require('./dbconfig');
require('./associations')
const Order = require('../models/order/Order');
const Item = require('../models/item/Item');

(async () => {
  try {
    // Sincronize as tabelas
    await db.sync({ force: true });

    // Crie um novo pedido com uma data de criação válida
    const Order1 = await Order.create({ creation_date: new Date() });

    // Crie itens associados ao pedido
    const Item1 = await Item.create({ order_id: Order1.order_id, product_id: 1, quantity: 2, price: 10.99});
    const Item2 = await Item.create({ order_id: Order1.order_id, product_id: 2, quantity: 10, price: 2.99});

    console.log('Tabelas criadas e registros inseridos com sucesso.');
  } catch (error) {
    console.error('Erro:', error);
  }
})();