/**
 * @jest-environment jsdom
 */
import "../app";
import Game from "../classes/game";
jest.mock("../classes/game");

test("Проверка вызова класса Game и его методов в app.js", () => {
  let event = new Event("DOMContentLoaded");
  expect(Game).not.toHaveBeenCalled();
  document.dispatchEvent(event);
  expect(Game).toHaveBeenCalledTimes(1);
  expect(Game.mock.instances[0].start).toHaveBeenCalledTimes(1);
});
