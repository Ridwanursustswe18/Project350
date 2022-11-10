const { DataTypes, NUMBER } = require("sequelize");
const sequeilze = require("sequelize")
const database = require("../config/db.config")
const train = database.define(
    "train",{
        ID:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
        },
        train_name:{
           
            type:DataTypes.STRING,
            allowNull:false
          },
          capacity :{
            type:DataTypes.INTEGER
          
            
          },
          train_type :{
            type:DataTypes.STRING
            
            
          },
         
    },
    {
        freezeTableName: true
    }
);
train.sync()
module.exports = train

