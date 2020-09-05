const mongoose = require("mongoose");
const { json } = require("express");

const { Schema } = mongoose;

const encuestasModel = Schema({
  titulo: { type: String },
  encuestador: { type: String },
  contenido: { type: Array },
  grupoEncuestado: { type: String },
  encuestados:{type:Array},
});

module.exports = mongoose.model("encuestas", encuestasModel);
