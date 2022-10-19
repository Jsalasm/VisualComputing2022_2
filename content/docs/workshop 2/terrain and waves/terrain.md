# **Taller de Ilusiones**

### **1. Introducción**
En este tercer punto del ejercicio (Terrain and wave) se busca hacer uso de las transformaciones en objetos 3D. Para este caso, se quiere hacer uso de perspectiva y animacion de un terreno, donde coge protagonismo la diferenciacion la tiera y el agua. Utilizando archivos .obj para darle mas realismo
### **2. Revisión bibliográfica**

Aqui se usaran los conceptos de [Second_wave](https://jsalasm.github.io/VisualComputing2022_2/docs/workshop-2/terrain-and-waves/first-wave/#2-revisi%C3%B3n-bibliogr%C3%A1fica)


### **3. Métodos**
Se desea implementar la animación de la ola compuesta, en un terreno que diferencie entre el agua y la tierra, de tal manera que se le de un poco mas de inmersion al asunto expuesto.

Se genera una matriz que acoja el eje X y el eje Z, donde luego se departen una cantidad de cubos, estos cubos tendran una aleatoriedad sencilla, generando un tipo de ruido que logrará mantener una parte diferenciable en tierra y otra en agua. Si el cubo es mayor a una altura determinada se pintara de verde, de lo contrario se pintará de azul.
### **4. Resultados**

No se pudo ejecutar la animación de la ola en el terreno debido a la complejidad que mantiene, ya que tiene que pasar por todos los bloques comprobando y dibujando.
De hecho poner solo el loop del terreno ya acontece un incremento forzoso para la computación del código. 

Se procedió a solo dejar el terreno simple, este no tiene Loop, pero sí, una manera de refrescar el terreno para crear uno nuevo con solo dar click.

- Terreno aleatorio

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
Para este ultimo punto, debido al gran procesamiento no se pudo ejecutar como se tenia planeado. Gran parte tiene que ver con la complejidad algoritmica que maneja, pero tambien se podria aprovechar mucho mejor, con el uso de shaders. Con los shaders tambien se poddria cambiar la textura, del terreno y de la animación, dejarle todo este peso al procesador y al limitante de recursos del navegador no es buena idea.

## Referencias
[Steve's_Makerspace](https://www.fxhash.xyz/u/Steve's%20Makerspace/collection)
[Terrain](https://editor.p5js.org/StevesMakerspace/sketches/kjw_kQYYj)