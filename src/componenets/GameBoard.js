import { Card, Typography } from "@mui/material";
import styles from "../../styles/Game.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { capitalizeFirstLetter } from "../../utils/helper";

export default function GameBoard({ gameData, play }) {
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
      <TableContainer component={Paper} sx={{ width: 650 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Round</TableCell>
              <TableCell>Player1</TableCell>
              <TableCell>Player2</TableCell>
              <TableCell>Player Winner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameData.historyRounds.map((round, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {round.player1Action
                    ? capitalizeFirstLetter(round.player1Action)
                    : "-"}
                </TableCell>
                <TableCell>
                  {round.player2Action
                    ? capitalizeFirstLetter(round.player2Action)
                    : "-"}
                </TableCell>
                <TableCell>
                  {round.winner ? `Player ${round.winner}` : "Draw"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {gameData.currentStatus === "your turn" && (
        <div className={styles.container}>
          <Typography variant="h4">Round: {gameData.roundNum}</Typography>
          <Typography variant="h5">Choose your action:</Typography>
          <div className={styles.selectAction}>
            <Card
              className={styles.card}
              onClick={async () => await play("paper")}
            >
              <img src="/Paper.png" alt="Paper" className={styles.image} />
              <div>Paper</div>
            </Card>

            <Card
              className={styles.card}
              onClick={async () => await play("rock")}
            >
              <img src="/Rock.png" alt="Rock" className={styles.image} />
              <div>Rock</div>
            </Card>
            <Card
              className={styles.card}
              onClick={async () => await play("scissors")}
            >
              <img
                src="/Scissors.png"
                alt="Scissors"
                className={styles.image}
              />
              <div>Scissors</div>
            </Card>
          </div>
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
