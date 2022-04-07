import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import GameBoard from "../../src/componenets/GameBoard";

export default function Game({ id }) {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    getGame();
  }, []);

  const play = async (action) => {
    try {
      await axios.post("/api/game/play", { gameId: id, action: action });
    } catch (error) {
      console.log(error);
    }
  };

  //long-polling to get the latest game data to see if another player plays
  //which is resource concerned, 
  //but this is the only method NEXT.JS api routes support for syncing data
  //better way should be to use websockets or server send events
  const getGame = async () => {
    try {
      const { data } = await axios.get(`/api/game/viewGame?id=${id}`);
      setGameData(data);
      if (data.currentStatus === "closed") {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await getGame();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Typography variant="h6" mt={1}>Share this ID with your friend</Typography>

      <Typography variant="h6" mt={1}>Game ID: {id}</Typography>
      {gameData && <GameBoard gameData={gameData} play={play} />}
      <Button variant="outlined" onClick={()=>{
        window.location.href = "/";
      }}> Back to the home page </Button>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}
