/**************************************
 * Proyecto Final
 *
 * Marina Haro
 * Carlos Carbajal
 * Fabián Camp
 * Hugo Vázquez
 **************************************/
const express = require("express");
const roomRout = require("./routes/room");
const roomMod = require("./models/room");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express();
var cors = require("cors");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

const db_url = "mongodb://localhost/dbRooms";
mongoose.connect(db_url, { userNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

app.use("/room", roomRout);
db.on("error", console.error.bind(console, "Error en la conexión"));


app.listen("8080", () => {
  console.log("server up");
});
