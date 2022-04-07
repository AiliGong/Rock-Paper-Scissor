import Rock from "./Rock"
import Paper from "./Paper"
import Scissors from "./Scissors"

test('rock class', () => {
    const rock = new Rock();
    expect(rock.type).toBe("rock");
    expect(rock.winningConditions).toEqual(["scissors"]);
    expect(rock.isWinning(new Paper())).toBe(2);
    expect(rock.isWinning(new Scissors())).toBe(1);
    expect(rock.isWinning(new Rock())).toBe(0);
})