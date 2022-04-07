/*
 * Abstract Class Action
 */
export default class Action {
  constructor(type, winningConditions) {
    if (this.constructor == Action) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.type = type;
    this.winningConditions = winningConditions;
  }

  isWinning(anotherAction) {
    if (this.type === anotherAction.type) {
      return 0;
    }
    return this.winningConditions.includes(anotherAction.type) ? 1 : 2;
  }
}
