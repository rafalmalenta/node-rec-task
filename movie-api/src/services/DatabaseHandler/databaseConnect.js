const mysql = require("mysql");
const  { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD  } = process.env;
const connection = ()=>{
    let con = mysql.createConnection({
        host: "database",
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE
    });
    con.connect((err)=>{
        if (err) throw err;
        });
    return con;

}
module.exports = connection;