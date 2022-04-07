import Action from "./Action";

test('action class', () => {
    expect(() => {
        const action = new Action({
            type: "rock",
            winningConditions: ["scissors"]
        })
    }).toThrow("Abstract classes can't be instantiated.")
})