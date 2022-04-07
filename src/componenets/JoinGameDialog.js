import { Card } from "@mui/material";
import styles from "../../styles/Home.module.css";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from 'next/router'
import axios from "axios";

export default function JoinGameDialog({ openJoinForm, handleClose }) {
  const { control, handleSubmit } = useForm();
  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/game/join",  { gameId: data.gameId } );
      router.push("/game/" + data.gameId);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={openJoinForm} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Join a game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To join a game, please enter the game code here.
          </DialogContentText>
          <Controller
            name="gameId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                id="gameId"
                label="Game Code"
                fullWidth
                variant="standard"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Join</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
