// Constantes
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;
let xMove =20;
let moveRight =1;
let checkbox;
let isCheckedBox = false;
function setup() {
  createCanvas(410, 400);

  // Definir colores
  b1 = color(230);
  b2 = color(140);
  c12 = color(180);

  slider = createSlider(-10, 250, 140, 1);
  slider.position(10, 10);

  checkbox = createCheckbox('Animation', false);
  checkbox.changed(myCheckedEvent);


}

function draw() {
  // Fondo
  b2=color(slider.value())
  setGradient(0, 0, width, height, b1, b2, X_AXIS);
  setGradient(width, 0, width, height, b2, b1, X_AXIS);
  
  
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
      stroke(5);
      
      fill(c12);
      rect(20, 165, 80, 70);
      rect(300, 165, 80, 70);
    }
   
  if(xMove>300){
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
  if(isCheckedBox){
    fill(c12);
    rect(xMove, 250, 80, 70);
  }
  
  
  }
}


function drawRectangle(){
  stroke();
  fill(c1);
  rect(20, 160, 120, 80);
  rect(270, 160, 120, 80);
}

function myCheckedEvent() {

    isCheckedBox=checkbox.checked()

}