const express = require("express")
const verification = require("../middleware/tokenValidation")
const seatStatusController = require("../controllers/seatStatusController")
const router = express.Router();
router.patch("/update",verification.verifyToken, seatStatusController.updateSeatStatus);
module.exports = router