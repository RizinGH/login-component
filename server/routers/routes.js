const Router = require("express");
const router = Router()
const multer = require('multer'); 
const upload = multer({ dest: './uploads/' });

const { register, login, reset_password } = require("../controllers/registration_controller")
const { profile, formcompleted } = require('../controllers/profile_controller')

router.post("/register",register)
router.post("/login", login)
router.post("/home", formcompleted)
router.post("/reset_password", reset_password)
router.post("/profile",upload.single("file"), profile)

module.exports = router