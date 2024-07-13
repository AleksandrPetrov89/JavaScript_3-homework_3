// TODO: write code here

import Game from "./classes/game";

document.addEventListener("DOMContentLoaded", () => {
  const field = document.querySelector(".field");
  const game = new Game(field);
  game.start();
});
