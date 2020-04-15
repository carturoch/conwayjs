import '../styles/index.scss';
import Konva from 'konva';
import Board from './board';

import {
  play,
  pause
} from './actions';

let stage = new Konva.Stage({
  container: 'board',
  width: 1000,
  height: 1000
});

let board = new Board(50, 50, stage);
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

console.log('No UI triggers yet. Use play() and pause()');