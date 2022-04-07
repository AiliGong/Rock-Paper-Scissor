import { Typography } from "@mui/material";
import styles from "../../styles/Game.module.css";
import ChooseAction from "./ChooseAction";
import HistoryTable from "./HistoryTable";

export default function GameBoard({ gameData, play }) {

  //get the final game result based on the game history
  const getResult = () => {
    let p1won = 0;
    let p2won = 0;
    gameData.historyRounds.map((round) => {
      if (round.winner === 1) {
        p1won++;
      } else if (round.winner === 2) {
        p2won++;
      }
    });
    if (p1won > p2won) {
      return "Player 1 won";
    } else if (p1won < p2won) {
      return "Player 2 won";
    } else {
      return "Draw";
    }
  };

  return (
    <div className={styles.board}>
      {gameData.gameId}
      <Typography variant="h4">
        You are player {gameData.playerIndex}
      </Typography>

      {/* table for display the history */}
      <HistoryTable gameData={gameData.historyRounds} />

      {gameData.currentStatus === "your turn" && (
        <div className={styles.container}>
         <ChooseAction play={play} gameData={gameData}/>
        </div>
      )}

      {gameData.currentStatus === "waiting" && (
        <div className={styles.container}>
          <Typography variant="h4">Round: {gameData.roundNum}</Typography>
          <Typography variant="h5" mt={3}>
            Waiting for the other player.
          </Typography>
        </div>
      )}

      {gameData.currentStatus === "closed" && (
        <div className={styles.container}>
          <Typography variant="h4">Game Over: {getResult()}!</Typography>
        </div>
      )}
    </div>
  );
}
