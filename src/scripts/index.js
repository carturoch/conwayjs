import '../styles/index.scss';
import Konva from 'konva';
import Board from './board';

let stage = new Konva.Stage({
  container: 'container',
  width: 1000,
  height: 1000
});

let board = new Board(50, 50, stage);
board.render();

let interval = null;

function play() {
  interval = setInterval(() => {
    board.cycle();
  }, 800);
}

function pause() {
  clearInterval(interval);
}

console.log('No UI triggers yet. Use play() and pause()');