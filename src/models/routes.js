const { Router } = require("express");
const controller_order = require("./order/order_controller");
const controller_item = require('./item/item_controller');

const router = Router();

router.post("/items/", controller_item.createItem);
router.delete("/items/:id", controller_item.deleteItemById);
router.put("/items/:id",controller_item.updateItemById);


router.get("/order/:id", controller_order.getOrderById);
router.get("/order/", controller_order.getAllOrders);
router.post("/order/", controller_order.createOrder);
router.delete("/order/:id", controller_order.deleteOrderById);

module.exports = router;