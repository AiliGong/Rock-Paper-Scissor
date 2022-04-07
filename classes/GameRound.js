export default class GameRound {

    constructor({player1Action, player2Action, winner}) {
        this.player1Action = player1Action ? player1Action : null;
        this.player2Action = player2Action ? player2Action : null;
        this.winner = winner ? winner : null;
    }

    toObject() {
        const { ...obj } = this;
        return obj;
      }
        
}