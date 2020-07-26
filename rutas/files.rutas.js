;
'use strict'

const express = require("express"),
  multiParty = require("connect-multiparty");

let api = express.Router(),
  filesController = require("../controles/files.control"),
  galleryMiddleware = multiParty({ uploadDir: "./files/galeria" })

//files ENDPOINT
//nombre .ver
api.get("/files/:directory/:urlFile", filesController.showFiles);
//subir
api.post("/files_galeria", galleryMiddleware, filesController.uploadFile);
//borrar
api.delete("/files/:directory/:urlFile", filesController.deleteFiles);

//actualizar
api.put( "/files/:directory/:urlFile",
  galleryMiddleware,
  filesController.modifyFiles
);

module.exports = api;
