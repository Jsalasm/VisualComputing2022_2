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