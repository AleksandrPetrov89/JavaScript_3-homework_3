// TODO: write code here

import Game from "./classes/game";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementsByTagName("body")[0];
  const game = new Game(body);
  game.waitingStart();
});
