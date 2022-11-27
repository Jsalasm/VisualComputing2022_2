let easycam;
let uvShader;
let opacity;

function preload() {
  // Define geometry in world space (i.e., matrices: Tree.pmvMatrix).
  // The projection and modelview matrices may be emitted separately
  // (i.e., matrices: Tree.pMatrix | Tree.mvMatrix), which actually
  // leads to the same gl_Position result.
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/VisualComputing2022_2/sketches/Taller3/Texturing/uv_alpha.frag',
              { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(500, 500, WEBGL);
  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation: [0, 0, 0, 1],  // quaternion
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  textureMode(NORMAL);
  opacity = createSlider(0, 1, 0.5, 0.01);
  opacity.position(10, 25);
  opacity.style('width', '280px');
}

function draw() {
  background(255);
  // reset shader so that the default shader is used to render the 3D scene
  resetShader();
  // world space scene
  axes();
  grid();
  push();
  translate(0, -70, 20);
  rotateY(0.5);
  fill(color(255, 0, 255, 125));
  cone(80, -80);
  pop();
  translate(50, 50, 25);
  fill(color(0, 255, 255, 125));
  for (let i = 0; i < 10; i ++) {
    ellipse(0, 0, 30, 150);
    rotate(PI/5);
  }
  // use custom shader
  shader(uvShader);
  uvShader.setUniform('opacity', opacity.value());
  beginHUD();
  noStroke();
  quad(0, 0, width, 0, width, height, 0, height);
  endHUD();
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}