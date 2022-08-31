// Constantes
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;
let xMove =20;
let moveRight =1;

function setup() {
  createCanvas(410, 400);

  // Definir colores
  b1 = color(240);
  b2 = color(140);
  c12 = color(220);


}

function draw() {
  // Fondo
  setGradient(0, 0, width, height, b1, b2, X_AXIS);
  setGradient(width, 0, width, height, b2, b1, X_AXIS);
  // Frente
  
  
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

 if (axis === X_AXIS) {
    // Gradiente de izquierda a derecha
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
      stroke(0);
      
      fill(c12);
      rect(20, 160, 120, 80);
      rect(280, 160, 120, 80);
    }
   
  if(xMove>280){
    moveRight =0
  }
  if(xMove<20){
    moveRight =1
  }
  
  if(moveRight ==1){
    xMove= xMove+1
  }else{
    xMove= xMove-1
  }
  fill(c12);
  rect(xMove, 250, 120, 80);
  
  }
}


function drawRectangle(){
  stroke();
  fill(c1);
  rect(20, 160, 120, 80);
  rect(280, 160, 120, 80);
}

function drawRectangleMove(){
  
}