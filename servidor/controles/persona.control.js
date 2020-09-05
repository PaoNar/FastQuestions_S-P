;
'use strict'

const fs = require("fs"),
  path = require('path'),
  usuarios = require("../modelos/personaModel");
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken')

  //Trae todos los datos OK
  let getUsuarios = (req, res) => {
    usuarios
    .find()
    .then((data) => {
      res.status(200).json({
        ok: true,
        data,
        msg: "ready",
        token: req.token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
  }

  

 //insertar varios usuarios
//  let allUsuarios = (req, res) =>{
//     data = req.body.data
//     usuarios.insertMany(data)
//       .then(data =>{
//         res.status(200).json({
//           transaccion: true,
//           data: data,
//           msg: 'listo'
//         })
//       }).catch( err =>{
//         res.status(500).json({
//           transaccion: false,
//           data: null,
//           msg: err
//       })
//   })
// }


//Actualizar un usuario 
let updateOneUsuario = (req, res) =>{
  id = req.query.id
  data = req.body.data
  usuarios.updateOne( {'_id': id} , {$set: data})
    .then(data =>{
      res.status(200).json({
        transaccion: true,
        data: data,
        msg: 'listo',
        token: req.token,
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
          msg: 'listo',
          token: req.token,
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
          msg: `${data.deletedCount}`,
          token: req.token,
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
          msg: 'listo',
          token: req.token,
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
  let usuario = req.body.data

  usuarios.create(usuario)
    .then((data) =>{
        res.status(200).json({
          transaccion: true,
            data,
            msg:'usuario OK',
            token: req.token,
        })

    }).catch(err =>{
        res.status(500).json({
          transaccion: false,
          data: null,
            msg:'No se pudo crear el usuario'
    })
  })
}


let login = (req, res) => {
   let {data} = req.body,
      email = data.email,
      password = data.password;

      //console.log(data)
      //console.log(data.email)
      //console.log(data.password)

      usuarios.find({ email }).then((data) => {
      //console.log(data + "mongo")
      //if (data[0].email === email) {       
        if(bcrypt.compareSync(password, data[0].passw)) {
          let tokenBody = {
            email: data[0].email,
            sessionID: data[0].sessionID,
            rol: data[0].rol
        },
        token = jwt.sign({ data: tokenBody }, process.env.KEY_JWT, {
            algorithm: "HS256",
            expiresIn: 120,
        });

            res.status(200).json({
              transaccion: true,
              data,
              msg: "usuario encontrado",
              token,
            })
        } else {
          res.status(404).json({
            transaccion: false,
            data: null,
            msg: "Password incorrecto",
        });
        }
      })
      .catch((err) => {
          return res.status(404).json({
              transaccion: false,
              data: null,
              msg: "Email incorrecto" + err,
          });
      });

};


module.exports = {
  getUsuarios,
  //allUsuarios,
  updateOneUsuario,
  getIdUsuario,
  borrarOneUsuario,
  borrarAllUsuario,
  login,
  nuevoUsuario
}
