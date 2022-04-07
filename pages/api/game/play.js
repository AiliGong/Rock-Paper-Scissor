import { v4 as uuidv4 } from "uuid";
import Game from "../../../classes/game";
import db from "../../../utils/db";

export default async (req, res) => {
    const {playerId} = req.cookies;
    const {action, gameId} = req.body;
    if (req.method === "POST" && playerId && action) {
        const gameRef = db.collection("games").doc(gameId);
        try {
            const gameData = await gameRef.get();
            if (gameData.exists) {
                const game = new Game(gameData.data());
                game.play(playerId, action);
                await gameRef.set(game.toObject());

            }
            res.status(200).json({ message: "success" });
        }catch(error) {
            console.log(error)
            res.status(400).json({message: "Opps! Something went wrong."});
        }
    }else {
        res.status(400).json({message: "Opps! Something went wrong."});
    }
}