# **Taller de Ilusiones**

### **1. Introducción**
En este taller se desea explorar la creación de diferentes ilusiones ópticas haciendo uso de la combinación de diferentes referencias conceptuales basadas en ilusiones que veremos posteriormente.
### **2. Revisión bibliográfica**

#### **Lilac Chaser**

<center><img src="/VisualComputing2022_2/sketches/Taller1/C2C.PNG" alt="" style="width:300px;" class="center;"/></center>

 

Esta ilusion es conocida por tener unas figuras de color magenta redondas, organizadas como un circulo y una cruz en la mitad, de tal manera que el espectador se fije en dicha cruz. [(blog - Lilac Chaser)](https://michaelbach.de/ot/col-lilacChaser/index.html)

Así mismo se aprecia el efecto truxler, que consta en la percepción desvanecida del ojo, el cual cuando tenemos un punto fijo mirando una figura, veremos su color complementario cuando desaparesca, si esta se encuentra en la percepcion desvanecida.[(blog Efecto-truxler)](https://www.xatakaciencia.com/psicologia/no-es-magia-es-el-efecto-troxler-miras-el-centro-de-una-imagen-y-la-imagen-se-desvanece)

De igual forma el color complementario es aquello que se encuentra opuesto en el circulo cromático

<center><img src="/VisualComputing2022_2/sketches/Taller1/C3C.PNG" alt="" style="width:200px;" class="center;"/></center>

[(blog Circulo Crómatico)](https://concepto.de/circulo-cromatico/)

Por ejemplo el color complementario del violeta es el amarillo, el del azul, es el naranja, el del magenta es el verde.


#### **Inducción de brillo**

<center><img src="/VisualComputing2022_2/sketches/Taller1/C1C.PNG" alt="" style="width:600px;" class="center;"/></center>

Este efecto se ve mucho cuando hay una franta mas oscura y otra mas clara, y en estas ponen un con color totalmente igual, nuestro cerebro visualizará 2 colores totalmente diferentes, uno mas claro que el otro.

En sintesis hay una gran discusión de qué provoca esta ilusión, algunos concuerdan que por instinto animal cuando queremos ver cosas dentro de la oscuridad queremos poder discernir distintos objetos un poco mas claro que el fondo oscuro que se observa. Y de igual afirman que existen sensore inhbitorios en la retina otros experimentos sugieren que hay algo mas distinto solo a la misma retina. En la invistigacion que se hizo, analizan como existen interneuronas y neuronas que conectan por los ductos renitoscopicos.
[blog induccion-de-brillo](https://michaelbach.de/ot/lum-inducedBrightness/index.html)


<center><img src="/VisualComputing2022_2/sketches/Taller1/C4C.PNG" alt="" style="width:600px;" class="center;"/></center>

[Artículo](https://www.researchgate.net/publication/236959621_A_Neurodynamical_Model_of_Brightness_Induction_in_V1/download)

Aqui se logra apreciar como las interneuronas no permiten un buen flujo de información se desvian a otros tractos neuronales o nerviosos.
### **3. Métodos**
Para la exploración de este tema hicimos uso de los conceptos anteriormente expuestos, de tal manera que formaremos (no necesariamente una replicación) ilustraciones con ilusiones o efectos ópticos.

Para el primer ejercicio: 
Se pensó primero en el fondo de tal forma que se degrada de un color gris brillante a uno mas oscuro.
luego se generaron los recuadros y hicieron mas detalles.


Para el segundo ejercicio:
se pensó primero en circulos que salieran aleatoriamente, luego un punto central para que el obervador fijara su vision en dicho punto y por último se variaron los colores.
### **4. Resultados**

- Primer ejercicio:
    ¿Acaso el rectángulo inferior cambia de color?

{{< details title="Código" open=false >}}
```js
// Constantes
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;
let xMove =20;
let moveRight =1;



function drawRectangle(){
  stroke();
  fill(c1);
  rect(20, 160, 120, 80);
  rect(280, 160, 120, 80);
}


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
   
  if(xMove>280) {
    moveRight =0
  }
  if(xMove< 20 ) {
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
```
{{< /details >}}
{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller1/illusion1-0.js" width="420" height="430"  >}}


- Segundo ejercicio:
    ¿Ese círculo cambió de color antes de desaparecer?
    
{{< details title="Código" open=false >}}
```js
var redC = 253;
var greenC = 0;
var blueC = 238;
var xC = [0,0,0,0,0,0];
var yC =[0,0,0,0,0,0];

function drawCircle(){
  for(var i =0; i<6;i++){
    xC[i]=random(50,550)
    yC[i] = random(50,550) 
  }
}

function drawCircleInTime(){
  for(var i = 0;i>3;i++){
    circle(xC[i], yC[i],50) 
  }
}

function setup() {
  createCanvas(600, 600);
  setInterval(drawCircle,1000)
}

function draw() {
  background(180);
  fill(120)
  circle(300, 300,50)
  fill(redC,greenC,blueC)
  noStroke();
  drawCircleInTime();
  circle(xC[0], yC[0],50) 
  circle(xC[1], yC[1],50) 
  circle(xC[2], yC[2],50)
  fill(255-redC,255-greenC,255-blueC)
  circle(xC[3], yC[3],50) 
  circle(xC[4], yC[4],50) 
  circle(xC[5], yC[5],50)
}
```
{{< /details >}}
{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller1/illusion2-0.js"  >}}

- Tercer ejercicio:
    ¿Existen puntos entre las esquinas de los cuadrados?

{{< details title="Código" open=false >}}
```js
function setup() {

  createCanvas(400, 400);
}

function draw() {
  background(0);

  for (let i = 50; i < height; i += 50) {
    for (let j = 50; j < width; j += 50) { 
      stroke(150)
      strokeWeight(10)
      line(0, i, width, i)
      line(j, 0, j, height)
    }
 }

 
  for (let i = 50; i < width; i += 50) {
    for (let j = 50; j < height; j += 50) {
      noStroke()
      fill(255)
      //ellipse(i, j, 15, 15)

    }
  }
}
```
{{< /details >}}
{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller1/GridNoPoints.js"width="400" height="400" >}}

    Ahora que son visibles, ¿Son todos los puntos blancos o algunos son negros?
{{< details title="Código" open=false >}}
```js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  for (let i = 50; i < height; i += 50) {
    for (let j = 50; j < width; j += 50) { 
      stroke(150)
      strokeWeight(10)
      line(0, i, width, i)
      line(j, 0, j, height)
    }
 }

 
  for (let i = 50; i < width; i += 50) {
    for (let j = 50; j < height; j += 50) {
      noStroke()
      fill(255)
      ellipse(i, j, 15, 15)

    }
  }
}
```
{{< /details >}}
{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller1/GridPoints.js" width="400" height="400">}}

- Cuarto ejercicio:
    ¿Puedes ver la altura como si se tratase de una torre?
{{< details title="Código" open=false >}}
```js
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);
    //first circle
    for(var i=0, j=255; i<255, j>0; i++, j--) {
        fill(i, j, i);
    }
    translate(width / 2, height / 2);
    fill('black');
    circle(10, 40, 100);
    noStroke();
    //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('grey');
    circle(10, 40, 100);
    noStroke();
    //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('white');
    circle(10, 40, 100);
    noStroke();
    //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('black');
    circle(10, 40, 100);
    noStroke();
  //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('grey');
    circle(10, 40, 100);
    noStroke();
    //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('white');
    circle(10, 40, 100);
    noStroke();
    //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('black');
    circle(10, 40, 100);
    noStroke();
  //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('grey');
    circle(10, 40, 100);
    noStroke();
    //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('white');
    circle(10, 40, 100);
    noStroke();
    //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('black');
    circle(10, 40, 100);
    noStroke();
  //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('grey');
    circle(10, 40, 100);
    noStroke();
    //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('white');
    circle(10, 40, 100);
    noStroke();
    //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('black');
    circle(10, 40, 100);
    noStroke();
  //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('grey');
    circle(10, 40, 100);
    noStroke();
    //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('white');
    circle(10, 40, 100);
    noStroke();
    //
    translate(p5.Vector.fromAngle(millis() / 800, 10));
    fill('black');
    circle(10, 40, 100);
    noStroke();
}
```
{{< /details >}}

{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller1/tower.js" >}}

- Quinto ejercicio:
    ¿Los colores aparecen y desaparecen?
{{< details title="Código" open=false >}}
```js
let x = 0

function setup() {
  createCanvas(700, 500);
}

function draw() {
  background(220);
  for (let i = 0; i < 1000; i += 10) {
    noFill()
    stroke('purple')
    strokeWeight(4)
    ellipse(350, 250, i, i)

    stroke('red')
    strokeWeight(3)
    ellipse(x, 250, 500 - i, 500 - i)
  }
  if (x > width) {
    x = 0
  } else {
    x = x + 3
  }
}
```
{{< /details >}}
{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller1/redpurplecircles.js" >}}


### **5. Conclusion**
Con una simple verificación del código de ejecución de las ilusiones ópticas que acabamos de ver podemos bislumbrar que no existe ningún truco de trasfondo en las imágenes que observamos, sino que al final del día nuestra visión nos engaña basada en lo que espera ver y podemos aprovecharnos de ese hecho para engañar a nuestro cerebro en muchas formas distintas de manera muy creativa.

Podemos concluir que las ilusiones opticas suceden por el comportamiento de nuestros ojos, y todo lo que implica ello; es decir, toda una trazabalidad de comunicación e interpretacion desde el globo ocular hasta el nervio óptico, pudiendo diferenciar colores por medio de conos y bastones, hasta el comportamientos de nuestras neuronas, donde las mismas tendrian que ser inhibidas para ver la diferencia de un mundo oscuro, a uno claro. 

Las ilusiones ópticas no significan un problema o burla de visión, sino todo lo contrario, abre las puertas de hasta que punto ha llegado el ojo humano para poder diferenciar tantas cosas que percibe hoy en dia, tanto que un simple juego, programa o ilusion nos hace caer en cuenta.