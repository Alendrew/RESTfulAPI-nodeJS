const { Router } = require ('express');
const controller = require('./item_controller')

const router = Router();

router.post("/", controller.createItem)
router.delete("/:id", controller.deleteItemById)
router.put("/:id",controller.updateItemById)


module.exports = router;