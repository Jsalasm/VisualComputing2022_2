let easycam;
let uvShader;
let button;
let slider;
let w;
let h;

function preload() {
  uvShader = readShader('/VisualComputing2022_2/sketches/Taller3/Texturing/uv.frag',
                  { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(500, 500, WEBGL);
  //textureMode(NORMAL);
  shader(uvShader);
  w = width/2
  h = height/2
  slider = createSlider(0, 255, 0);
  slider.position(350, 10);
  button = createButton('Flip');
  button.position(10, 10);
  button.mousePressed(flip);
}

function draw() {
  push();
  background(200);
  uvShader.setUniform('x', slider.value() / 255);
  noStroke();
  quad(-w,-h,w,-h,
        w,h,-w,h)
  pop();
}

function flip() {
  w = -w
  h = -h
  redraw()
}
