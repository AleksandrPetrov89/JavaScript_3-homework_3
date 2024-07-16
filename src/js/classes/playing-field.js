import UserInteraction from "./user_interaction";
import imgSrc from "../../img/goblin.png";

export default class PlayingField {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.position = 16;
  }

  createField() {
    const divGame = document.createElement("div");
    this.parentElement.append(divGame);
    divGame.classList.add("game");
    const menuText = `<div class = "menu">
                        <span>Попадений: </span><span class="hits">0</span><br>
                        <span>Промахов/пропусков: </span><span class="misses">0</span><br>
                        <button type="button" class="start-game">Начать игру</button><br>
                      </div>
                      <div class="field">
                        <div class = "cell" data-id="0">
                          <img src="${imgSrc}" alt = "Гоблин" class = "goblin goblin-hidden">
                        </div>
                      </div>`;
    divGame.innerHTML = menuText;
    const divField = divGame.querySelector(".field");
    for (let i = 0; i < 15; i++) {
      const item = divField.querySelector(".cell").cloneNode(true);
      item.dataset.id = i + 1;
      divField.appendChild(item);
    }
  }

  async goblinFlicker() {
    this.#randomСell();
    if (this.userInteraction == undefined) {
      this.userInteraction = new UserInteraction(this.parentElement);
    }
    this.userInteraction.waitingClick();
    let gameOver = new Promise((resolve) => {
      this.intervalFn = this.intervalFn.bind(this, resolve);
      this.interval = setInterval(this.intervalFn, 2000);
    });
    return await gameOver;
  }

  intervalFn(resolve) {
    this.userInteraction.late();
    if (this.userInteraction.checkingPoints()) {
      clearInterval(this.interval);
      this.userInteraction.removeClick();
      resolve(true);
    } else {
      this.#randomСell();
    }
  }

  #randomСell() {
    let num = 0;
    do {
      num = Math.floor(Math.random() * 16);
    } while (this.position == num);
    this.position = num;
    if (this.parentElement.querySelector(".goblin-visible")) {
      let elemOld = this.parentElement.querySelector(".goblin-visible");
      elemOld.classList.replace("goblin-visible", "goblin-hidden");
    }
    let elemNew = this.parentElement.querySelectorAll(".goblin")[this.position];
    elemNew.classList.replace("goblin-hidden", "goblin-visible");
  }
}
