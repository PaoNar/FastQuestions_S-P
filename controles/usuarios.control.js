;
'use strict'

const fs = require("fs"),
  path = require('path'),
  usuarios = require("../modelos/userModel");
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken')



  //Trae todos los datos
  let getUsuarios = async (req, res) =>{
    let data = await usuarios.find()
    if(data) {
      res.status(200).json({
        transaccion:true,
        data,
        msg:'listo',
      })
    } else {
      res.status(500).json({
        transaccion: false,
        data: null,
        msg: err
    })
    }
  }

  //inserta un usuario
  let oneUsuario =  (req, res) =>{
    nombre = req.body.nombre
    apellido = req.body.apellido
    usuarios.create({nombre, apellido})
      .then(data =>{
        res.status(200).json({
          transaccion: true,
          data: data,
          msg: 'listo'
        })
      }).catch( err =>{
        res.status(500).json({
          transaccion: false,
          data: null,
          msg: err
      })
  })
}
  

 //insertar varios usuarios
 let allUsuarios = (req, res) =>{
    data = req.body.data
    usuarios.insertMany(data)
      .then(data =>{
        res.status(200).json({
          transaccion: true,
          data: data,
          msg: 'listo'
        })
      }).catch( err =>{
        res.status(500).json({
          transaccion: false,
          data: null,
          msg: err
      })
  })
}


//Actualizar un usuario 
let updateOneUsuario = (req, res) =>{
  id = req.query.id
  data = req.body.data
  usuarios.updateOne( {'_id': id} , {$set: data})
    .then(data =>{
      res.status(200).json({
        transaccion: true,
        data: data,
        msg: 'listo'
      })
    }).catch( err =>{
      res.status(500).json({
        transaccion: false,
        data: null,
        msg: err
    })
  })
}

    

//Buscar por id
let getIdUsuario = (req, res) =>{
    id = req.query.id
    usuarios.find({'_id': id})
      .then(data =>{
        res.status(200).json({
          transaccion: true,
          data: data,
          msg: 'listo'
        })
      }).catch( err =>{
        res.status(500).json({
          transaccion: false,
          data: null,
          msg: err
      })
  })
}



//Borrar one
let borrarOneUsuario = (req, res) =>{
    id = req.query.id
    usuarios.deleteOne({'_id': id})
      .then(data =>{
        res.status(200).json({
          transaccion: true,
          data: data,
          msg: `${data.deletedCount}`
        })
      }).catch( err =>{
        res.status(500).json({
          transaccion: false,
          data: null,
          msg: err
      })
  })
}


//Borrar varios
let borrarAllUsuario = (req, res) =>{
    usuarios.deleteMany({})
      .then(data =>{
        res.status(200).json({
          transaccion: true,
          data: data,
          msg: 'listo'
        })
      }).catch( err =>{
        res.status(500).json({
          transaccion: false,
          data: null,
          msg: err
      })
  })
}



let nuevoUsuario = async(req, res) =>{
  let usuario = req.body.usuario
  usuarios.create(usuario)
    .then((data) =>{
        res.status(200).json({
            data,
            msg:'usuario OK',

        })

    }).catch(err =>{
        res.status(500).json({
            data: null,
            msg:'No se pudo crear el usuario'
            
    })
  })
}



let login = (req, res) => {
   let data = req.body.data,
      email = data.email,
      password = data.password;
      usuarios.find({ email }).then((data) => {
          if (data[0].email === email) {
              let tokenBody = {
                      email: data[0].email,
                      name: data[0].name,
                  },
                  token = jwt.sign({ data: tokenBody }, process.env.KEY_JWT, {
                      algorithm: "HS256",
                      expiresIn: 6000,
                  });
              bcrypt.compareSync(password, data[0].passw) ?
                  res.status(200).json({
                      token,
                  }) :
                  res.status(404).json({
                      ok: false,
                      data: null,
                      msg: "Password incorrecto",
                  });
          } else {
              return res.status(404)
          }
      })
      .catch((err) => {
          return res.status(404).json({
              ok: false,
              data: null,
              msg: "Email incorrecto",
          });
      });

};




module.exports = {
  getUsuarios,
  oneUsuario,
  allUsuarios,
  updateOneUsuario,
  getIdUsuario,
  borrarOneUsuario,
  borrarAllUsuario,
  login,
  nuevoUsuario
}
