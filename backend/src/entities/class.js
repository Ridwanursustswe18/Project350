const { DataTypes } = require("sequelize");
const sequeilze = require("sequelize")
const database = require("../config/db.config");
const bogey = require("./bogey");
const seat = require("./seat");
const train = require("./train");
const seat_class = database.define(
    "seat_class",{
        ID:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            autoIncrement:true,
        },
        class_name:{
           type: DataTypes.STRING,
            allowNull:false
        },
        fare:{
            type:DataTypes.INTEGER,
            allowNull:false
        }

    },
    {
        freezeTableName: true
    }


)
train.hasMany(seat_class),
seat_class.belongsTo(train),



seat_class.sync(),
module.exports  = seat_class