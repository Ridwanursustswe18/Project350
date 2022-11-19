const { query } = require("express");
const database = require("../config/db.config");
const stripe = require("stripe")("");
const uuid = require("uuid/v4");

exports.payment = async (req, res) => {
  const user = req.user;
  const { totalPrice, token } = req.body;

  console.log("totalPrice", totalPrice);
  const idempontencKey = uuid();

  let query1 = "SELECT * FROM `passenger` WHERE passenger_id = ?";

  database.query(query1, [user.ID], (err, results) => {
    if (results && results[0].passenger_id === user.ID) {
      if (!err) {
        return stripe.passenger
          .create({
            email: token.email,
            source: token.id,
          })
          .then((passenger) => {
            stripe.charges.create({
              amount: totalPrice * 100,
              currency: "usd",
              passenger: passenger.id,
              receipt_email: token.email,
            });
            {
              idempontencKey;
            }
          })
          .then((result) => res.status(200).json(result))
          .catch((err) => console.log(err));
      }
    } else {
      return res.status(401).json(err);
    }
  });
};
