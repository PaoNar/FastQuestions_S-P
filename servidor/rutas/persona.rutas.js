;
'use strict'

const express = require("express"),
  multiParty = require("connect-multiparty");
  passwordControl = require("../middleware/password.control");
  autenticaControl = require("../middleware/autentica.control")
  

let api = express.Router(),
  usuarioControl = require("../controles/usuarios.control")

//users ENDPOINT
api.get("/", (req, res) => {
  res.send("Hola API");
});

api.get('/get_persona', usuarioControl.getUsuarios);
api.get('/get_idpersona', usuarioControl.getIdUsuario);

api.post("/insertar_persona", usuarioControl.allUsuarios);
api.post("/one_persona", usuarioControl.oneUsuario);

api.put("/update_persona", usuarioControl.updateOneUsuario);

api.delete("/delete_persona", usuarioControl.borrarAllUsuario);

api.delete("/delete_idpersona", usuarioControl.borrarOneUsuario);


api.post('/nuevo_persona', [passwordControl.codificarPassword], usuarioControl.nuevoUsuario);
//api.post('/login',  usuarioControl.login) 



module.exports = api;
