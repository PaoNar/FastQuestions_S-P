;
'use strict'

const express = require("express"),
  multiParty = require("connect-multiparty");
  passwordControl = require("../middleware/password.control");
  autenticaControl = require("../middleware/autentica.control")
  

let api = express.Router(),
  usuarioControl = require("../controles/usuarios.control"),
  galleryMiddleware = multiParty({ uploadDir: "./files/galeria" });

//users ENDPOINT
api.get("/", (req, res) => {
  res.send("Hola API");
});

api.get('/get_usuarios', autenticaControl.autentica, usuarioControl.getUsuarios);
api.get('/get_idusuarios', usuarioControl.getIdUsuario);

api.post("/insertar_usuarios", usuarioControl.allUsuarios);
api.post("/one_usuarios", usuarioControl.oneUsuario);

api.put("/update_usuarios", usuarioControl.updateOneUsuario);

api.delete("/delete_usuarios", usuarioControl.borrarAllUsuario);

api.delete("/delete_idusuario", usuarioControl.borrarOneUsuario);

//api.put("/imagen_usuario/:id", galleryMiddleware, userController.postUserTest);

api.post('/nuevo_usuario', [passwordControl.codificarPassword], usuarioControl.nuevoUsuario);
api.post('/login',  usuarioControl.login) 



module.exports = api;
