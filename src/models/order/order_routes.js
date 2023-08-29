const { Router } = require ('express');
const controller = require('./order_controller')

const router = Router();

router.get("/:id", controller.getOrderById)
router.get("/", controller.getAllOrders)
router.post("/", controller.createOrder)
router.delete("/:id", controller.deleteOrderById)


module.exports = router;