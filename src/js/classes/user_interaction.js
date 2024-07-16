export default class UserInteraction {
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
