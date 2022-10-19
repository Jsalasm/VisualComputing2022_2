let angleN = 0;
let w = 40
let mangle = 0;
let maxD = 0; 
let objeto;
let imagen1
function preload(){
  objeto = loadModel("/VisualComputing2022_2/sketches/Taller2/Cannoe.obj");
  imagen1 = loadImage("/VisualComputing2022_2/sketches/Taller2/Wood.png");
}
function setup() {
  createCanvas(400, 400, WEBGL);
  mangle = atan(1/sqrt(2)); // angulo que mejora la perspectiva
  maxD = dist(0,0,200,200);
  slider = createSlider(10, 40, 30,10);
  slider.position(10, 10);
}

function draw() {
  if(slider.value()<=20){ // cuando esta en treinta no se logra apreciar la canoa
    w= slider.value();
    console.log(slider.value())
  }else{
    w= slider.value()+10;
  }
  background(0);
  ortho(-300,280,-200,1000,0,500) // permite mantener una vision ortografica de tal manera que mantiene una vision durante cierto espacio, una vez salido del espacio no se verán solidos o cuerpos
  rotateX(-QUARTER_PI);
  rotateY(mangle);
  //translate(width/2 , height/2)
  //rectMode(CENTER)
  
  //rotateX(angle * 0.25)
  
  let offset = 0;
  for(let j =0; j<height;j+=w){
    for(let i =0; i<width;i+=w){
      push()
      let d = dist(i,j, width/2 , height/2);
       offset = map(d,0,maxD, -PI,PI); //maneja el cambio de la ola, altera el angulo y hace que se vea mas natural, con esto ayuda a que la ola empiece desde el centro
      let a = angleN + offset;
      let h = map(sin(a),-1,1,maxD,100); // genera un intervalo sinusoidal de tal manera que cambia la altura de los cubos
      fill(30,50,180)
      translate(i - width/2,0,j-height/2)
      box(w-2,h,w-2)
      //rect(i- width/2 +w/2,0,w-2,h);
      if(i == ((width/w)/2-1)*w && j == ((width/w)/2-1)*w){
        push()
        translate(100,-h+100,0)// cambiamos la posicion del objeto para que quede normal
        rotateZ(PI); // x2
        scale(50) // maxificamos la escala del objeto 
        texture(imagen1) // textura de madera
        model(objeto) // aqui dibujamos el objeto barquito
        pop()
      }
      pop()
    }
    offset+=0.1
  }
  angleN +=0.1
}