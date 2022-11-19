const express = require("express")
const verification = require("../middleware/tokenValidation")
const paymentController = require("../controllers/paymentController")
const router = express.Router();
router.post("/makePayment",verification.verifyToken, seatStatusController.updateSeatStatus);
module.exports = router