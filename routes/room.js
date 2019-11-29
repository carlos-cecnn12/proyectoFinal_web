const express = require("express");
const router = express.Router();

const roomCon = require("../controllers/room");

router.post("/createRoom", roomCon.createRoom);
router.post("/joinRoom", roomCon.joinRoom);
router.post("/:room/:player/startGame", roomCon.startGame);
router.post("/:room/:player/playCard", roomCon.playCard);
router.post("/playerCards", roomCon.getPlayerCards);
router.post("/:room/:player/askCard", roomCon.getCard);
router.post("/:room/:player/boardCard", roomCon.getPlayCard);
router.post("/:room/:player/passTurn", roomCon.passTurn);
router.get("/",roomCon.firstScreen)
router.get("/:room/:player",roomCon.secondScreen)
router.get("/:room/:player/gameStarted",roomCon.thirdScreen)
module.exports = router;
