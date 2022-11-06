const { DataTypes, NUMBER } = require("sequelize");
const sequeilze = require("sequelize")
const bogey = require("../entities/bogey")
const database = require("../config/db.config")
const seat = database.define(
    "seat",{
        ID:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
        },
        seat_no:{
           
            type:DataTypes.STRING,
            allowNull:false
          },
         
          class:{
            type:DataTypes.STRING,
            allowNull:false
          }
       
    },
    {
        freezeTableName: true
    }
);
bogey.hasMany(seat)
 seat.sync()
module.exports = seat

