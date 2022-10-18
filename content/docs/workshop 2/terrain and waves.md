# **Taller de Ilusiones**

### **1. Introducción**
En este taller se desea explorar la creación de diferentes ilusiones ópticas haciendo uso de la combinación de diferentes referencias conceptuales basadas en ilusiones que veremos posteriormente.
### **2. Revisión bibliográfica**

#### **Lilac Chaser**


[Artículo](https://www.researchgate.net/publication/236959621_A_Neurodynamical_Model_of_Brightness_Induction_in_V1/download)

### **3. Métodos**



Para el segundo ejercicio:
### **4. Resultados**

- ola


{{< details title="Código" open=false >}}
```js
let angle = 0;
let w = 24;
let ma = 0;
function setup() {
  createCanvas(400, 400, WEBGL);
  ma = atan(1/sqrt(2));
}

function draw() {
  background(0);
  ortho(-300,280,-300,1000,0,500)
  rotateX(-QUARTER_PI);
  rotateY(ma);
  //translate(width/2 , height/2)
  //rectMode(CENTER)
  
  //rotateX(angle * 0.25)
  
  let offset = 0;
  for(let j =0; j<height;j+=w){
    for(let i =0; i<width;i+=w){
      push()
      let a = angle + offset;
      let h = map(sin(a),-1,1,0,100);
      fill(255)
      translate(i - width/2,0,j-height/2)
      box(w-2,h,w-2)
      //rect(i- width/2 +w/2,0,w-2,h);
      
      pop()
    }
    offset+=0.1
  }
  angle +=0.1
}
```
{{< /details >}}
{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller2/wave.js" width="420" height="430"  >}}

- ola "compleja"

{{< details title="Código" open=false >}}
```js
let angleN = 0;
let w = 40
let mangle = 0;
let maxD = 0; 
let objeto;
let imagen1
function preload(){
  objeto = loadModel("Cannoe.obj");
  imagen1 = loadImage("Wood.png");
}
function setup() {
  createCanvas(400, 400, WEBGL);
  mangle = atan(1/sqrt(2)); // angulo que mejora la perspectiva
  maxD = dist(0,0,200,200);
}

function draw() {
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
```
{{< /details >}}
{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller2/complex_wave.js" width="420" height="430"  >}}

- terreno sin wave porque me petó la cabeza

{{< details title="Código" open=false >}}
```js
let sizeLand = 10;
let depth = 400; 
let cam;
let overlap =500;
let water = 55;
let treeLine = -50;
let noiseDistance;
let terrainRange;
function preload(){
  
}
function setup() {
  let canv = createCanvas(700, 700, WEBGL);
  canv.mousePressed(setup);
  cam = createCamera();
  noLoop();
  noiseDistance =0.005;
  terrainRange = 100;
  seedRandom = random(0,10000)*10000
  draw();
}

function draw() {
  
  cam.camera(0,-100,-500,0,0,0,0,1,0);
  background(20,100,255);
  for(let x= -width/2-overlap; x <width/2+overlap; x+=sizeLand){
    for(let z= -depth/2-overlap; z< depth/2+overlap; z+=sizeLand){
      
      stroke(0)
      let y = noise(x*noiseDistance+seedRandom,z*noiseDistance+seedRandom)*terrainRange;
      fill(0,153,12)
      if(y<treeLine){
        fill(102,82,81);
      }
      if(y > water){
        fill(16,30,255);
        noStroke();
      }
      push();
      translate(x,y,z);
      box(sizeLand);
      translate(0,sizeLand*3,0)
      fill(102,82,81);
      box(sizeLand, sizeLand *5,sizeLand)
      pop();
    }
  }
}
```
{{< /details >}}
{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller2/land.js" width="420" height="430"  >}}





### **5. Conclusion**
