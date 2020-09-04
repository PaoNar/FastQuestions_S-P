;
'use strict'

const fs = require("fs"),
  path = require('path'),
  encuestas = require("../modelos/encuestasModel");
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken')

  //Trae todos los datos OK
  let getEncuestas = (req, res) => {
    encuestas
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


//Actualizar un usuario 
let updateOneUsuario = (req, res) =>{
  id = req.query.id
  data = req.body.data
  encuestas.updateOne( {'_id': id} , {$set: data})
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
let getIdEncuesta = (req, res) =>{
    id = req.query.id

    encuestas.find({'_id': id})
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

    encuestas.deleteOne({'_id': id})
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
    encuestas.deleteMany({})
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

  encuestas.create(usuario)
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

      encuestas.find({ email }).then((data) => {
      //console.log(data + "mongo")
      //if (data[0].email === email) {
              let tokenBody = {
                      email: data[0].email,
                      sessionID: data[0].sessionID,
                  },
                  token = jwt.sign({ data: tokenBody }, process.env.KEY_JWT, {
                      algorithm: "HS256",
                      expiresIn: 120,
                  });
                  
              bcrypt.compareSync(password, data[0].passw) ?
                  res.status(200).json({
                    transaccion: true,
                    data,
                    msg: "usuario encontrado",
                    token,
                  }) :
                  res.status(404).json({
                      transaccion: false,
                      data: null,
                      msg: "Password incorrecto",
                  });
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
  getEncuestas,
  //oneUsuario,
  //allencuestas,
  updateOneUsuario,
  getIdEncuesta,
  borrarOneUsuario,
  borrarAllUsuario,
  login,
  nuevoUsuario
}
