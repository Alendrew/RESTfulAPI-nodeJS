const Item = require("../item/Item");
require("../../config/associations");


const createItem = async (req, res) => {
  /*  
    #swagger.tags = ['Items']
    #swagger.parameters['item'] = {
      in: 'body',
      schema: {
          $id_pedido: 1,  
          $id_produto: 1,
          $preco: 29.90,
          $quantidade: 10
      }
    } 
  */
  try {
    const mappedItem = mapItemFields(req.body);
    if(!await Order.findByPk(mappedItem.order_id, {})){
      return res.status(404).json({ error: "Id do pedido não encontrado" });
    };
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
  /* 
    #swagger.tags = ['Items']
    #swagger.parameters['id'] = { description: 'Id do Item' }
  */
  try {
    const id = parseInt(req.params.id);
    const deletedCount = await Item.destroy({
      where: {
        id: id,
      },
    });
    if (deletedCount === 0) {
      return res.status(404).json({ error: "Item não encontrado" });
    }
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao deletar item" });
  }
};

const updateItemById = async (req, res) => {
  /* 
    #swagger.tags = ['Items']
    #swagger.parameters['id'] = { description: 'Id do Item' } 
    #swagger.parameters['item'] = {
      in: 'body',
      schema: {
          $id_pedido: 1,  
          $id_produto: 1,
          $preco: 29.90,
          $quantidade: 10
      }
    } 
  */
  try {
    const id = parseInt(req.params.id);
    const mappedItem = mapItemFields(req.body);
    if(!await Order.findByPk(mappedItem.order_id, {})){
      return res.status(404).json({ error: "Id do pedido não encontrado" });
    };
    const item = await Item.update(id, {
      order_id: mappedItem.order_id,
      product_id: mappedItem.product_id,
      price: mappedItem.price,
      quantity: mappedItem.quantity,
    });
    if (!item) {
      return res.status(404).json({ error: "Item não encontrado" });
    }
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
