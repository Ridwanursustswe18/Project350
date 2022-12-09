const express = require("express")
const verification = require("../middleware/tokenValidation")
const ticketController = require("../controllers/ticketController")
const router = express.Router();
router.post("/create",verification.verifyToken, ticketController.createTicket);
router.get("/showTicket",verification.verifyToken, ticketController.showTicket)
module.exports = router

