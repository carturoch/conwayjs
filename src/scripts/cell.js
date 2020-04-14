class Cell {
  constructor(x, y, width, height) {
    this.state = 0;
    this.rect = new Konva.Rect({
      x: x,
      y: y,
      width: width,
      height: height
    });
    this.die();
    this.setClickListener();
  }

  isAlive() {
    return this.state == 1;
  }

  update(newState) {
    if (this.state == newState) {
      return;
    }

    if (newState == 1) {
      this.live();
    } else {
      this.die();
    }
  }

  futureState(neighborCount) {
    if (neighborCount < 2) {
      return 0;
    } else if (neighborCount == 2) {
      return this.state;
    } else if (neighborCount == 3) {
      return 1;
    } else {
      return 0;
    }
  }

  die(self) {
    self = self || this;
    self.state = 0;

    if (!self.rect.parent) {
      self.rect.fill('#EEE');
      self.rect.stroke('#CCC');
      self.rect.strokeWidth(1);
    } else {
      let tween = new Konva.Tween({
        node: self.rect,
        duration: .8,
        fill: '#EEE',
        stroke: '#CCC'
      });
      tween.play();
    }
  }

  live(self) {
    self = self || this;
    self.state = 1;

    let tween = new Konva.Tween({
      node: self.rect,
      duration: .5,
      fill: '#ff6363',
      stroke: '#555'
    });
    tween.play();
  }

  setClickListener() {
    const self = this;
    const die = this.die;
    const live = this.live;
    this.rect.on('click', function (event) {
      if (self.state == 1) {
        die(self);
      } else {
        live(self);
      }
    });
  }
}

export default Cell;