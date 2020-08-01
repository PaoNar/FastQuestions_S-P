;
'use strict'

const jwt = require('jsonwebtoken'),
    bcrypt= require('bcrypt')


let codificarPassword = (req, res, next) =>{
    let data = req.body.data || null 

    if(!data || data.passw == '' || !data.passw ){
        console.log('usuario no valido')
        return res.status(500).send('usuario o contraseña invalidos linea 13')
    }else{
        let codificarPassword = bcrypt.hashSync(data.passw, bcrypt.genSaltSync(10))
        if(codificarPassword){
            req.body.data.passw = codificarPassword
            req.body.data.createAt = new Date()
            req.body.data.sessionID = req.sessionID

            if(req.sessionID){
                req.body.sessionID = req.sessionID
                next()
            }else{
                return res.status(500).send('usuario o contraseña invalidos line 25')
            }
           
        }else{
            return res.status(500).send('usuario o contraseña invalidos line 29')
        }
        
    }
}

module.exports = {
    codificarPassword
}