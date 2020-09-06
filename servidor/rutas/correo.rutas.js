;
'use strict'

const express = require("express")

let api = express.Router(),
  mail = require("../controles/enviarCorreo.control")

//correo ENDPOINT
api.post("/enviar_correo", mail.mail1)


module.exports = api;
