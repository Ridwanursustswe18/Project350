const { DataTypes, NUMBER } = require("sequelize");
const sequeilze = require("sequelize")
const ticket = require("../entities/ticket")

const database = require("../config/db.config")
const payment = database.define(
    "payment",{
        transaction_id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
        },
        total_fare:{
            type:DataTypes.INTEGER,
            allowNull:false

        },
        payment_method:{
            type:DataTypes.STRING,
            allowNull:false
        }
        
    }
)

ticket.hasOne(payment)
payment.sync()
module.exports = payment