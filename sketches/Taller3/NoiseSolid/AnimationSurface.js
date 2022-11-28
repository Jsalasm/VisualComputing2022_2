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
