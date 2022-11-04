const { DataTypes, NUMBER } = require("sequelize");
const sequeilze = require("sequelize")
const database = require("../config/db.config")


const passenger = database.define(
  
    "passenger",{
      ID :{
       
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER,
        
      },
      role:{
        defaultValue:"passenger",
        type:DataTypes.STRING
      },
      passenger_email:{
        type:DataTypes.STRING,
        allowNull:false
      },
      passenger_name :{
        type:DataTypes.STRING,
        allowNull: false
        
      },
      passenger_mobile_no:{
        type:DataTypes.STRING,
        allowNull: false
    },
    passenger_address :{
        type:DataTypes.STRING,
       
      },
      passenger_password :{
        type:DataTypes.STRING,
        allowNull: false
      },
      passenger_identification :{
        type:DataTypes.STRING,
        allowNull: false
      },
      passenger_post_code :{
        type:DataTypes.STRING,
        
      },
      profile_picture:{
        type:DataTypes.STRING,
        
      }
    },
    {
        freezeTableName: true
    }
);
 passenger.sync()
module.exports = passenger;