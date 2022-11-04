
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
//local mysql db connection
const dbConn = new Sequelize(
    'railway_system',
    'root',
    null,
    {
        host:"localhost",
        dialect:"mysql",
        define:{timestamps:false}
    }
)
dbConn.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
module.exports = dbConn;