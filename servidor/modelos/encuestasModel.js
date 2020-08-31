const mongoose = require("mongoose");
const { json } = require("express");

const { Schema } = mongoose;

const encuestasModel = Schema({
  id: { type: Number },
  titulo: { type: String },
  encuestador: { type: String },
  contenido: { type: Array },
  escalaValoracion: { type: Array },
  grupoEncuestado: { type: String },
  encuestados:{type:Array},
});

module.exports = mongoose.model("encuestas", encuestasModel);
