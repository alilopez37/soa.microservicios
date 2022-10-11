const mysql = require('mysql2');

const config = {
    host : process.env.DB_HOST || 'systemadmin.cw9txxkwsaoy.us-east-1.rds.amazonaws.com',
    user : 'admin',
    database: 'example',
    password: '0HF73AZDqep1BnqVayMF',
};

const conn = mysql.createConnection(config);

conn.connect(function(err) {
    if (err) throw err;
    console.log('Conexión a la base de datos exitosa!');
});

module.exports = conn;