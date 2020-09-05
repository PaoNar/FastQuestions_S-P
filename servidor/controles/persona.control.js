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
    // let data = await usuarios.find()
    // if(data) {
    //   res.status(200).json({
    //     transaccion: true,
    //     data,
    //     msg:'listo',
    //     token: req.token,
    //   })
    // } else {
    //   res.status(500).json({
    //     transaccion: false,
    //     data: null,
    //     msg: err
    // })
    // }
  }

  //inserta un usuario
//   let oneUsuario =  (req, res) =>{
//     nombre = req.body.nombre
//     apellido = req.body.apellido
//     usuarios.create({nombre, apellido})
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



let getPersonId = (req, res) => {
  let id = req.params.id
  // let person = await Person.findById({_id: id})
  usuarios.findById({_id: id})
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



  // if (person) {
  //     res.status(200).json({
  //         ok: true,
  //         person
  //     })
  // } else if (usuarios.length === 0) {
  //     res.send('El usaurio no está registrado en el sistema')
  // } else {
  //     res.status(500).json({
  //         ok: false,
  //         data: null
  //     })
  // }
}

let getPersonEmail = (req, res) => {
  let email = req.params.email
  usuarios.findOne({email: email})
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
  // let person = await usuarios.findOne({email: email})
  // if (person) {
  //     res.status(200).json({
  //         ok: true,
  //         person
  //     })
  // } else {
  //     res.status(200).json({
  //         ok: false,
  //         data: null,
  //         sms: 'Correo no registrado en el sistema'
  //     })
  // }
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
         // } else {
          //    return res.status(404)
          //}
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
  //oneUsuario,
  //allUsuarios,
  updateOneUsuario,
  getIdUsuario,
  borrarOneUsuario,
  borrarAllUsuario,
  login,
  nuevoUsuario,
  getPersonId,
  getPersonEmail
}
