
const mysql = require('mysql')
const connection = mysql.createConnection({
  port:3306,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'railway_system'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})


module.exports = connection;