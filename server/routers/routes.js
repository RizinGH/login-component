const Router = require("express");
const router = Router()
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../front-end/src/static/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

const { register, login, reset_password } = require("../controllers/registration_controller")
const { profile, formcompleted, getimage } = require('../controllers/profile_controller')

router.post("/register", register)
router.post("/login", login)
router.post("/home", formcompleted)
router.post("/reset_password", reset_password)
router.post("/profile", upload.single("file"), profile)
router.post("/getimage", getimage )

module.exports = router