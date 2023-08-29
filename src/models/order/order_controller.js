const Item = require("../item/Item");
const Order = require("./Order");
const db = require("../../config/dbconfig");
require("../../config/associations");

const getOrderById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Item,
          attributes: ["id", "product_id", "price", "quantity", "subTotal"],
          as: "items",
        },
      ],
    });
    const subTotalSum = order.items.reduce(
      (acc, item) => acc + item.subTotal,
      0
    );
    res.status(200).json({
      ...order.toJSON(),
      Total: parseFloat(subTotalSum.toFixed(2)),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar pedido" });
  }
};

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
      if (items && items.length > 0) {
        await Promise.all(
          items.map(async ({ product_id, price, quantity }) => {
            await Item.create(
              {
                order_id: order.order_id,
                product_id,
                price,
                quantity,
              },
              { transaction }
            );
          })
        );
      }

      // Confirma a transação se tudo estiver correto
      await transaction.commit();

      res.status(201).json({ message: "Pedido com itens criado sucesso" });
    } catch (error) {
      // Desfaz a transação em caso de erro
      await transaction.rollback();

      console.log(error);
      res.status(500).json({ error: "Erro ao criar pedido com itens" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao iniciar a transação" });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Order.destroy({
      where: {
        order_id: id,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao deletar pedido" });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  deleteOrderById
};
