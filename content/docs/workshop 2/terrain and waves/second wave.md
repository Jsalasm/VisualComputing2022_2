# **Taller de Ilusiones**

### **1. Introducción**
En este segundo punto del ejercicio (Terrain and wave) se busca hacer uso de las transformaciones en objetos 3D. Para este caso, se quiere hacer uso de perspectiva y animacion de una ola mas compuesta. Utilizando archivos .obj para darle mas realismo
### **2. Revisión bibliográfica**

#### **Archivos OBJ**
Los archivos OBJ, son antiguos archivos para manejar formatos 3D, estos contienen varios puntos, normalmente de 3 coordenadas que se conectan, generando y uniendo distintos poligonos y genera todo un cuerpo, o bueno, en general la superficie del cuerpo. Entra mas poligonos o aristas tenga este archivo mas pesado llegará a ser, no se recomienda usar archivos demasiado pesados ya que dependerá de cuanta memoria de video maneja el navegador, para estos archivos usados en web se recomienda que sean "lowpoly", es decir que poseen una baja cantidad de poligonos (obviamente arriesgando la calidad en 3D).

<img src="/VisualComputing2022_2/sketches/Taller2/lowpoly.jpg">

Ademas de usar los mismos conceptos usados en [First_wave](https://jsalasm.github.io/VisualComputing2022_2/docs/workshop-2/terrain-and-waves/first-wave/#2-revisi%C3%B3n-bibliogr%C3%A1fica)


[Artículo](http://anubis4d.xyz/proyectos/cursos/P5-clase-17.html)

### **3. Métodos**
Para este segundo punto del taller se quiere manejar una ola mas compuesta, de tal manera que el punto donde iniciará el movimiento será desde el centro y la finalización de la animacion sinusoidel terminara en las puntas, es decir un movimiento de adentro hacia afuera, no de un lado a otro como era en el caso de "Firstwave". Y para darle un toque de realismo pondremos el cuerpo de una canoa.


### **4. Resultados**
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
  objeto = loadModel("/VisualComputing2022_2/sketches/Taller2/Cannoe.obj");
  imagen1 = loadImage("/VisualComputing2022_2/sketches/Taller2/Wood.png");
}
function setup() {
  createCanvas(400, 400, WEBGL);
  mangle = atan(1/sqrt(2)); // angulo que mejora la perspectiva
  maxD = dist(0,0,200,200);
  slider = createSlider(10, 40, 40,10);
  slider.position(10, 10);
}

function draw() {
  w= slider.value();
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



### **5. Conclusion**
Se ve un poco mas realista el movimiento de la ola, ademas puesta en escena de la canoa en 3D la una razon mas de el movimiento del mar. Pero aun así para sacarnos mas a la realismo tendriamos que partir a una textura mas natural, es decir no basado en un plano de cubos. Para esto se pueden usar shaders que manejan con facilidad el cambio de un cuerpo y textura dispuestos al procesamiento en GPU.

De igual forma se quiere aplicar un poco mas de inmersión sobre un terreno.