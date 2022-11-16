const express = require("express")
const verification = require("../middleware/tokenValidation")
const ticketController = require("../controllers/ticketController")
const router = express.Router();
router.post("/createTicket",verification.verifyToken, ticketController.createTicket);
module.exports = router

// ,verification.verifyToken,ticketController.createTicket