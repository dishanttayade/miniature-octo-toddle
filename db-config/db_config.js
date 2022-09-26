const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createPool({
    host: process.env.SQL_Host || 'localhost',
    user: process.env.SQL_Username || 'root',
    password: process.env.SQL_Password || 'password',
    database: process.env.SQL_Database || 'toddle',
    port: parseInt(process.env.SQL_PORT) || 3306
});

connection.getConnection((err, connection)=>{
    if(err) console.log(err);
    console.log("Database connection successful :  " + connection.threadId);
})

module.exports = connection;