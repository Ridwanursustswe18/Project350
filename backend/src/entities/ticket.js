const { DataTypes, NUMBER } = require("sequelize");
const sequeilze = require("sequelize")
const passenger = require("../entities/passenger")
const trip = require("../entities/trip")
const database = require("../config/db.config")

const ticket = database.define(
    "ticket",{
        ID:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
        },
        issue_date:{
           
            type:DataTypes.DATE,
            allowNull:false
          },
          issue_time:{
            type:DataTypes.TIME,
            allowNull:false
          
            
          },
          total_fare:{
            type:DataTypes.INTEGER,
            allowNull:false
            
          },
          service_charge:{
            type:DataTypes.INTEGER,
            allowNull:false
          
            
          },
       
    },
    {
        freezeTableName: true
    }
);
passenger.hasOne(ticket)
trip.hasMany(ticket)
ticket.sync()
module.exports = ticket

