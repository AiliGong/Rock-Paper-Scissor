import { v4 as uuidv4 } from "uuid";
import Game from "../../../classes/game";
import db from "../../../utils/db";

/**
 * Summary: This API is used to play a round of game.
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to the client.
 * req.body: {
 *  gameId: "gameId",
 *  action: "rock" | "paper" | "scissor"
 * }
 * req.cookie: {
 *  playerId: "playerId",
 * }
 * res.statis: 200 | 400
 * res.data: {
 *  message: "success" | "Opps! Something went wrong." | "You already played!" | "Game not exist!"
 * }
 */

export default async (req, res) => {
    const {playerId} = req.cookies;
    const {action, gameId} = req.body;
    if (req.method === "POST" && playerId && action) {
        const gameRef = db.collection("games").doc(gameId);
        try {
            const gameData = await gameRef.get();
            if (gameData.exists) {
                const game = new Game(gameData.data());
                if (game.play(playerId, action)) {
                    await gameRef.set(game.toObject());
                    res.status(200).json({message: "success"});
                } else {
                    res.status(400).json({ message: "You already played!" });
                }
            }else{
                res.status(400).json({ message: "Game not exist!" });
            }
        }catch(error) {
            console.log(error)
            res.status(400).json({message: "Opps! Something went wrong."});
        }
    }else {
        res.status(400).json({message: "Opps! Something went wrong."});
    }
}