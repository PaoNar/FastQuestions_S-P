const mongoose = require("mongoose");

const { Schema } = mongoose;

const personaModel = Schema({
  nombre: { type: String },
  apellido: { type: String },
  genero: { type: String },
  email:  { 
    type: String,
    require: true,
    trim: true, //se le quita  los espacios en blanco
    unique: true,
  },
  passw: { type: String },
  // createAt: { type: String },
  lastActiveAt: { type: Date},
  sessionID: { type: String },
  rol: {
    default: 'encuestador',
    type: String
  },
});

module.exports = mongoose.model("usuarios", personaModel);
