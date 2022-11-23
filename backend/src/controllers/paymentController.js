const { query } = require("express");
require('dotenv').config()
const database = require("../config/db.config");
const stripe = require("stripe")(process.env.SECRET_KEY);
const uuid = require("uuid");

exports.payment = async (req, res) => {
  const user = req.user;
  const { totalFare } = req.body;


  // const idempontencKey = uuid;

  let query1 = "SELECT * FROM `passenger` WHERE passenger_id = ?";

  database.query(query1, [user.ID], async(err, results) => {
    if (results && results[0].passenger_id === user.ID) {
      if (!err) {
        
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items:[{
          price_data:{
            currency:"bdt",
            product_data:{
              name:"ticket"
            },
            unit_amount:totalFare*100
          },
          quantity:1
        }],
        success_url: `http://localhost:3001/success`,
        cancel_url: `http://localhost:3001/failure`,
        })
        res.send({url:session.url})
    } else {
      return res.status(401).json(err);
    }
  }
});
};