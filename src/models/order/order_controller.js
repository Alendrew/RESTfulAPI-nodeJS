const Item = require("../item/Item");
const Order = require("./Order");
require("../../config/associations");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Item,
          attributes: ["product_id","price","quantity","subTotal"],
          as: "items"
        },
      ],
    });
    const ordersWithTotal = await orders.map(order => {
      const subTotalSum = order.items.reduce((acc, item) => acc + item.subTotal, 0);
      return { ...order.toJSON(), Total: parseFloat((subTotalSum).toFixed(2)) };
    });
    res.status(200).json(ordersWithTotal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
}

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const order = await Order.create({
      creation_date: new Date() 
    });

    items.map(async ({ product_id, price, quantity }) =>{
      await Item.create({
        order_id: order.id,
        product_id,
        price,
        quantity
      })
    })
    res.status(201).json({ message: 'Pedido criado com sucesso' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
}

module.exports = {
  getAllOrders,
  createOrder,
};
