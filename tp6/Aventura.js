//Clase madre
//juego y cambios de pantalla
//SEPARAR EL MINIJUEGO DE LA NOVELA, UTILIZAR EL "ACTUALIZAR" COMO DIBUJAR EN LA CLASE JUEGO
class ClaseMadre {
  constructor() {
    this.estado = 0;
    this.Dracula = new dracula(this.img);
    this.Material = [];
    this.Brick = [] ;
    this.texto  = [] ;
    this.boton = [];
    this.boton[0] = new boton(50, 400, 100, 50);
    this.boton[1] = new boton(400, 400, 100, 50);
    //cantidad de pantallas
    this.cant = 13;
    this.pantalla = [];
    for (let i = 0; i < this.cant; i++) {
      this.pantalla[i] = loadImage('data/pantalla' + i + '.png');
    }
    //carga de elementos para el juego, material, dracula, ladrillo, gota y torre
    this.img = [];
    for ( let i = 0; i < 4; i++ ) {
      this.img[i] = loadImage("data/img"+i+".png");
    }
    for ( let i = 0; i < 2; i++ ) {
      this.Material.push( new obj(this.img) );
    }
    for ( let i = 0; i < 2; i++ ) {
      this.Brick.push( new obj(this.img) );
    }
    this.tiempos = new tiempo(60);
    this.tiempoIniciado = false;
    this.generarMate(2);
    this.puntaje = 0;
    this.texto =(loadStrings("data/textos.txt"));
  }
  actualizar() {
    if (this.estado == 4) {
      //sangre
      for ( let i = 0; i < 3; i++ ) {
        this.Material[i].actualizar();
        image (this.img[2], this.x, this.y, this.w, this.h);
      }
      //ladrillos
      for ( let i = 0; i < 2; i++ ) {
        this.Brick[i].actualizar();
        image (this.img[3], this.x, this.y, this.w, this.h);
      }
      //colision de la sangre y puntaje
      this.colisionMat()
        if (this.puntaje >= 10) {
        this.estado = 6;
      }
      //colision de ladrillos
      this.colisionBri();
      //tiempo
      if (!this.tiempoIniciado) {
        this.tiempos.inicio = millis(); // Inicia el tiempo
        this.tiempoIniciado = true; // Marca que el juego ha comenzado
      }
      this.tiempos.actualizar()
    }
    if (this.estado == 4 && this.tiempos.haTerminado()) {
      this.estado = 5;
    }
  }
  dibujar() {
    if (this.estado == '0') {
      background(0);
      image(this.pantalla[0], 0, 0);
      this.boton[0].dibujar(50, 150, 400, 450);
      //texto de  boton principio
      textSize(30);
      fill(255);
      text ("Start!", 60, 435);
    }

    if (this.estado == '1') {
      background(0);
      image(this.pantalla[1], 0, 0);
      this.boton[0].dibujar(50, 150, 400, 450);
      textSize(20);
      fill(255);
      text ("Siguiente", 60, 430);
      textSize(20);
      text(this.texto[1], 605, 25, 500, 500);
    }

    if (this.estado == '2') {
      background(0);
      image(this.pantalla[2], 0, 0);
      this.boton[0].dibujar(50, 150, 400, 450);
      textSize(20);
      fill(255);
      text ("Siguiente", 60, 430);
      textSize(20);
      text(this.texto[2], 605, 25, 500, 500);
    }

    if (this.estado == '3') {
      background(0);
      image(this.pantalla[3], 0, 0);
      this.boton[0].dibujar(50, 150, 400, 450);
      textSize(20);
      fill(255);
      text ("Me fui", 60, 430);
      this.boton[1].dibujar(400, 500, 400, 450);
      fill(255);
      text ("Me quedo", 405, 430);
      text(this.texto[3], 605, 25, 500, 500);
    }
    //zona juego
    if (this.estado == '4') {
      background(0);
      image (this.img[0], 0, 0, 0, 0);
      push();
      //cuadro de instruccion
      fill (196, 32, 32, 160);
      noStroke();
      rect (650, 80, 450, 250);
      //texto de cuadro
      fill(255);
      textSize (30);
      text ("Instrucciones para el Minijuego!", 660, 130);
      textSize (20);
      text ("Utiliza las flechas para esquivar.\nUtiliza el mouse para llegar a los diferentes\nfinales.\nDebes recolectar con Dracula la sangre \nevitando los ladrillos que caen de la torre. \nCuidado! asegurate de hacerlo a tiempo o\nJonathan podria escapar!", 685, 170);
      pop();

      this.Dracula.dibujar(this.img);
      for ( let i = 0; i < 3; i++ ) {
        this.Material[i].dibujar(this.img, 2);
      }
      for ( let i = 0; i < 2; i++ ) {
        this.Brick[i].dibujar(this.img, 3);
      }
      push();
      textSize (20);
      //para redondear el tiemp
      fill(250)
        text("Tiempo: " + this.tiempos.tiempoRestante.toFixed(0), 60, 60);
      pop();
      push();
      textSize (20);
      fill(250)
        text("Score: " + this.puntaje, 60, 100);
      pop();
      this.tiempos.actualizar();
    }
    //jhonny sale de la hab, pierde dracula
    if (this.estado == '5') {
      background(0);
      image(this.pantalla[4], 0, 0);
      fill(255);
      textSize(20);
      text(this.texto[4], 605, 25, 500, 500);
      textSize(30);
      text("oh no! Perdiste!!\nPresiona R para volver a empezar!", 660, 350);
    }
    //Jhonny vuelve a la habi, gana dracula y sigue la hist
    if (this.estado == '6') {
      background(0);
      image(this.pantalla[5], 0, 0);
      this.boton[0].dibujar(50, 150, 400, 450);
      textSize(20);
      fill(255);
      text ("Siguiente", 60, 430);
      textSize(20);
      text(this.texto[5], 605, 25, 500, 500);
    }

    if (this.estado == '7') {
      background(0);
      image(this.pantalla[6], 0, 0);
      this.boton[0].dibujar(50, 150, 400, 450);
      textSize(20);
      fill(255);
      text ("Siguiente", 60, 430);
      text(this.texto[6], 605, 25, 500, 500);
    }

    if (this.estado == '8') {
      background(0);
      image(this.pantalla[7], 0, 0);
      this.boton[0].dibujar(50, 150, 400, 450);
      textSize(20);
      fill(255);
      text ("Siguiente", 60, 430);
      text(this.texto[7], 605, 25, 500, 500);
    }

    if (this.estado == '9') {
      background(0);
      image(this.pantalla[8], 0, 0);
      this.boton[0].dibujar(50, 150, 400, 450);
      textSize(20);
      fill(255);
      text ("Siguiente", 60, 430);
      text(this.texto[8], 605, 25, 500, 500);
    }

    if (this.estado == '10') {
      background(0);
      image(this.pantalla[9], 0, 0);
      this.boton[0].dibujar(50, 150, 400, 450);
      textSize(20);
      fill(255);
      text ("Confia", 60, 430);
      this.boton[1].dibujar(400, 500, 400, 450);
      textSize(20);
      fill(255);
      text ("Se niega", 400, 430);

      text(this.texto[9], 605, 25, 500, 500);
    }

    if (this.estado == '11') {
      background(0);
      image(this.pantalla[10], 0, 0);
      this.boton[0].dibujar(50, 150, 400, 450);
      textSize(20);
      fill(255);
      text ("Siguiente", 60, 430);
      text(this.texto[11], 605, 25, 500, 500);
    }

    if (this.estado == '12') {
      background(0);
      image(this.pantalla[11], 0, 0);
      fill(255);
      textSize(20);
      text(this.texto[10], 605, 25, 500, 500);
      textSize(30);
      text("oh no! Perdiste!!\nPresiona R para volver a empezar!", 660, 350);
    }

    if (this.estado == '13') {
      background(0);
      image(this.pantalla[12], 0, 0);
      fill(255);
      textSize(20);
      text(this.texto[12], 605, 25, 500, 500);
      textSize(30);
      text("Exito! Ganaste!!\nPresiona R para volver a empezar!", 660, 350);
    }
  }
  PasarEstados() {
    if (this.estado == '0') {
      if (mouseX > 50 && mouseX < 150 && mouseY > 400 && mouseY < 450) {
        this.estado = '1';
      }
    } else if (this.estado == '1') {
      if (mouseX > 50 && mouseX < 150 && mouseY > 400 && mouseY < 450) {
        this.estado = '2';
      }
    } else if (this.estado == '2') {
      if (mouseX > 50 && mouseX < 150 && mouseY > 400 && mouseY < 450) {
        this.estado = '3';
      }
    } else if (this.estado == '3') {
      if (mouseX > 50 && mouseX < 150 && mouseY > 400 && mouseY < 450) {
        this.estado = '4';
      }
      if (mouseX > 400 && mouseX < 500 && mouseY > 400 && mouseY < 450) {
        this.estado = '6';
      }
    } else if (this.estado == '6') {
      if (mouseX > 50 && mouseX < 150 && mouseY > 400 && mouseY < 450) {
        this.estado = '7';
      }
    } else if (this.estado == '7') {
      if (mouseX > 50 && mouseX < 150 && mouseY > 400 && mouseY < 450) {
        this.estado = '8';
      }
    } else if (this.estado == '8') {
      if (mouseX > 50 && mouseX < 150 && mouseY > 400 && mouseY < 450) {
        this.estado = '9';
      }
    } else if (this.estado == '9') {
      if (mouseX > 50 && mouseX < 150 && mouseY > 400 && mouseY < 450) {
        this.estado = '10';
      }
    } else if (this.estado == '10') {
      if (mouseX > 50 && mouseX < 150 && mouseY > 400 && mouseY < 450) {
        this.estado = '11';
      }
      if (mouseX > 400 && mouseX < 500 && mouseY > 400 && mouseY < 450) {
        this.estado = '12';
      }
    } else if (this.estado == '11') {
      if (mouseX > 50 && mouseX < 150 && mouseY > 400 && mouseY < 450) {
        this.estado = '13';
      }
    }
  }
  teclado() {
    this.Dracula.Teclas();
    if (this.estado == 5) {
      if (key === 'r') {
        this.estado = 0;
        this.reiniciar();
      }
    }
    if (this.estado == 12) {
      if (key === 'r') {
        this.estado = 0;
        this.reiniciar();
      }
    }
    if (this.estado == 13) {
      if (key === 'r') {
        this.estado = 0;
        this.reiniciar();
      }
    }
  }
  generarMate(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.Material.push(new obj(random(width), -height, 45));
    }
  }
  colisionMat() {
    for (let i = this.Material.length - 1; i >= 0; i--) {
      let distanciaReal = dist (this.Dracula.getX(), this.Dracula.getY(), this.Material[i].getX(), this.Material[i].getY());
      let distanciaChoque = 45;
      if (distanciaReal <= distanciaChoque) {
        //para que no se sature el puntaje
        this.Material.splice(i, 1);
        this.puntaje += 1;
        //genera una gota de sangre en una posición random en el eje X
        this.Material.push(new obj(random(width), -height, 45));
      }
    }
  }

  colisionBri() {
    for (let i = 0; i < this.Brick.length; i++) {
      let distanciaReal = dist (this.Dracula.getX(), this.Dracula.getY(), this.Brick[i].getX(), this.Brick[i].getY());
      let distanciaChoque = 45;
      if (distanciaReal <= distanciaChoque) {
        this.estado = 5;
      }
    }
  }
  reiniciar() {
    //método "reiniciar"
    if (key === "r") {
      this.estado = 0;
      this.Dracula = new dracula();
      this.puntaje = 0;
      this.tiempos = new tiempo(60);
      this.Material= [];
      for ( let i = 0; i < 3; i++ ) {
        this.Material.push( new obj(this.img) );
      }
      this.Brick = [];
      for ( let i = 0; i < 2; i++ ) {
        this.Brick.push( new obj(this.img) );
      }
    }
  }
}
