# Surface Texture Animation 
## 1. Introducción
En este punto se indagó en cómo se puede alterar la superficie de un solido y de igual forma, variarlo respecto a su textura atribuida.

## 2. Revisión bibliográfica

## Prodecural Animation 
Es considerado la animación que cambia en tiempo real, normalmente tiende a hacer animaciones complejas, compuestas por un sistemas de las mismas. Por ejemplo existe un cuerpo anátomico donde se quita o se acorta una parte de su extremidad, y su animacion se ve alterada en tiempo real, como se ve ena la siguiente imagen:

<img src="/VisualComputing2022_2/sketches/Taller3/NoiseSolid/LegoDog.gif" />

Tambien puede ser atribuida la animación en tiempo real, si la animacion se encuentra relacionada con su textura; por ejemplo, si cambiamos la textura de un cuerpo, la animacion de este propio cuerpo se verá alterada.


## 3. Métodos

Para la realización de este tema, se plantean varios cuerpos geometrico tridimensionales, los cuales son: Esfera, Cilindro hueco, toroide y elipsoide; donde estos 2 ultimos se tendra la libertad de graduar la cantidad de aristas que contenga. Respecto a los Shader: el primero sera una simple asignacion de la textura a la superficie del cuerpo; el Segundo shader se hará el movimiento sinusoidal, el cual se vera codificado mas que todo el vetex-shader; y por ultimo, se hara una animación de ruido respecto al colo de la textura que se encuntra en la figura 3D.

Asi mismo se mirará que tipos de animaciones pueden llegar a ser generadas con esta implementación:


## 4. Resultados



{{< details "Shader1.vert" >}}
```js
attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform float uFrameCount;
uniform sampler2D uNoiseTexture;

varying vec2 vTexCoord;
varying vec3 vNoise;


void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
  vTexCoord = aTexCoord;
}
```
{{< /details >}}

{{< details "shader2.vert" >}}
```js
attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;
uniform mat4 uProjectionMatrix;

uniform mat4 uModelViewMatrix;
uniform float uFrameCount;
uniform sampler2D uNoiseTexture;

varying vec2 vTexCoord;
varying vec3 vNoise;


void main() {


  float tile = 2.0; //limite del ruido
  float speed = 0.002;//velocidad de ruido en el tiempo, segun los frames que lleve el cuerpo
  vec4 noise = texture2D(uNoiseTexture, fract(aTexCoord * tile + uFrameCount * speed));

  //manda el ruido al fragment 
  vNoise = noise.rgb;
  
  float frequency = 20.0; //frecuencia del sinosoide
  float amplitude = 0.1; //amplitud del sinosoide


  vec4 positionVec4 = vec4(aPosition, 1.0);
  // aqui ya es la distorcion con ayuda de la funcion seno
  float distortion = sin(positionVec4.x * frequency + uFrameCount * 0.1);



  // se varia respecto a la amplitud que definimos anteriormente y la distorsion
  //que constituye el movimiento sinosoidal
  positionVec4.x += distortion * aNormal.x * amplitude;

  // para este caso en el cambio de las posiciones de los vertices debe tener un orden
  // para este caso proyeccion, vista, modelo, posicion.
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  vTexCoord = aTexCoord;
}
```
{{< /details >}}


{{< details "shader3.vert" >}}
```js
attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform float uFrameCount;
uniform sampler2D uNoiseTexture;

varying vec2 vTexCoord;
varying vec3 vNoise;


void main() {

  
  float tile = 2.0;
  float speed = 0.002;
  vec4 noise = texture2D(uNoiseTexture, fract(aTexCoord * tile + uFrameCount * speed));

  
  vNoise = noise.rgb;

  
  vec4 positionVec4 = vec4(aPosition, 1.0);

  float amplitude = 1.0;

  // se agrega el ruido a la posición y multiplique por la normal
  positionVec4.xyz += (noise.rgb - 0.5 ) * aNormal * amplitude;

  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
  vTexCoord = aTexCoord;
}
```
{{< /details >}}


{{< details "Shader.frag" >}}
precision mediump float;
varying vec2 vTexCoord;
varying vec3 vNoise;

void main() {
  vec3 color = vNoise;
  gl_FragColor = vec4(color ,1.0);
}
{{< /details >}}


