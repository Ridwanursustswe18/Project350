const { DataTypes, NUMBER } = require("sequelize");
const sequeilze = require("sequelize")
const train = require("../entities/train")
const database = require("../config/db.config")
const trip = database.define(
    "trip",{
        ID:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
        },
        trip_date:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        destination:{
            type:DataTypes.STRING,
            allowNull:false
          },
         
          source:{
            type:DataTypes.STRING,
            allowNull:false
          },
          departure_time:{
            type:DataTypes.TIME,
            allowNull:false
          },
          arrival_time:{
            type:DataTypes.TIME,
            allowNull:false
          },
         
          seat_available_online:{
            type:DataTypes.INTEGER
          },
          seat_available_counter:{
            type:DataTypes.INTEGER
          },
          total_time:{
            type:DataTypes.STRING
          }
                

       
       
    },
    {
        freezeTableName: true
    }
);
train.hasOne(trip)
trip.belongsTo(train)
trip.sync()
module.exports = trip

