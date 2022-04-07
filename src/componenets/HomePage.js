import { Card } from "@mui/material";
import styles from "../../styles/Home.module.css";
import { useState } from "react";
import JoinGameDialog from "./JoinGameDialog";
import axios from "axios";
import { useRouter } from 'next/router'

export default function HomePage() {
  const [openJoinForm, setOpenJoinForm] = useState(false);
  const router = useRouter()

  const handleOpenJoin = () => {
    setOpenJoinForm(true);
  };

  const handleCloseJoin = () => {
    setOpenJoinForm(false);
  };

  const createRoom = async () => {
    try {
      const {data} = await axios.post("/api/game/create");
      router.push("/game/" + data.gameId);
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the <span> Rock Paper Scissor </span> Game!
        </h1>

        <img src="rps.jpg" alt="rock paper scissor" className={styles.image} />
        <p className={styles.description}>Let's get started!</p>
        <div className={styles.grid}>
          <Card
            className={styles.card}
            onClick={createRoom}
          >
            <h2>Create &rarr;</h2>
            <p>Creating a new game and share the code with your friend!</p>
          </Card>

          <Card className={styles.card} onClick={handleOpenJoin}>
            <h2>Join &rarr;</h2>
            <p>Having a game code? Click to join the game!</p>
          </Card>
        </div>
        <JoinGameDialog
          openJoinForm={openJoinForm}
          handleClose={handleCloseJoin}
        />
      </main>
    </div>
  );
}
