const userDAO = require('../models/users')
const bcrypt = require('bcrypt')

const usernameValidate = (req, res) => {
    userDAO.findByUsername(req.params.username, (data) =>{
        try {
            if (!data) throw new Err("Usuario disponible")

            res.send({
                status: true,
                message: 'Usuario ocupado'
            })
        }
        catch(Err) {
            res.send({
                status: false,
                message: 'Usuario disponible'
            })
        }
    })
}

const signup = (req, res) => {

    if (req.user) {
        const user = {
            //idRol : req.body.idRol,
            nombre : req.body.nombre,
            apellidoPaterno : req.body.apellidoPaterno,
            apellidoMaterno : req.body.apellidoMaterno,
            username : req.body.username,
            password : bcrypt.hashSync(req.body.password,10)
        }
        userDAO.insertUser(user, (data) => {
            res.send({
                status: true,
                message: 'Usuario creado exitosamente'
            })
        }, err => {
            res.send({
                status:false,
                message: 'Ha ocurrido un error al crear la cuenta de usuario',
                errorMessage: err
            })
        })
    }
    else {
        res.send({
            status:false,
            message: 'Este servicio requiere el uso de un Token válido, contactar al administrador',
            error: '100. Falta token'
        })
    }

}

const login = (req,res) => {
    let username = req.body.username
    let password = req.body.password
    userDAO.findByUsername(username, (data) => {
        if (data) {
            console.log('Data =>',data)
            if (bcrypt.compareSync(password, data.password)){
                res.send({
                    status: true,
                    rol: idRol,
                    message: 'Contraseña correcta',
                    token: jwt.generateToken(data)
                })
            } else {
                res.send({
                    status: false,
                    message: 'Contraseña incorrecta'
                })
            }
        } else {
            res.send({
                status: false,
                message: 'La cuenta de usuario no existe'
            })
        }
    })
}

module.exports = {
    usernameValidate,
    signup,
    login
}