{{< details "sketch.js" >}}
```js
let myShader1;
let myShader2;
let myShader3;
let esfera = 1;
let imgPivot;
let img0;
let img1;
let img2

let detailY;
  
let count = 0;
let countShape = 0;

function preload() {

    myShader1 = loadShader("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/shader1.vert", "/VisualComputing2022_2/sketches/Taller3/NoiseSolid/shader.frag");
    myShader2 = loadShader("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/shader2.vert", "/VisualComputing2022_2/sketches/Taller3/NoiseSolid/shader.frag");
    myShader3 = loadShader("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/shader3.vert", "/VisualComputing2022_2/sketches/Taller3/NoiseSolid/shader.frag")
    
    img1 = loadImage("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/pinturas.jpg");
    img0 = loadImage("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/wall.jpg")
    img2 = loadImage("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/squareWall.png")
    img3 = loadImage("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/black&White.jpg");
    imgPivot = img0;



}

function setup() {
    radio = createRadio();

    button = createButton('Imagen');
    button.position(15, 15);
    button.mousePressed(changeBtn);
    buttonShape = createButton('Figura');
    buttonShape.position(85, 15);
    buttonShape.mousePressed(changeBtnShape);
    
    radio.option('1','None');
    radio.option('2','Waves Ripple');
    radio.option('3','Noisy');
    radio.style('width', '300px');
    radio.selected('1');
    radio.position(380,165)
    createCanvas(600, 600, WEBGL);
    radio.style('margin-top', "-150px");
    radio.style('color', 'aqua');
    textAlign(CENTER);
    noStroke();

    detail = createSlider(2, 24, 6);
    detail.position(10,  45);
  }

function draw() {
    background(0);


    let val = radio.value();
    changeShaderVert(val);


    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.008);

    if (countShape == 0) {
        sphere(width / 5, 300, 300);
        detail.hide();
    } else if(countShape==1){
        cylinder(width / 8, width / 2, 24, 24, false, false);
        detail.hide();
    } else if(countShape==2){
        detail.show();
        ellipsoid(100, 100, 100, 12, detail.value());
    } else {
        detail.show();
        torus(150, 40, detail.value(), 8);
    }
    


}

function changeShaderVert(val) {
    if (val == 1) {
        shader(myShader1);
        myShader1.setUniform("uFrameCount", frameCount);
        myShader1.setUniform("uNoiseTexture", imgPivot);
    } else if (val == 2) {
        shader(myShader2);
        myShader2.setUniform("uFrameCount", frameCount);
        myShader2.setUniform("uNoiseTexture", imgPivot);
    } else {
        shader(myShader3);
        myShader3.setUniform("uFrameCount", frameCount);
        myShader3.setUniform("uNoiseTexture", imgPivot);
    }

}

function myCheckedEvent0() {
    if (checkbox0.checked()) {
        esfera = 0;
    } else {
        esfera = 1
    }
}

function changeBtn() {
    count = count + 1;
    if (count == 0) {
        imgPivot = img0;
    } else if (count == 1) {
        imgPivot = img1
    } else if (count == 2) {
        imgPivot = img2
    } else {
        count = -1
        imgPivot = img3
    }

}
function changeBtnShape() {
    countShape = countShape + 1;
    if(countShape>=3){
        countShape=-1
    }

}


```
{{< /details >}}


{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller3/NoiseSolid/AnimationSurface.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" 
lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="620" height="650"  >}}

Y ya generando unas animaciones mas decentes tenemos efecto glitch y asi mismo el la alfombra voladora de Aladdin. En si se hacen cambios minimos en los shaders
{{< details "shader2.vert" >}}
```js
attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform float uFrameCount;
uniform float uFrequency;
uniform float uAmplitud;

uniform sampler2D uNoiseTexture;

varying vec2 vTexCoord;
varying vec3 vNoise;


void main() {

  float tile = 2.0;
  float speed = 0.002;
  vec4 noise = texture2D(uNoiseTexture, fract(aTexCoord * tile + uFrameCount * speed));

  vNoise = noise.rgb;
  
  float frequency = uFrequency;
  float amplitude = uAmplitud;

  vec4 positionVec4 = vec4(aPosition, 1.0);
  float distortion = sin(positionVec4.x * frequency + uFrameCount * 0.1);
 
  positionVec4.z += distortion * aNormal.z * amplitude;

  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  vTexCoord = aTexCoord;
}
```
{{< /details >}}

