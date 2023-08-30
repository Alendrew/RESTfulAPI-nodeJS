const { Router } = require("express");
const controller_order = require("./order/order_controller");
const controller_item = require('./item/item_controller');

const router = Router();

router.post("/items/", controller_item.createItem);
router.delete("/items/:id", controller_item.deleteItemById);
router.put("/items/:id",controller_item.updateItemById);

router.get("/orders/:id", controller_order.getOrderById);
router.get("/orders/", controller_order.getAllOrders);
router.post("/orders/", controller_order.createOrder);
router.delete("/orders/:id", controller_order.deleteOrderById);

module.exports = router;