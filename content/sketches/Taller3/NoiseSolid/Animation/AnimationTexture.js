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
