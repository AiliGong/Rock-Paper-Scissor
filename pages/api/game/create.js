import db from "../../../utils/db";
import Game from "../../../classes/game";
import { v4 as uuidv4 } from "uuid";
import GameRound from "../../../classes/GameRound";

/**
 * Summary: This API is used to create a new game.
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to the client.
 * * req.cookie: {
 *  playerId: "playerId",
 * }
 */

 const generateNewGameId = async () => {
    const gameId = uuidv4();
    // Check the roomId to see if it is already exist.
    // TODO: It is not the best way to do this as it will still cause a racing issue. (Although as uuid, it is very small chance) Correct solution as below: 
    // https://stackoverflow.com/questions/47543251/firestore-unique-index-or-unique-constraint
    // But for the purpose of this homework, keep it simple for now. 
    const game = await db.collection("games").doc(gameId).get();
    if (game.exists) {
        return generateNewGameId();
    } else {
        return gameId;
    }
}

export default async (req, res) => {
    // POST only restrictrs to the /api/room/create endpoint
    const {playerId} = req.cookies;
    if (req.method === "POST" && playerId) {
        try {
            const gameId = await generateNewGameId();
            const game = new Game({
                player1: playerId,
                gameId,
            })
            // Create the game and save into database
            await db.collection("games").doc(gameId).set(game.toObject());
            res.status(200).json({ gameId });
        } catch(error)  {
            console.log(error)
            res.status(400).json({message: "Opps! Something went wrong."});
        }
    } else {
        res.status(400).json({message: "Opps! Something went wrong."});
    }
}