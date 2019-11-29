const mng = require("mongoose");
const Schema = mng.Schema;

var Jugador = new Schema({
  id_jugador: Number,
  nombre: String,
  cartas: [String]
});

var Room = new Schema({
  nombre: String,
  juegoEmpezado: Number,
  jugadores: [Jugador],
  cards: [String],
  cartaEnJuego: String,
  jugadorEnTurno: Number
});

module.exports = mng.model("Room", Room);
