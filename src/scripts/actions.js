let interval = null;

function play(board) {
  interval = setInterval(() => {
    board.cycle();
  }, 800);
}

function pause() {
  clearInterval(interval);
}

export {
  play,
  pause
};