const express = require("express")
const verification = require("../middleware/tokenValidation")
const seatStatusController = require("../controllers/seatStatusController")
const router = express.Router();
router.patch("/update",verification.verifyToken, seatStatusController.updateSeatStatus);
>>>>>>> f303a40f3d10ae9710c9772bb8548425df12ada9
module.exports = router