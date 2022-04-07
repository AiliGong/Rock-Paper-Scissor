import Action from './Action';

export default class Rock extends Action {
  constructor() {
    super("rock", ["scissors"]);
  }
}
