const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "database-2.c18cukuqyzii.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "mengolegal",

});

connection.connect(function (err) {
  if (err) throw err; // Caso a conexão falahar

  connection.query("CREATE DATABASE IF NOT EXISTS rdsexample;")
  connection.query("USE rdsexample;")
});

module.exports = connection;
