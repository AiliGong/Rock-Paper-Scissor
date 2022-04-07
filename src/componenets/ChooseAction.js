import { Card, Typography } from "@mui/material";
import styles from "../../styles/Game.module.css";

export default function ChooseAction({gameData, play}) {
  return (
    <>
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
    </>
  )
}
