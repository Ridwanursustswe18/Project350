const express = require("express")
const verification = require("../middleware/tokenValidation")
const train_controller = require("../controllers/trainController")
const router = express.Router();
router.get("/search",train_controller.searchTrains)
router.get("/showBogeys",verification.verifyToken,train_controller.showBogeys)
router.get("/showSeats",verification.verifyToken,train_controller.showSeats)

module.exports = router