const express = require("express")
const { getAll } = require("../controller/productController")
const router = express.Router()
router.get("/", getAll)

module.exports = router
