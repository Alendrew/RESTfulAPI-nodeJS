const Item = require("../item/Item");
require("../../config/associations");

const createItem = async (req, res) => {
  try {
    const { order_id, product_id, price, quantity } = req.body;
    await Item.create({
      order_id,
      product_id,
      price,
      quantity,
    });
    res.status(201).json({ message: "Item criado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao criar item" });
  }
};

const deleteItemById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Item.destroy({
      where: {
        id: id,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao deletar item" });
  }
};

const updateItemById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { order_id, product_id, price, quantity } = req.body;
    await Item.update(id, {
      order_id,
      product_id,
      price,
      quantity,
    });
    res.status(200).json({ message: "Item atualizado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao atualizar item" });
  }
  res.status(204).end();
};

module.exports = {
  createItem,
  deleteItemById,
  updateItemById,
};
