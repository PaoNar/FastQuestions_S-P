;
'use strict'

const express = require("express"),
  multiParty = require("connect-multiparty");
  passwordControl = require("../middleware/password.control");
  autenticaControl = require("../middleware/autentica.control")
  

let api = express.Router(),
  personaControl = require("../controles/persona.control")

//users ENDPOINT
api.get("/", (req, res) => {
  res.send("Hola API");
});

api.get('/get_persona', autenticaControl.autentica, personaControl.getUsuarios);
api.get('/get_idpersona', autenticaControl.autentica, personaControl.getIdUsuario);

//api.post("/insertar_persona", personaControl.allUsuarios);
//api.post("/one_persona", autenticaControl.autentica, personaControl.oneUsuario);

api.put("/update_persona", autenticaControl.autentica, personaControl.updateOneUsuario);

api.delete("/delete_persona", personaControl.borrarAllUsuario);

api.delete("/delete_idpersona", autenticaControl.autentica, personaControl.borrarOneUsuario);


api.post('/nuevo_persona', [autenticaControl.autentica, passwordControl.codificarPassword], personaControl.nuevoUsuario);

//=>
api.post('/login',  personaControl.login) 



module.exports = api;
