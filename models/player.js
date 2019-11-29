const mng = require("mongoose");
const Schema = mng.Schema;
var Jugador = new Schema({
  nombre: String,
  cartas: [String],
  turno: Number
});
module.exports = mng.model("Jugador", Jugador);