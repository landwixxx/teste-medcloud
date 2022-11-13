const mysql = require('mysql');

var pool = mysql.createPool({    
    "host": "localhost",
    "port": 3306,
    "driver": "MySQL",
    "database": "patients_db",
    "user": "root",
    "password": "controle*302109",
    "name": "db"    
});


exports.pool = pool;