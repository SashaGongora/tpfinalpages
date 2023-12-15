//botones
class boton {
  constructor(posX, posY, Ancho, Alto) {
    this.posX = posX;
    this.posY = posY;
    this.Alto = Alto;
    this.Ancho = Ancho;
  }



  dibujar(x1, x2, y1, y2) {
    if (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2) {

      fill(242, 59, 59, 200);
    } else {

      fill(139, 104, 104, 200);
    }

    rect(this.posX, this.posY, this.Ancho, this.Alto);
  }


}
