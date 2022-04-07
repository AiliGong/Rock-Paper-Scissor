import db from "../../../utils/db";
import Game from "../../../classes/game";
import { v4 as uuidv4 } from "uuid";

/**
 * Summary: This API is used to join a game.
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to the client.
 * req.body: {
 *  gameId: "gameId",
 * }
 * req.cookie: {
 *  playerId: "playerId",
 * }
 * res.statis: 200 | 400
 * res.data: {
 *  message: "success" | "Opps! Something went wrong." | "Game ID is invalid!"
 * }
 */

const joinGame = async (gameRef, gameData, playerId) => {
    const game = new Game(gameData);
    if (game.join(playerId)) {
        await gameRef.set(game.toObject());
        return true
    }

    return false;
}

export default async (req, res) => {
    // POST only restrictrs to the /api/game/join endpoint
    const {playerId} = req.cookies;
    const {gameId} = req.body;
    if (req.method === "POST" && gameId && playerId) {
        const gameRef = db.collection("games").doc(gameId);
        try {
            const gameData = await gameRef.get();
            if (gameData.exists) {
                const game = await joinGame(gameRef, gameData.data(), playerId) 
                game ? res.status(200).json({message: "success"}) : res.status(400).json({message: "Opps! Something went wrong."});
            } else {
                res.status(400).json({message: "Game ID is invalid!"});
            }
        } catch(error)  {
            console.log(error)
            res.status(400).json({message: "Opps! Something went wrong."});
        }
    } else {
        res.status(400).json({message: "Opps! Something went wrong."});
    }
}