let easycam;
let edge = 80;
let teapot;
let teapotTex;
let bunny;
let bunnyTex;
let texShader;

function preload() {
  // no varyings need to be emitted from the vertex shader
  texShader = readShader('/VisualComputing2022_2/sketches/Taller3/NEG/non_euclidean.frag',
                         { varyings: Tree.NONE });
  teapot = loadModel('/VisualComputing2022_2/sketches/Taller3/NEG/teapot.obj', true);
  bunny = loadModel('/VisualComputing2022_2/sketches/Taller3/NEG/bunny.obj', true);
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // no need to normalize the texture
  // textureMode(NORMAL);
  shader(texShader);
  // resolution will be used to sample the offscreen textures
  emitResolution(texShader);
  easycam = createEasyCam();
  teapotTex = createGraphics(width, height, WEBGL);
  bunnyTex = createGraphics(width, height, WEBGL);
}

function draw() {
  // 1. compute current main canvas camera params
  let position = treeLocation();
  let center = p5.Vector.add(position, treeDisplacement());
  let up = treeDisplacement(Tree.j);
  // in case the current camera projection params are needed check:
  // https://github.com/VisualComputing/p5.treegl#frustum-queries
  // 2. offscreen rendering
  // bunny graphics
  bunnyTex.background(200);
  bunnyTex.reset();
  bunnyTex.camera(position.x, position.y, position.z,
                  center.x, center.y, center.z,
                  up.x, up.y, up.z);
  bunnyTex.push();
  bunnyTex.noStroke();
  bunnyTex.fill('red');
  // most models use positive y-coordinates
  bunnyTex.scale(1, -1);
  bunnyTex.scale(0.8);// only bunny
  bunnyTex.model(bunny);
  bunnyTex.pop();
  // teapot graphics
  teapotTex.background(200);
  teapotTex.reset();
  teapotTex.camera(position.x, position.y, position.z,
                   center.x, center.y, center.z,
                   up.x, up.y, up.z);
  teapotTex.push();
  teapotTex.noStroke();
  teapotTex.fill('blue');
  teapotTex.scale(1, -1);
  teapotTex.model(teapot);
  teapotTex.pop();
  // 3. main canvas
  background(0);
  push();
  // front (+z)
  stroke('purple');
  strokeWeight(5);
  texShader.setUniform('texture', bunnyTex);
  beginShape();
  vertex(-edge, -edge, +edge);
  vertex(+edge, -edge, +edge);
  vertex(+edge, +edge, +edge);
  vertex(-edge, +edge, +edge);
  endShape(CLOSE);
  // right (+x)
  texShader.setUniform('texture', teapotTex);
  beginShape();
  vertex(+edge, -edge, +edge);
  vertex(+edge, -edge, -edge);
  vertex(+edge, +edge, -edge);
  vertex(+edge, +edge, +edge);
  endShape(CLOSE);
  pop();
}