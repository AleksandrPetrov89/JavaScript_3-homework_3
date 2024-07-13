export default class Game {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.position = 16;
  }

  start() {
    for (let i = 0; i < 15; i++) {
      const item = this.parentElement.querySelector(".cell").cloneNode(true);
      item.dataset.id = i + 1;
      this.parentElement.appendChild(item);
    }
    this.#randomСell();
    setInterval(() => {
      this.#randomСell();
    }, 1000);
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
