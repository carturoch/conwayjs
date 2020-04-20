import '../styles/index.scss';
import Konva from 'konva';
import Board from './board';

import {
  play,
  pause
} from './actions';

let stage = new Konva.Stage({
  container: 'board',
  width: window.innerWidth,
  height: window.innerHeight - 44,
});

let generationCounter = document.querySelector('#generation');
let board = new Board(40, 20, stage, generationCounter);
board.render();

document.querySelector('#trigger').addEventListener('click', function (e) {
  let isPlaying = this.classList.contains('paused');
  if (isPlaying) {
    pause();
  } else {
    play(board);
  }
  this.classList.toggle('paused');
});

window.addEventListener('resize', function (e) {
  let newWidth = window.innerWidth;
  let newHeight = window.innerHeight - 44;
  board.rescale(newWidth, newHeight);
  console.log(`Stage resized to [w: ${newWidth}, h: ${newHeight}]`);
});