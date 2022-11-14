const mysql = require('mysql');

var pool = mysql.createPool({    
    "host": process.env.HOST,
    "port": process.env.PORT,
    "driver": process.env.DRIVER,
    "database": process.env.DATABASE,
    "user": process.env.USER,
    "password": process.env.PASSWORD,
    "name": process.env.NAME    
});


exports.pool = pool;