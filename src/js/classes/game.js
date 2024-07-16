import PlayingField from "./playing-field";

export default class Game {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.playingField = new PlayingField(this.parentElement);
    this.playingField.createField();
  }

  waitingStart() {
    this.btStart = this.parentElement.querySelector(".start-game");
    this.start = this.start.bind(this);
    this.btStart.addEventListener("click", this.start);
  }

  start() {
    this.btStart.setAttribute("disabled", true);
    this.playingField.goblinFlicker(this.btStart);
  }
}
