import Rock from "./Rock"
import Paper from "./Paper"
import Scissors from "./Scissors"

test('rock class', () => {
    const paper = new Paper();
    expect(paper.type).toBe("paper");
    expect(paper.winningConditions).toEqual(["rock"]);
    expect(paper.isWinning(new Paper())).toBe(0);
    expect(paper.isWinning(new Scissors())).toBe(2);
    expect(paper.isWinning(new Rock())).toBe(1);
})