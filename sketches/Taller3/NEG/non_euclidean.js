let easycam;
let edge = 80;
let fox;
let foxTex;
let train;
let trainTex;
let texShader;

function preload() {
  // no varyings need to be emitted from the vertex shader
  texShader = readShader('/VisualComputing2022_2/sketches/Taller3/NEG/non_euclidean.frag',
                         { varyings: Tree.NONE });
  fox = loadModel('/VisualComputing2022_2/sketches/Taller3/NEG/fox.obj', true);
  train = loadModel('/VisualComputing2022_2/sketches/Taller3/NEG/train.obj', true);
  dragon = loadModel('/VisualComputing2022_2/sketches/Taller3/NEG/dragon.obj', true);
  apple = loadModel('/VisualComputing2022_2/sketches/Taller3/NEG/apple.obj', true);
  skull = loadModel('/VisualComputing2022_2/sketches/Taller3/NEG/skull.obj', true);
  tie = loadModel('/VisualComputing2022_2/sketches/Taller3/NEG/tie.obj', true);
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  // no need to normalize the texture
  // textureMode(NORMAL);
  shader(texShader);
  // resolution will be used to sample the offscreen textures
  emitResolution(texShader);
  easycam = createEasyCam();
  foxTex = createGraphics(width, height, WEBGL);
  trainTex = createGraphics(width, height, WEBGL);
  dragonTex = createGraphics(width, height, WEBGL);
  appleTex = createGraphics(width, height, WEBGL);
  skullTex = createGraphics(width, height, WEBGL);
  tieTex = createGraphics(width, height, WEBGL);
}

function draw() {
  // 1. compute current main canvas camera params
  let position = treeLocation();
  let center = p5.Vector.add(position, treeDisplacement());
  let up = treeDisplacement(Tree.j);
  // in case the current camera projection params are needed check:
  // https://github.com/VisualComputing/p5.treegl#frustum-queries
  // 2. offscreen rendering
  // train graphics
  trainTex.background(200);
  trainTex.reset();
  trainTex.camera(position.x, position.y, position.z,
                  center.x, center.y, center.z,
                  up.x, up.y, up.z);
  trainTex.push();
  trainTex.noStroke();
  trainTex.fill('white');
  // most models use positive y-coordinates
  trainTex.scale(1, -1);
  trainTex.scale(0.8);// only train
  trainTex.model(train);
  trainTex.pop();
  // fox graphics
  foxTex.background(200);
  foxTex.reset();
  foxTex.camera(position.x, position.y, position.z,
                   center.x, center.y, center.z,
                   up.x, up.y, up.z);
  foxTex.push();
  foxTex.noStroke();
  foxTex.fill('orange');
  foxTex.scale(1, -1);
  foxTex.model(fox);
  foxTex.pop();

  dragonTex.background(200);
  dragonTex.reset();
  dragonTex.camera(position.x, position.y, position.z,
                  center.x, center.y, center.z,
                  up.x, up.y, up.z);
  dragonTex.push();
  dragonTex.noStroke();
  dragonTex.fill('black');
  dragonTex.scale(1, -1);
  dragonTex.scale(0.8);// only dragon
  dragonTex.model(dragon);
  dragonTex.pop();

  appleTex.background(200);
  appleTex.reset();
  appleTex.camera(position.x, position.y, position.z,
                  center.x, center.y, center.z,
                  up.x, up.y, up.z);
  appleTex.push();
  appleTex.noStroke();
  appleTex.fill('red');
  appleTex.scale(1, -1);
  appleTex.scale(0.8);// only apple
  appleTex.model(apple);
  appleTex.pop();

  skullTex.background(200);
  skullTex.reset();
  skullTex.camera(position.x, position.y, position.z,
                  center.x, center.y, center.z,
                  up.x, up.y, up.z);
  skullTex.push();
  skullTex.noStroke();
  skullTex.fill('yellow');
  skullTex.scale(1, -1);
  skullTex.scale(0.8);// only skull
  skullTex.model(skull);
  skullTex.pop();

  tieTex.background(200);
  tieTex.reset();
  tieTex.camera(position.x, position.y, position.z,
                  center.x, center.y, center.z,
                  up.x, up.y, up.z);
  tieTex.push();
  tieTex.noStroke();
  tieTex.fill('green');
  tieTex.scale(1, -1);
  tieTex.scale(0.8);// only tie
  tieTex.model(tie);
  tieTex.pop();
  // 3. main canvas
  background(0);
  push();
  // front (+z)
  stroke('blue');
  strokeWeight(5);
  texShader.setUniform('texture', trainTex);
  beginShape();
  vertex(-edge, -edge, +edge);
  vertex(+edge, -edge, +edge);
  vertex(+edge, +edge, +edge);
  vertex(-edge, +edge, +edge);
  endShape(CLOSE);
  // right (+x)
  texShader.setUniform('texture', foxTex);
  beginShape();
  vertex(+edge, -edge, +edge);
  vertex(+edge, -edge, -edge);
  vertex(+edge, +edge, -edge);
  vertex(+edge, +edge, +edge);
  endShape(CLOSE);
  // back (-z)
  texShader.setUniform('texture', dragonTex);
  beginShape();
  vertex(+edge, +edge, -edge);
  vertex(-edge, +edge, -edge);
  vertex(-edge, -edge, -edge);
  vertex(+edge, -edge, -edge);
  endShape(CLOSE);
  // left (-x)
  texShader.setUniform('texture', appleTex);
  beginShape();
  vertex(-edge, +edge, -edge);
  vertex(-edge, +edge, +edge);
  vertex(-edge, -edge, +edge);
  vertex(-edge, -edge, -edge);
  endShape(CLOSE);
  // up (+y)
  texShader.setUniform('texture', skullTex);
  beginShape();
  vertex(+edge, +edge, +edge);
  vertex(+edge, +edge, -edge);
  vertex(-edge, +edge, -edge);
  vertex(-edge, +edge, +edge);
  endShape(CLOSE);
  // down (-y)
  texShader.setUniform('texture', tieTex);
  beginShape();
  vertex(-edge, -edge, -edge);
  vertex(-edge, -edge, +edge);
  vertex(+edge, -edge, +edge);
  vertex(+edge, -edge, -edge);
  endShape(CLOSE);
  pop();
}