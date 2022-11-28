let rippleShader;

let currBuff, prevBuff;

const damping = 1;

function preload() {
    rippleShader = loadShader(
        '/VisualComputing2022_2/sketches/Taller3/ImageProcessing/Ripple/ripple.vert', 
        '/VisualComputing2022_2/sketches/Taller3/ImageProcessing/Ripple/ripple.frag');
}

function setup() {
    createCanvas(600, 600, WEBGL);
    pixelDensity(1);
    noSmooth();

    currBuff = createGraphics(width, height);
    currBuff.noSmooth();

    prevBuff = createGraphics(width, height);
    prevBuff.noSmooth();

    shader(rippleShader);

    rippleShader.setUniform("damping", damping);
    rippleShader.setUniform("res", [width, height]);
}

function draw() {

    stroke(255);
    if (mouseIsPressed) {
        point(mouseX - width / 2, mouseY - height / 2);
    }

    prevBuff.image(currBuff, 0, 0);
    currBuff.image(get(), 0, 0);

    rippleShader.setUniform('currBuff', currBuff);
    rippleShader.setUniform('prevBuff', prevBuff);

    rect(-width / 2, -height / 2, width, height);
}