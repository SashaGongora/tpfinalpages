//aca va el personaje dracula
class dracula {

  constructor(imgArray) {
    this.x = 200;
    this.y = 370;
    this.w = 150;
    this.h = 150;
    this.v = 60;
  }

  Teclas() {
    if (keyIsPressed) {
      if (keyIsDown(LEFT_ARROW)) {
        this.x -= this.v;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.x += this.v;
      }
      this.x = constrain (this.x, -5, 460);
    }
  }

  dibujar(imgArray) {
    image (imgArray[1], this.x, this.y, this.w, this.h);
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
}
