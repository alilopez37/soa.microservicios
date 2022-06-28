const mysql = require('mysql2');

const config = {
    host : process.env.DB_HOST || '172.17.0.2',
    user : 'root',
    database: 'mysql',
    password: 'pass',
};

const conn = mysql.createConnection(config);

conn.connect(function(err) {
    if (err) throw err;
    console.log('Conexión a la base de datos exitosa!');
});

module.exports = conn;