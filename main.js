/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/

;// CONCATENATED MODULE: ./src/js/classes/user_interaction.js
class UserInteraction {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.field = this.parentElement.querySelector(".field");
    this.spanHits = this.parentElement.querySelector(".hits");
    this.hits = 0;
    this.spanMisses = this.parentElement.querySelector(".misses");
    this.misses = 0;
  }
  waitingClick() {
    this._click = this._click.bind(this);
    this.field.addEventListener("click", this._click);
  }
  removeClick() {
    this.field.removeEventListener("click", this._click);
  }
  _click(e) {
    if (e.target.classList.contains("goblin-visible")) {
      this.hits += 1;
      this.spanHits.textContent = this.hits;
      this.misses -= 1;
      e.target.classList.replace("goblin-visible", "goblin-hidden");
    } else {
      this.miss();
    }
  }
  late() {
    this.misses += 1;
    this.spanMisses.textContent = this.misses;
  }
  miss() {
    if (this.field.querySelector(".goblin-visible")) {
      const goblinVisible = this.field.querySelector(".goblin-visible");
      goblinVisible.classList.replace("goblin-visible", "goblin-hidden");
    }
  }
  checkingPoints() {
    const text = `\nПопадений: ${this.hits}\nПромахов/пропусков: ${this.misses}`;
    if (this.hits === 5 || this.misses === 5) {
      if (this.hits === 5) {
        alert(`Вы победили!` + text);
      } else {
        alert(`Вы проиграли!` + text);
      }
      this.miss();
      this.#resetPoints();
      return true;
    }
    return false;
  }
  #resetPoints() {
    this.hits = 0;
    this.spanHits.textContent = 0;
    this.misses = 0;
    this.spanMisses.textContent = 0;
  }
}
;// CONCATENATED MODULE: ./src/img/goblin.png
const goblin_namespaceObject = __webpack_require__.p + "2dbd01ce16c0fa83cb67.png";
;// CONCATENATED MODULE: ./src/js/classes/playing-field.js


class PlayingField {
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
                          <img src="${goblin_namespaceObject}" alt = "Гоблин" class = "goblin goblin-hidden">
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
  goblinFlicker(btStart) {
    this.#randomСell();
    if (this.userInteraction == undefined) {
      this.userInteraction = new UserInteraction(this.parentElement);
    }
    this.userInteraction.waitingClick();
    this.intervalFn = this.intervalFn.bind(this, btStart);
    this.interval = setInterval(this.intervalFn, 1000);
  }
  intervalFn(btStart) {
    this.userInteraction.late();
    if (this.userInteraction.checkingPoints()) {
      clearInterval(this.interval);
      this.userInteraction.removeClick();
      btStart.removeAttribute("disabled");
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
;// CONCATENATED MODULE: ./src/js/classes/game.js

class Game {
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
;// CONCATENATED MODULE: ./src/js/app.js
// TODO: write code here


document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementsByTagName("body")[0];
  const game = new Game(body);
  game.waitingStart();
});
;// CONCATENATED MODULE: ./src/index.js




// TODO: write your code in app.js
/******/ })()
;