import Game from "./Game";

test("new game object", () => {
    const game = new Game({
        gameId: "test",
        player1: "player1",
        player2: "player2",
        player1Action: "rock",
        player2Action: "paper",
        historyRounds: [{
            player1Action: "rock",
            player2Action: "paper",
            winner: "1"
        }],
    })
    expect(game.gameId).toBe("test");
    expect(game.player1).toBe("player1");
    expect(game.player2).toBe("player2");
    expect(game.player1Action).toBe("rock");
    expect(game.player2Action).toBe("paper");
    expect(game.historyRounds.length).toBe(1);
    expect(game.historyRounds[0].player1Action).toBe("rock");
    expect(game.historyRounds[0].player2Action).toBe("paper");
    expect(game.historyRounds[0].winner).toBe("1");
})

test("join game as player 2", () => {
    const game = new Game({
        gameId: "test",
        player1: "player1",
    })
    expect(game.getCurrentStatus("player1")).toBe("waiting");
    game.join("player2");
    expect(game.player2).toBe("player2");
    expect(game.getCurrentStatus("player1")).toBe("your turn");
    expect(game.getCurrentStatus("player2")).toBe("your turn");
})

test("player 1 re join the game", () => {
    const game = new Game({
        gameId: "test",
        player1: "player1",
    })
    game.join("player1");
    expect(game.player1).toBe("player1");
    expect(game.player2).toBe(null);
})

test("player 2 re join the game when player 1 in there", () => {
    const game = new Game({
        gameId: "test",
        player1: "player1",
        player2: "player2",
    })
    game.join("player2");
    expect(game.player1).toBe("player1");
    expect(game.player2).toBe("player2");
})

test("player 3 join game when game full people", () => {
    const game = new Game({
        gameId: "test",
        player1: "player1",
        player2: "player2",
    })
    expect(game.join("player3")).toBe(false);
})

test("check is player", () => {
    const game = new Game({
        gameId: "test",
        player1: "player1",
        player2: "player2",
    })
    expect(game.isPlayer("player1")).toBe(true);
    expect(game.isPlayer("player2")).toBe(true);
    expect(game.isPlayer("player3")).toBe(false);
})

test("check player index", () => {
    const game = new Game({
        gameId: "test",
        player1: "player1",
        player2: "player2",
    })
    expect(game.getPlayerIndex("player1")).toBe(1);
    expect(game.getPlayerIndex("player2")).toBe(2);
    expect(game.getPlayerIndex("player3")).toBe(0);
})

test("play the game", () => {
    const game = new Game({
        gameId: "test",
        player1: "player1",
        player2: "player2",
    })
    // Player 1 play first
    game.play("player1", "rock");
    expect(game.player1Action).toBe("rock");
    expect(game.player2Action).toBe(null);
    expect(game.historyRounds.length).toBe(0);
    expect(game.getCurrentStatus("player1")).toBe("waiting");

    // if player 1 want to play again before play 2
    expect(game.play("player1", "paper")).toBe(false);

    // Player 2 play
    game.play("player2", "paper");
    expect(game.player1Action).toBe(null);
    expect(game.player2Action).toBe(null);
    expect(game.historyRounds.length).toBe(1);
    expect(game.historyRounds[0].player1Action).toBe("rock");
    expect(game.historyRounds[0].player2Action).toBe("paper");
    expect(game.historyRounds[0].winner).toBe(2)
    expect(game.getCurrentStatus("player1")).toBe("your turn");
    expect(game.getCurrentStatus("player2")).toBe("your turn");

    // As Player 3 not in the game, so can't play
    expect(() => {
        game.play("play3", "scissors")}).toThrow("Player is not in this game.");

    // Let's finish the game for 3 rounds
    // Round 2
    game.play("player1", "scissors");
    game.play("player2", "rock");
    expect(game.getRoundNum()).toBe(3);
    // Round 3
    game.play("player2", "rock");
    game.play("player1", "rock");

    expect(game.historyRounds.length).toBe(3);
    expect(game.getCurrentStatus("player1")).toBe("closed");

    expect(game.play("player2", "rock")).toBe(false);
})