const { DataTypes, NUMBER } = require("sequelize");
const sequeilze = require("sequelize")
const database = require("../config/db.config")
const admin = database.define(
    "admin",{
        ID:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
        },
        role:{
            defaultValue:"admin",
            type:DataTypes.STRING
          },
          admin_name :{
            type:DataTypes.STRING,
            allowNull: false
            
          },
          admin_email :{
            type:DataTypes.STRING,
            allowNull: false
            
          },
          admin_password :{
            type:DataTypes.STRING,
            allowNull: false
            
          }
    },
    {
        freezeTableName: true
    }
);
admin.sync()
module.exports = admin

