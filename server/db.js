const mysql = require('mysql2/promise')
const dbconfig = require('./config/db_config')
var connection
var connect = async () => {
  try {
    connection = await mysql.createConnection(dbconfig.config);
    console.log("Mysql database connected");
    const viewStudents = "SELECT * FROM students;"
    const [rows, fields] = await connection.query(viewStudents);
    console.log(rows)
    return connection
  }
  catch (err) {
    console.error(err);
    return null;
  }

}
connect();
module.exports= connect;