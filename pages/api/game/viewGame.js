import { v4 as uuidv4 } from "uuid";
import Game from "../../../classes/game";
import db from "../../../utils/db";
/**
 * Summary: This API is used to get the information of a game.
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to the client.
 * req.query: {
 *  id: "gameId"
 * }
 * req.cookie: {
 *  playerId: "playerId",
 * }
 * res.statis: 200 | 400
 * res.data: {
 *  message: "Opps! Something went wrong."
 * } | {
 * currentState: "waiting" | "your turn" | "closed",
 * playerIndex: 0 | 1 | 2,
 * player1Action: "rock" | "paper" | "scissor",
 * player2Action: "rock" | "paper" | "scissor",
 * roundNumber: 1 | 2 | 3,
 * player1: "player1Id",
 * player2: "player2Id",
 * historyRound: []
 * }
 */

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
