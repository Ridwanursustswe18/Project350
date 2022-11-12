const express = require("express")
const varification = require("../middleware/tokenValidation")
const imageMiddleWare = require("../middleware/imageMiddleware")
const userRole = require("../middleware/authorizeRole")
const userRouter = require("../controllers/UserController")
const router = express.Router()


router.patch("/update/:ID",varification.verifyToken,imageMiddleWare.image,userRouter.updateProfile)
router.get("/getProfile/:ID",varification.verifyToken,userRouter.getSingleUser)
module.exports = router