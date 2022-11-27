let colorShader;
let cmy;
let v1, v2, v3;
let button1;
let button2;

function preload() {
  colorShader = readShader('/VisualComputing2022_2/sketches/Taller3/Coloring/color.frag',
                          { matrices: Tree.NONE, varyings: Tree.color4 });
}

function setup() {
  createCanvas(500, 500, WEBGL);
  shader(colorShader);
  randomizeTriangle();
  button = createButton('Flip');
  button.position(10, 10);
  button.mousePressed(flip);
  button = createButton('Randomize');
  button.position(50, 10);
  button.mousePressed(randomize);
}

function draw() {
  beginShape(TRIANGLES);
  fill('red');
  vertex(v1.x, v1.y);
  fill('green');
  vertex(v2.x, v2.y);
  fill('blue');
  vertex(v3.x, v3.y);
  endShape();
}

function randomizeTriangle() {
  v1 = p5.Vector.random2D();
  v2 = p5.Vector.random2D();
  v3 = p5.Vector.random2D();
}

function flip() {
  cmy = !cmy;
  colorShader.setUniform('cmy', cmy);
}

function randomize() {
  randomizeTriangle();
}