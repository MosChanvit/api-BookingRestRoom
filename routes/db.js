let mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"product_api"
  });
  con.connect();


module.exports = con;