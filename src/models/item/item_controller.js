const Item = require("../item/Item");
require("../../config/associations");

const createItem = async (req, res) => {
  try {
    const mappedItem = mapItemFields(req.body);
    await Item.create({
      order_id: mappedItem.order_id,
      product_id: mappedItem.product_id,
      price: mappedItem.price,
      quantity: mappedItem.quantity,
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
    const mappedItem = mapItemFields(req.body);
    await Item.update(id, {
      order_id: mappedItem.order_id,
      product_id: mappedItem.product_id,
      price: mappedItem.price,
      quantity: mappedItem.quantity,
    });
    res.status(200).json({ message: "Item atualizado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao atualizar item" });
  }
  res.status(204).end();
};

const mapItemFields = (data) => {
  return {
    order_id: data.id_pedido,
    product_id: data.id_produto,
    price: data.preco,
    quantity: data.quantidade,
  };
};

module.exports = {
  createItem,
  deleteItemById,
  updateItemById,
};
