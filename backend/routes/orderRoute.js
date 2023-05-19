const express = require("express")
const { createOrder, getOrder } = require("../controller/orderController")
const { protect } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/", createOrder)
router.get("/:id", protect, getOrder)

module.exports = router
