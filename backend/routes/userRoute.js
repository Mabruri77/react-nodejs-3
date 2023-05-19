const express = require("express")
const { register, login, updateUser } = require("../controller/userController")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.patch("/update-user", updateUser)

module.exports = router
