const Router = require("express");
const router = Router()

const { register, login, reset_password } = require("../controllers/registration")

router.post("/register",register)
router.post("/login", login)
router.post("/reset_password", reset_password)

module.exports = router