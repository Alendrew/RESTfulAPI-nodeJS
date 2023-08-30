const Item = require("../item/Item");
const Order = require("./Order");
const db = require("../../config/dbconfig");
require("../../config/associations");

const getOrderById = async (req, res) => {
  /*
    #swagger.tags = ['Orders']
    #swagger.parameters['id'] = { description: 'Id do pedido' }
  */
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
    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
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
  // #swagger.tags = ['Orders']
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Item,
          attributes: ["id", "product_id", "price", "quantity", "subTotal"],
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
  /*
    #swagger.tags = ['Orders']
    #swagger.parameters['item'] = {
      in: 'body',
      description: 'Crie um pedido com vários itens ou nenhum item',
      schema: [
          {
            id_produto: 9,
            preco: 7.99,
            quantidade: 2
          }
      ]
    }
  */
  try {
    // Iniciando transação
    const transaction = await db.transaction();

    try {
      // Criando order
      const order = await Order.create(
        {
          creation_date: new Date(),
        },
        { transaction }
      );

      // Se o body for null ou vazio essa etapa é pulada
      if (req.body && Array.isArray(req.body)) {
        const promises = req.body.map(async (element) => {
          // Verificando se a transação não foi revertida
          if (!transaction.finished) {
            const mappedItem = mapItemFields(element);
            await Item.create(
              {
                order_id: order.order_id,
                product_id: mappedItem.product_id,
                price: mappedItem.price,
                quantity: mappedItem.quantity,
              },
              { transaction }
            );
          }
        });

        await Promise.all(promises);
      }
      // Commita a transação se tudo estiver certo
      await transaction.commit();

      res.status(201).json({ message: "Pedido criado com sucesso" });
    } catch (error) {
      // Desfazendo a transação caso ocorra um erro
      if (!transaction.finished) {
        await transaction.rollback();
      }
      console.log(error);
      res.status(500).json({ error: "Erro ao criar pedido com itens" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao iniciar a transação" });
  }
};

const deleteOrderById = async (req, res) => {
  /*
    #swagger.tags = ['Orders']
    #swagger.parameters['id'] = { description: 'Id do pedido' }
  */
  try {
    const id = parseInt(req.params.id);
    const deletedCount = await Order.destroy({
      where: {
        order_id: id,
      },
    });
    if (deletedCount === 0) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao deletar pedido" });
  }
};

const mapItemFields = (data) => {
  return {
    product_id: data.id_produto,
    price: data.preco,
    quantity: data.quantidade,
  };
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  deleteOrderById,
};
