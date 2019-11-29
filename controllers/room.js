const room = require("../models/room");
const jugador = require("../models/player");

var cards = [
  "CA",
  "C2",
  "C3",
  "C4",
  "C5",
  "C6",
  "C7",
  "C8",
  "C9",
  "C10",
  "CJ",
  "CQ",
  "CK",
  "DA",
  "D2",
  "D3",
  "D4",
  "D5",
  "D6",
  "D7",
  "D8",
  "D9",
  "D10",
  "DJ",
  "DQ",
  "DK",
  "PA",
  "P2",
  "P3",
  "P4",
  "P5",
  "P6",
  "P7",
  "P8",
  "P9",
  "P10",
  "PJ",
  "PQ",
  "PK",
  "TA",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "T8",
  "T9",
  "T10",
  "TJ",
  "TQ",
  "TK"
];
exports.firstScreen=(req,res)=>{
  res.render("enterRoom.html")
}
exports.secondScreen=(req,res)=>{
  res.render("waitingRoom.html")
}

exports.thirdScreen=(req,res)=>{
  room.find({}).then(data=>{
    data.forEach(rm=>{
      if(rm.nombre===req.params.room){
        res.render("mainGame.html", {info: rm})
      }
    })
  })
}


exports.getCard = (req, res) => {
  room.find({}).then(data => {
    data.forEach(rm => {
      var playerTurn = searchTurn(req.params.player, rm.jugadores);

      if (
        rm.nombre === req.params.room &&
        playerTurn === rm.jugadorEnTurno &&
        rm.cards.length > 0
      ) {
        var arrCards = rm.jugadores[playerTurn].cartas;
        var elArr = rm.cards.pop();
        arrCards = arrCards.concat(elArr);
        var tmpPlayers = rm.jugadores;
        tmpPlayers[playerTurn].cartas = arrCards;

        room.update(
          { nombre: req.params.room },
          {
            $set: {
              jugadores: tmpPlayers,
              cards: rm.cards
            }
          },
          function(err, up) {
            if (err) res.send("error");
            else res.redirect(`/${req.params.room}/${req.params.player}/gameStarted`);
          }
        );
      } else res.send("not player's turn or no more cards on deck");
    });
  });
};

exports.getPlayCard = (req, res) => {
  room.find({}).then(data => {
    data.forEach(rm => {
      if (rm.nombre === req.body.room) {
        res.send(rm.cartaEnJuego);
      } else res.send("error");
    });
  });
};

exports.getPlayerCards = (req, res) => {
  room.find({}).then(data => {
    data.forEach(rm => {
      if (rm.nombre === req.body.room) {
        rm.jugadores.forEach(jugador => {
          if (jugador.nombre === req.body.name) {
            res.send(jugador.cartas);
          }
        });
      } else res.send("error");
    });
  });
};

exports.passTurn = (req, res) => {
  room.find({}).then(data => {
    data.forEach(rm => {
      var playerTurn = searchTurn(req.params.player, rm.jugadores);
      if (rm.nombre === req.params.room && rm.jugadorEnTurno === playerTurn) {
        rm.jugadores.forEach(jugador => {
          if (jugador.nombre === req.params.player) {

            room.updateOne(
              { nombre: req.params.room },
              {
                $set: {
                  jugadorEnTurno: (rm.jugadorEnTurno + 1) % 2
                }
              },
              function(err, up) {
                if (err) res.send("error");
                else res.redirect(`/${req.params.room}/${req.params.player}/gameStarted`);
              }
            );
          }
        });
      } else res.send("error");
    });
  });
};

