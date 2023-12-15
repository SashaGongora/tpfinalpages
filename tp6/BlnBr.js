//aca van la sangre y el ladrillo
class obj {
  constructor(imgArray) {
    this.x = random (width);
    this.y = random (-height, 0);
    this.w = 90;
    this.h = 90;
    this.v = random (3, 5);
  }
  actualizar() {

    //actualizar posiciones random
    this.y += this.v;
    if (this.y > height) {
      this.y = -height;
      this.x = random(width);
    }
    this.x = constrain (this.x, -5, 460);
  }


  dibujar(imgArray, a) {
    image (imgArray[a], this.x, this.y, this.w, this.h);
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
}
