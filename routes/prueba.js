var express = require('express');
var router = express.Router();
const amqplib = require('amqplib');

/* GET home page. */
router.get('/', async function(req, res, next) {
    //Acá va el código para generar el evento inicial
    const queue = 'Initial';
    const conn = await amqplib.connect('amqp://3.225.168.16');
    console.log('Conexion exitosa')
    const ch1 = await conn.createChannel();
    console.log('Canal creado')

    let status = await ch1.sendToQueue(queue, Buffer.from(JSON.stringify({
        id: 1,
        description: 'Prueba de codificación'
    })))
    console.log('Mensaje entrado exitosamente')
    conn.close()
    //Continúa código de API
    res.send({
        id: 1,
        description: 'Prueba de codificación'
    })
    //res.render('index', { title: 'Programación web' });
});

module.exports = router;