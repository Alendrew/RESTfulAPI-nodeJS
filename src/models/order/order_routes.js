const { Router } = require ('express');
const controller = require('./order_controller')

const router = Router();

router.get('/', controller.getAllOrders)
router.post('/', controller.createOrder)

module.exports = router;