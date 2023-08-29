const Item = require("../item/Item");
const Order = require("./Order");
require("../../config/associations");

const getOrders = async (req, res) => {
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
};

module.exports = {
  getOrders,
};
