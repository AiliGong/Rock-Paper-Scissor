import { v4 as uuidv4 } from "uuid";
import Game from "../../../classes/game";
import db from "../../../utils/db";

export default async (req, res) => {
  const { playerId } = req.cookies;
  const gameId = req.query.id;
  if (req.method === "GET" && playerId && gameId) {

    const gameRef = db.collection("games").doc(gameId);
    try {
      const gameData = await gameRef.get();
      if (gameData.exists) {
        const game = new Game(gameData.data());
        const data = game.getGameViewByPlayerId(playerId);

        res.status(200).json(data);
      } else {
        res.status(400).json({ message: "Opps! Something went wrong." });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Opps! Something went wrong." });
    }
  } else {
    res.status(400).json({ message: "Opps! Something went wrong." });
  }
};