exports.playCard = (req, res) => {
  room.find({}).then(data => {
    data.forEach(rm => {
      var playerTurn = searchTurn(req.params.player, rm.jugadores);
      var nextTurn = (playerTurn + 1) % rm.jugadores.length;
      var arrCards = rm.jugadores[playerTurn].cartas;
      if (rm.nombre === req.params.room && rm.juegoEmpezado) {
        if (rm.jugadorEnTurno === playerTurn) {
          if (
            rm.cartaEnJuego.split("")[1] === 8 &&
            rm.cartaEnJuego.split("")[0] === req.body.card.split("")[0]
          ) {
            room.update(
              { nombre: req.params.room },
              {
                $set: {
                  cartaEnJuego: req.body.card,
                  jugadorEnTurno: nextTurn,
                  "jugadores.playerTurn.cartas": arrayRemove(
                    arrCards,
                    req.body.card
                  )
                }
              },
              { multi: true },
              function(err, up) {
                console.log(up);
                if (err) res.send("error");
                else res.redirect(`/${req.params.room}/${req.params.player}/gameStarted`);
              }
            );
          } else {
            if (req.body.card.split("")[1] === 8) {
              room.update(
                { nombre: req.params.room },
                {
                  $set: {
                    cartaEnJuego: req.body.jokerCard,
                    jugadorEnTurno: nextTurn,
                    "jugadores.playerTurn.cartas": arrayRemove(
                      arrCards,
                      req.body.card
                    )
                  }
                },
                { multi: true },
                function(err, up) {
                  console.log(up);
                  if (err) res.send("error");
                  else res.redirect(`/${req.params.room}/${req.params.player}/gameStarted`);
                }
              );
            } else {
              if (
                rm.cartaEnJuego.split("")[1] === req.body.card.split("")[1] ||
                rm.cartaEnJuego.split("")[0] === req.body.card.split("")[0]
              ) {
                room.update(
                  { nombre: req.params.room, "jugadores.nombre": req.params.player },
                  {
                    $set: {
                      cartaEnJuego: req.body.card,
                      jugadorEnTurno: nextTurn,
                      "jugadores.$.cartas": arrayRemove(arrCards, req.body.card)
                    }
                  },
                  { multi: true },
                  function(err, up) {
                    console.log(up);
                    if (err) res.send("error");
                    else res.redirect(`/${req.params.room}/${req.params.player}/gameStarted`);
                  }
                );
              } else res.send("error");
            }
          }
        } else res.send("not player's turn");
      } else res.send("game not started or room doesn't exists");
    });
  });
};

exports.createRoom = (req, res) => {
  
  var mrc = new room({
    nombre: req.body.room,
    cards: shuffle(cards),
    juegoEmpezado: 0
  });
  mrc.save(err => {
    if (err) res.render("error.html");
    res.render("enterRoom.html");
  });
};

exports.startGame = (req, res) => {
  room.find({}).then(data => {
    data.forEach(rm => {
      if (
        rm.nombre == req.params.room &&
        rm.jugadores.length > 1 &&
        rm.juegoEmpezado != 1
      ) {
        room.update(
          { nombre: req.params.room },
          {
            $set: {
              juegoEmpezado: 1,
              cartaEnJuego: rm.cards.pop(),
              cards: rm.cards,
              jugadorEnTurno: 0
            }
          },
          { multi: true },
          function(err, up) {
            console.log(up);
            if (err) res.send("error");
            else res.redirect(`/${req.params.room}/${req.params.player}/gameStarted`);
          }
        );
      } else if (
        rm.nombre == req.params.room &&
        rm.jugadores.length > 1 &&
        rm.juegoEmpezado === 1
      ) {res.redirect(`/${req.params.room}/${req.params.player}/gameStarted`)} else res.redirect(`/${req.params.room}/${req.params.player}`);
    });
  });
};

exports.joinRoom = (req, res) => {
  room.find().then(data => {
    data.forEach(rm => {
      if (
        rm.nombre === req.body.room &&
        rm.jugadores.length < 5 &&
        !search(req.body.name, rm.jugadores) &&
        rm.juegoEmpezado != 1
      ) {
        var player = new jugador({
          nombre: req.body.name,
          cartas: rm.cards.splice(0, 5),
          id_jugador: rm.jugadores.length
        });
        var playArr = rm.jugadores;
        playArr.push(player);
        room.updateOne(
          {
            $set: { jugadores: playArr }
          },
          function(err, up) {
            if (err) res.send("error");
            else {
              room.updateOne(
                {
                  $set: { cards: rm.cards }
                },
                function(err, up) {
                  if (err) res.render("error.html");
                  else res.redirect(`${req.body.room}/${req.body.name}/`);
                }
              );
            }
          }
        );
      } else
        res.send("room full, doesn't exist, game started, or username taken");
    });
  });
};

function shuffle(arra1) {
  var ctr = arra1.length,
    temp,
    index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}

function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].nombre === nameKey) {
      return true;
    }
  }
  return false;
}

function searchTurn(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].nombre === nameKey) {
      return i;
    }
  }
  return false;
}
function arrayRemove(arr, value) {
  return arr.filter(function(ele) {
    return ele != value;
  });
}
