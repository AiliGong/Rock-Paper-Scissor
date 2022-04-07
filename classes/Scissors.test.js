import Rock from "./Rock"
import Paper from "./Paper"
import Scissors from "./Scissors"

test('scissors class', () => {
    const scissors = new Scissors();
    expect(scissors.type).toBe("scissors");
    expect(scissors.winningConditions).toEqual(["paper"]);
    expect(scissors.isWinning(new Paper())).toBe(1);
    expect(scissors.isWinning(new Scissors())).toBe(0);
    expect(scissors.isWinning(new Rock())).toBe(2);
})