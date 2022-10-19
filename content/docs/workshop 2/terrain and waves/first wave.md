# **Taller de Ilusiones**

### **1. Introducción**
En este primer punto del ejercicio (Terrain and wave) se busca hacer uso de las transformaciones en objetos 3D. Para este caso, se quiere hacer uso de perspectiva y animacion de un ola sencilla.
### **2. Revisión bibliográfica**

#### **Función Seno**
Es una función trigonometrica, dicha funcion periodica se expresa como la razón del cateto opuesto y la hipotenusa, el cual el rango de esta función periodica es −1 ≤ y ≤ 1. Esta función respecto al tiempo genera una representación del comportamiento de las ondas o asemejado a una ola del mar (perfecto para este tema).


<img src="/VisualComputing2022_2/sketches/Taller2/sin.gif">

[Artículo](https://www.researchgate.net/publication/236959621_A_Neurodynamical_Model_of_Brightness_Induction_in_V1/download)


#### **Vision ortográfica y visión de perspectiva**
La vision ortografica mantiene una óptica mas técnica, el cual permite mantener una misma proporción para los objetos o cuerpos que se encuentran en ese plano de visión.

Mientras que la visión de perspectiva, es el punto de vista que siempre hemos tenido, si observador se encuentre en cierta posición, todo aquel objeto que se aleja de este punto de vista parecerá que esta disminuyendo su tamaño.

##### **Vision ortográfica**
<img src="/VisualComputing2022_2/sketches/Taller2/or.png">

##### **Vision visión de perspectiva**
<img src="/VisualComputing2022_2/sketches/Taller2/pr.png">

### **3. Métodos**
Se crea una cantidad de cubos con un tamaño predispuesto, estos cubos se organizan en forma de matriz de tal manera que parezca un plano. La idea es cambiar su altura respecto al movimiento de la funcion sinusoidal, para hacer mas facil y adaptable la ejecución, se usa la funcion map() de p5 que me ayuda a completar intervalos de un punto A a un punto B, para esta ocasión la función del seno.


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

  slider = createSlider(12, 40, 24);
  slider.position(10, 10);
}

function draw() {
  w= slider.value();
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




### **5. Conclusion**

Ahora pasamos al otro tipo ola, la idea es mejorar la animación y dar un contexto mas amplio con esta secuencia de pestañas


## Referencias
[Vision ortográfica y visión de perspectiva](https://docs.blender.org/manual/es/2.91/editors/3dview/navigate/projections.html)
[P5 waves](https://thecodingtrain.com/challenges/86-cube-wave-by-bees-and-bombs)
