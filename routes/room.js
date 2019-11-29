const express = require("express");
const router = express.Router();

const roomCon = require("../controllers/room");

router.post("/createRoom", roomCon.createRoom);
router.post("/joinRoom", roomCon.joinRoom);
router.post("/startGame", roomCon.startGame);
router.post("/playCard", roomCon.playCard);
router.post("/playerCards", roomCon.getPlayerCards);
router.post("/askCard", roomCon.getCard);
router.post("/boardCard", roomCon.getPlayCard);
router.post("/passTurn", roomCon.passTurn);
router.get("/",roomCon.firstScreen)
router.get("/:room/:player",roomCon.secondScreen)
module.exports = router;
