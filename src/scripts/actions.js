let interval = null;

function play(board) {
  interval = setInterval(() => {
    board.cycle();
  }, 600);
}

function pause() {
  clearInterval(interval);
}

export {
  play,
  pause
};