import GameRound from "./GameRound";

test("Game Round Class", () => {
    const gameRound = new GameRound({
        player1Action: "rock",
        player2Action: "paper",
        winner: "player2"
    });
    expect(gameRound.player1Action).toBe("rock");
    expect(gameRound.player2Action).toBe("paper");
    expect(gameRound.winner).toBe("player2");
})

test("Game Round when partly input", () => {
    const gameRound = new GameRound({}); 
    expect(gameRound.player1Action).toBe(null);
    expect(gameRound.player2Action).toBe(null);
    expect(gameRound.winner).toBe(null);
})