---
bookCollapseSection: true
---

## ¿Porqué usar shaders? #

En el pasado, las tarjetas gráficas eran piezas de silicio no programables que ejecutaban un conjunto de algoritmos fijos:

*entradas: coordenadas 3D de triángulos, sus colores, fuentes de luz
*salida: una imagen 2D

Estas arquitecturas se conocían como "fixed function pipelines", ya que solo podían implementar un único algoritmo.

Pero eso era demasiado restrictivo para los programadores que querían crear muchos efectos visuales complejos diferentes.

Entonces, a medida que la tecnología de fabricación de semiconductores avanzó y los diseñadores de GPU pudieron incluir más transistores por milímetro cuadrado, los proveedores comenzaron a permitir que algunas partes del pipeline de renderizado fueran lenguajes de programación programados.

El término GPU de propósito general (GPGPU) se refiere a esta mayor capacidad de programación de las GPU modernas, y se crearon nuevos lenguajes para adaptarse mejor a él que OpenGL, en particular OpenCL y CUDA.

### En el modelo OpenGL 4 solo son programables las etapas azules del siguiente diagrama

<img src="/VisualComputing2022_2/sketches/Taller3/opengl.png"/>

Los shaders toman la entrada de la etapa de pipeline anterior (por ejemplo, posiciones de vértice, colores y píxeles rasterizados) y personalizan la salida a la siguiente etapa.

Los dos más importantes son:

### vertex shader:

-entrada: posición de los puntos en el espacio 3D
-salida: proyección 2D de los puntos (usando la multiplicación de matriz 4D)

### Este ejemplo relacionado muestra más claramente qué es una proyección:

<img src="/VisualComputing2022_2/sketches/Taller3/proyeccion.png"/>

### fragment shader:

-entrada: posición 2D de todos los píxeles de un triángulo + (color de los bordes o una imagen de textura) + parámetros de iluminación
-salida: el color de cada píxel del triángulo (si no está ocluido por otro triángulo más cercano), generalmente interpolado entre vértices

### Los fragmentos se discretizan a partir de las proyecciones triangulares previamente calculadas:

<img src="/VisualComputing2022_2/sketches/Taller3/fragment.png"/>

## Y ahora veamos un ejemplo de diferencia de rendimiento en las dos diferentes implementaciones de texturizado:

{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller3/compare.js" lib1="/VisualComputing2022_2/sketches/libraries/p5.treegl.js" 
lib2="/VisualComputing2022_2/sketches/libraries/p5.easycam.js" width="750" height="500"  >}}

{{< details "compare.js" >}}
```js
let button1, button2;
let theShader;
let shaderBg;

let right = false;

let img;

function preload(){
  img = loadImage('/VisualComputing2022_2/sketches/Taller3/test.jpg');
  theShader = loadShader('/VisualComputing2022_2/sketches/Taller3/compare.vert','/VisualComputing2022_2/sketches/Taller3/compare.frag');
}

function setup(){
  // disables scaling for retina screens which can create inconsistent scaling between displays
  pixelDensity(1);
  
  frameRate(300);
  
  createCanvas(720,400);
  noStroke();
  
  // Make buttons
  button1 = createButton('loadPixels');
  button2 = createButton('shader');
  button1.mousePressed(showp5);
  button2.mousePressed(showShader);
  button1.position(20,65);
  button2.position(20+button1.width,65);
  
  // Make graphics buffer
  shaderBg = createGraphics(720, 400, WEBGL);
  
  img.resize(width,height);
}

function draw(){
  if (right == false) {
    drawp5();
  } else {
    drawShader();
  }
}

function drawp5(){
    // load pixels from image of awesome colors into an array
    img.loadPixels();
    // load pixel array in to memory, because we are about to do some pixel by pixel processing
    loadPixels();
    // traverse through each pixel with a double for loop
    for(let x = 0; x < img.width; x++) {            // traverse horizontally
      for(let y = 0; y < img.height; y++) {         // traverse vertically
        let loc = (x + y * img.width) * 4;          // get location of pixel in array
        let thisDist = dist(x, y, mouseX, mouseY);  // calculate distance to mouse
        thisDist = map(thisDist,0,img.width,0,255); // calculate new color, map distance to rgb
        // set the new color of the pixel (x,y,r,g,b,a)
        set(x, y, [img.pixels[loc]+thisDist, img.pixels[loc+1]+thisDist, img.pixels[loc+2]+thisDist, 255]);
      }
    }
    // update pixel array in memory
    updatePixels();

    // draw rectangle with framerate
    fill(0,50);
    rect(0,0, 34, 40);
    fill(255);
    text(int(frameRate()) + ' frames per second',12,25);
}

function drawShader(){
    // pass the shader to the graphics buffer
    shaderBg.shader(theShader);
    
    // get the mouse coordinates, map them to values between 0-1 space
    let yMouse = map(mouseY, 0, height, height, 0) / height;
    let xMouse = mouseX / width;
  
    // pass the interactive information to the shader
    theShader.setUniform('resolution', [width, height]);
    theShader.setUniform('mouse', [xMouse, yMouse]);
    theShader.setUniform('texImg', img);
  
    // draw the shader
    shaderBg.rect(0,0,width,height);
    image(shaderBg,0,0,width,height);
  
    // draw rectangle with framerate
    fill(0,50);
    rect(0,0, 140, 40);
    fill(255);
    text(int(frameRate()) + ' frames per second',12,25);
}

function showp5(){
  right = false;
}

function showShader(){
  right = true;
}
```
{{< /details >}}
{{< details "compare.frag" >}}
```js
#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

uniform sampler2D texture;

// varying vec4 vertColor;                   // this is our fragment color comming in
varying vec2 vTexCoord;										// this is our fragment (pixel) coords
uniform vec2 mouse;

uniform sampler2D texImg;



void main() {
  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;
  
  // pass image as texture from p5
  vec4 img = texture2D(texImg, uv);
  
	//calc distance to mouse
	float dist = sqrt((vTexCoord.x-mouse.x)*(vTexCoord.x-mouse.x)+(vTexCoord.y-mouse.y)*(vTexCoord.y-mouse.y));
  
  // set the output color, it’s RGBA 0-1, not 0-255.
	gl_FragColor = vec4(img.r+dist,img.g+dist,img.b+dist, 1.0);                      
}
```
{{< /details >}}