{{< details "sketch.js" >}}
```js
let myShader1;
let myShader2;
let myShader3;
let esfera = 1;
let imgPivot;

let counterGlitch = 0
let counterAladdin = 0

let img1;
let img2;
  
let count = 0;

function preload() {
    myShader1 = loadShader("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/Animation/shader1.vert", "/VisualComputing2022_2/sketches/Taller3/NoiseSolid/Animation/shader3.frag");
    myShader2 = loadShader("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/Animation/shader2.vert", "/VisualComputing2022_2/sketches/Taller3/NoiseSolid/Animation/shader3.frag");
    myShader3 = loadShader("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/Animation/shader3.vert", "/VisualComputing2022_2/sketches/Taller3/NoiseSolid/Animation/shader3.frag")
    img1 = loadImage("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/Animation/otherGlitch.jpg");
    img2 = loadImage("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/Animation/alfombra.jpg")
    imgPivot = img1;

    objeto = loadModel("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/Animation/Cannoe.obj");
    objeto1 = loadModel("/VisualComputing2022_2/sketches/Taller3/NoiseSolid/Animation/Skull.obj");

}

function setup() {


    radio = createRadio();
    radio.option('1','Glitch');
    radio.option('2','Aladdin');
    radio.style('width', '300px');
    radio.selected('1');
    createCanvas(600, 600, WEBGL);
    radio.style('margin-top', "0px");
    radio.style('color', 'aqua');
    radio.changed(mySelectEvent3);
    radio.position(10,20)
    

    selModel = createSelect();
    selModel.position(10, 10);
    selModel.option('Cannoe');
    selModel.option('Skull');
    selModel.selected('Cannoe');
    selModel.changed(mySelectEvent1);
    selModel.style('margin-top', "0px");
    selModel.style('color', 'red');
    selModel.position(200,20)
    selModel.selected('Cannoe')

    selAladdin = createSelect();
    selAladdin.position(10, 10);
    selAladdin.option('None');
    selAladdin.option('Flying');
    selAladdin.selected('None');
    selAladdin.changed(mySelectEvent2);
    selAladdin.style('margin-top', "0px");
    selAladdin.style('color', 'green');
    selAladdin.position(200,20)

    detailF = createSlider(2.0, 30.0, 12.0);
    detailF.position(20,  65);
    detailA = createSlider(1.0, 40.0, 20.0);
    detailA.position(20,  110);
    

    counterGlitch=1
    counterAladdin=1
    textAlign(CENTER);
    noStroke();
  }

function draw() {
    background(0);
    detailF.hide();
    detailA.hide();

    rotateX(1.4);
    if(radio.value()==1){
        selModel.show()
        selAladdin.hide()
        plane(width / 1.8, width / 2, 300);
        if(counterGlitch==1){
            push()
            translate(-150,-100,-100)
            rotateX((2*PI)/5); 
            scale(50) // maxificamos la escala del objeto 
            model(objeto) // aqui dibujamos el objeto barquito
            pop()
        }else if(counterGlitch==2){
            push()
            translate(-10,90,100)
            rotateX((2*PI)/5); 
            rotateY((PI))
            scale(80) // maxificamos la escala del craneo
            model(objeto1) // aqui dibujamos el objeto
            pop()
        }
        shader(myShader3);
        myShader3.setUniform("uFrameCount", frameCount);
        myShader3.setUniform("uNoiseTexture", img1);
    }else if(radio.value()==2){
        selModel.hide();
        selAladdin.show()
        plane(width / 1.8, width / 2, 300);
        if(counterAladdin==1){
            shader(myShader1);
            myShader1.setUniform("uFrameCount", frameCount);
            myShader1.setUniform("uNoiseTexture", img2);
        }else if(counterAladdin==2){
            detailF.show();
            detailA.show();
            shader(myShader2);
            myShader2.setUniform("uFrameCount", frameCount);
            myShader2.setUniform("uNoiseTexture", img2);
            myShader2.setUniform("uFrequency",detailF.value())
            myShader2.setUniform("uAmplitud",detailA.value())
        }
    }
    print(frameRate());

}

function changeObjectGlitch(val) {
    if(val==1){
    }else{
    }
    radio.selected()

}

function mySelectEvent1() {
    if(selModel.value()==="Cannoe"){
        counterGlitch=1}
    if(selModel.value()==="Skull"){counterGlitch=2}
}
function mySelectEvent2() {
    if(selAladdin.value()==="None"){
        counterAladdin=1}
    if(selAladdin.value()==="Flying"){counterAladdin=2}
}
function mySelectEvent3() {
    if (radio.value()==1) {
        selModel.show()
        selAladdin.hide()
    } else {
        selModel.hide()
        selAladdin.show()
    }
}

```
{{< /details >}}


{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller3/NoiseSolid/Animation/AnimationTexture.js"  width="620" height="650"  >}}

## 5. Conclusiones

Si usamos de manera adecuada los shaders, la elección de la texturas y el cuerpo a manejar, se puede hacer gran variedad de animaciones. Pero tiene que ser muy meditado en la eleccion de los elementos ya seleccionados, ya que por una simple textura que no cuadre, la animacion de vera afectada, de igual forma si el cuerpo no tiene suficientes aristas, se tendra que conseguir otro cuerpo que se adecue a la animación propuesta.

Sí bien no se uso procedural animation tal cual, fue un breve acercamiento ante el cambio de una animacion por una textura en tiempo real.

## 6. Referencias

* [Procedural animation](https://en.wikipedia.org/wiki/Procedural_animation#:~:text=A%20procedural%20animation%20is%20a,be%20created%20using%20predefined%20animations)
* [aferris-p5jsShaderExamples](https://github.com/aferriss/p5jsShaderExamples)