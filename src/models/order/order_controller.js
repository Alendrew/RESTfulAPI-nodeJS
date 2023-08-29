const Item = require("../item/Item");
const Order = require("./Order");
const db = require("../../config/dbconfig");
require("../../config/associations");


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Item,
          attributes: ["product_id", "price", "quantity", "subTotal"],
          as: "items",
        },
      ],
    });
    const ordersWithTotal = await orders.map((order) => {
      const subTotalSum = order.items.reduce(
        (acc, item) => acc + item.subTotal,
        0
      );
      return { ...order.toJSON(), Total: parseFloat(subTotalSum.toFixed(2)) };
    });
    res.status(200).json(ordersWithTotal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    // Inicia uma transação
    const transaction = await db.transaction();

    try {
      // Criação da ordem
      const order = await Order.create(
        {
          creation_date: new Date(),
        },
        { transaction }
      );

      // Criação dos itens associados à ordem
      await Promise.all(
        items.map(async ({ product_id, price, quantity }) => {
          await Item.create(
            {
              order_id: order.order_id,
              product_id,
              price,
              quantity
            },
            { transaction }
          );
        })
      );

      // Confirma a transação se tudo estiver correto
      await transaction.commit();

      res.status(201).json({ message: "Pedido criado com sucesso" });
    } catch (error) {
      // Desfaz a transação em caso de erro
      await transaction.rollback();

      console.log(error);
      res.status(500).json({ error: "Erro ao criar pedido e/ou itens" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao iniciar a transação" });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
};
