const { DataTypes, NUMBER } = require("sequelize");
const sequeilze = require("sequelize")
const train = require("../entities/train")
const database = require("../config/db.config");

const bogey = database.define(
    "bogey",{
        ID:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
        },
        bogey_name:{
           
            type:DataTypes.STRING,
            allowNull:false
          },
          total_seat:{
            type:DataTypes.INTEGER
          
            
          },
       
    },
    {
        freezeTableName: true
    }
);
train.hasMany(bogey)

 bogey.sync()
module.exports = bogey

