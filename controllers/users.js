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

    if (JSON.stringify(req.body) !== '{}') {
        console.log('Por acá')
        const user = {
            //idRol : req.body.idRol,
            name : req.body.name,
            lastname : req.body.lastname,
            username : req.body.username,
            password : bcrypt.hashSync(req.body.password,10)
        }
        console.log(user.password.length)
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
        console.log(':)')
        res.send({
            status:false,
            message: 'Este servicio un objeto json, contactar al administrador',
            error: '100. Falta object'
        })
    }

}

const login = (req,res) => {
    if (req.body.username) {
        let username = req.body.username
        let password = req.body.password
        userDAO.findByUsername(username, (data) => {
            if (data) {
                console.log('Data =>', data)
                if (bcrypt.compareSync(password, data.password)) {
                    res.send({
                        status: true,
                        message: 'Contraseña correcta',
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
    } else {
        res.send({
            status: false,
            message: 'Ha ocurrido un error en la invocación del método'
        })
    }
}

module.exports = {
    usernameValidate,
    signup,
    login
}















