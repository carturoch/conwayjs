import Cell from './cell.js';

class Board {
  constructor(width, height, stage) {
    this.width = width;
    this.height = height;
    this.stage = stage;
    this.cells = [];
    this.layer = new Konva.Layer();
    this.initCells();
  }

  initCells() {
    let cellWidth = (this.stage.width() / this.width);
    let cellHeight = (this.stage.height() / this.height);

    for (let i = 0; i < this.height; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.width; j++) {
        let offsetY = i * cellHeight;
        let offsetX = j * cellWidth;
        let cell = new Cell(offsetX, offsetY, cellWidth, cellHeight);

        this.cells[i].push(cell);
      }
    }

    return this.cells;
  }

  render() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.layer.add(this.cells[i][j].rect);
      }
    }

    this.stage.add(this.layer);
    this.layer.draw();

    return this.layer;
  }

  neighborCount(offsetY, offsetX) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let nullOffset = i == 0 && j == 0;
        if (!nullOffset && this.neighborExists(offsetX, offsetY, j, i)) {
          count++;
        }
      }
    }

    return count;
  }

  neighborExists(offsetX, offsetY, horDelta, verDelta) {
    let neighborX = offsetX + horDelta;
    let neighborY = offsetY + verDelta;
    if (neighborX >= 0 && neighborX < this.width && neighborY >= 0 && neighborY < this.height) {
      if (this.cells[neighborY][neighborX].isAlive()) {
        return true;
      }
    }
    return false;
  }

  cycle() {
    let newState = [];
    for (let i = 0; i < this.height; i++) {
      newState[i] = [];
      for (let j = 0; j < this.width; j++) {
        let count = this.neighborCount(i, j);
        let cellFuture = this.cells[i][j].futureState(count);
        newState[i].push(cellFuture);
      }
    }
    this.flushState(newState);
  }

  flushState(state) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        let newState = state[i][j];
        this.cells[i][j].update(newState);
      }
    }
  }

  rescale(newWidth, newHeight) {
    this.stage.width(newWidth);
    this.stage.height(newHeight);
    this.stage.draw();
  }
}

export default Board;