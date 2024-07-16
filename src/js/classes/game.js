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

  async start() {
    this.btStart.setAttribute("disabled", true);
    let result = await this.playingField.goblinFlicker();
    if (result) {
      this.btStart.removeAttribute("disabled");
    }
  }
}
