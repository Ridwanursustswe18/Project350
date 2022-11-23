const express = require("express")
const verification = require("../middleware/tokenValidation")
const paymentController = require("../controllers/paymentController")
const router = express.Router();
router.post("/makePayment",verification.verifyToken, paymentController.payment);
module.exports = router