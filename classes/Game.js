import GameRound from "./GameRound";
import Paper from "./Paper";
import Rock from "./Rock";
import Scissors from "./Scissors";

export default class Game {
  constructor({
    gameId,
    player1,
    player2,
    player1Action,
    player2Action,
    historyRounds,
  }) {
    this.gameId = gameId;
    this.player1 = player1;
    this.player2 = player2 ? player2 : null;
    this.player1Action = player1Action ? player1Action : null;
    this.player2Action = player2Action ? player2Action : null;
    this.historyRounds = historyRounds ? historyRounds : [];
  }

  join(playerId) {
    if (this.status === "closed") {
      return false;
    }
    // when given player id is already a player. re-join the game
    if (this.isPlayer(playerId)) {
      return true;
    }
    // when player2 is empty, set player2 to playerId
    if (!this.player2) {
      this.player2 = playerId;
      return true;
    }
    return false;
  }

  isPlayer(playerId) {
    if (this.player1 === playerId || this.player2 === playerId) {
      return true;
    }
    return false;
  }

  getPlayerIndex(playerId) {
    if (this.player1 === playerId) {
      return 1;
    } else if (this.player2 === playerId) {
      return 2;
    }
    return 0;
  }

  play(playerId, action) {
    const currentStatus = this.getCurrentStatus(playerId);
    const playerIndex = this.getPlayerIndex(playerId);

    if (!this.isPlayer(playerId) || currentStatus === "closed") {
      return false;
    }
    if (currentStatus === "your turn") {
      playerIndex === 1
        ? (this.player1Action = action)
        : (this.player2Action = action);
      this.judege();
      return true;
    }
    return false;
  }

  judege() {
    if (this.player1Action && this.player2Action) {
      const winner = this.getActionInClass(this.player1Action).isWinning(
        this.getActionInClass(this.player2Action)
      );
     
      this.historyRounds = [
        ...this.historyRounds,
        new GameRound({
          player1Action: this.player1Action,
          player2Action: this.player2Action,
          winner,
        }),
      ];
      this.player1Action = null;
      this.player2Action = null;
    }
  }

  getActionInClass(action) {
    switch (action) {
      case "paper":
        return new Paper();
      case "rock":
        return new Rock();
      case "scissors":
        return new Scissors();
      default:
        return null;
    }
  }
  getRoundNum() {
    return this.historyRounds ? this.historyRounds.length + 1 : 1;
  }

  getCurrentStatus(playerId) {
    if (!this.isPlayer(playerId)) {
      throw new Error("Player is not in this game.");
    }

    if (!this.player2) {
      return "waiting";
    }

    if (this.getRoundNum() > 3) {
      return "closed";
    }
    if (this.player1 === playerId && this.player1Action === null) {
      return "your turn";
    }

    if (this.player2 === playerId && this.player2Action === null) {
      return "your turn";
    }

    return "waiting";
  }

  // Change the game back to plain javascript obj
  toObject() {
    return JSON.parse(JSON.stringify(this));
  }

  getGameViewByPlayerId(playerId) {
    const currentStatus = this.getCurrentStatus(playerId);
    const playerIndex = this.getPlayerIndex(playerId);
    const player1Action = playerId === this.player1 ? this.player1Action : null;
    const player2Action = playerId === this.player2 ? this.player2Action : null;
    const roundNum = this.getRoundNum();
    const player1 = this.player1;
    const player2 = this.player2;
    const historyRounds = this.historyRounds;
    return {
      currentStatus,
      playerIndex,
      player1Action,
      player2Action,
      roundNum,
      player1,
      player2,
      historyRounds,
    };
  }
}
