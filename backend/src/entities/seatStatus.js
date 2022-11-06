const { DataTypes, NUMBER } = require("sequelize");
const sequeilze = require("sequelize")
const trip = require("../entities/trip")
const seat = require("../entities/seat")
const database = require("../config/db.config")
const seat_status = database.define(
    "seat_status",{
        ID:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
        },
        seat_status:{
            defaultValue:"Not Booked",
            type:DataTypes.ENUM("Not Booked","Pending","Booked")

        }
    }
)
trip.hasMany(seat_status)
seat.hasOne(seat_status)
seat_status.sync()
module.exports = seat_status