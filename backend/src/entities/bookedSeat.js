const { DataTypes, NUMBER } = require("sequelize");
const sequeilze = require("sequelize")
const ticket = require("../entities/ticket")
const database = require("../config/db.config")
const bookedSeat = database.define(
    "booked_seat",{
        ID:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
        },
        seat_no:{
            type:DataTypes.STRING
        }
    }
)
ticket.hasMany(bookedSeat)
bookedSeat.sync()
module.exports = bookedSeat