let blendShader;
let brightness;
let color1, color2;
let radius;

const blendingMode = {
  "Multiply": 0,
  "Addition": 1,
  "Difference": 2,
  //"Divide": 3,
  "Darken": 3,
  "Lighten": 4,
}

// This values allow that the original colors (from color pickers) 
// to be unaffected from the color blending operation.
//
// These are the neutral elements of the operation.
const neutral = {
  "Multiply": [1.0, 1.0, 1.0, 1.0],
  "Addition": [0.0, 0.0, 0.0, 0.0],
  "Difference": [0.0, 0.0, 0.0, 0.0],
  //"Divide": [1.0, 1.0, 1.0, 1.0],
  "Darken": [1.0, 1.0, 1.0, 1.0],
  "Lighten": [0.0, 0.0, 0.0, 0.0],
}

let blendingModeSelection;

function preload() {
  blendShader = readShader(
    '/VisualComputing2022_2/sketches/Taller3/Coloring/colorBlend.frag', 
    { matrices: Tree.NONE, varyings: Tree.NONE }
  );
}

function setup() {
  createCanvas(500, 500, WEBGL);
  colorMode(RGB, 1);
  rectMode(RADIUS);
  radius = width / 5;
  noStroke();

  color1 = createColorPicker(color('#2a65b4'));
  color1.position(10, 10);
  color2 = createColorPicker(color('#cc0a30'));
  color2.position(width / 2 + 10, 10);

  brightness = createSlider(0, 1, 1, 0.05);
  brightness.position(width / 2 + 30, height / 2);
  brightness.style('width', '80px');

  shader(blendShader);

  blendingModeSelection = createSelect();
  blendingModeSelection.position(width / 2 - 90, height / 2);
  blendingModeSelection.option('Multiply');
  blendingModeSelection.option('Addition');
  blendingModeSelection.option('Difference');
  blendingModeSelection.option('Darken');
  blendingModeSelection.option('Lighten');

  blendingModeSelection.changed(() => {
      let option = blendingMode[blendingModeSelection.value()];
      blendShader.setUniform("blendTool", option)
  });

  
}

function draw() {
  let l = 0.8;
  let offset = (1 - l) / 2;
  let color1Color = color1.color();
  let color2Color = color2.color();
  background(0);

  let indentityColor = neutral[blendingModeSelection.value()];

  blendShader.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
  blendShader.setUniform('uMaterial2', indentityColor);
  blendShader.setUniform('brightness', 1.0);

  beginShape();
  vertex(-offset - l, +offset, 0);
  vertex(-offset, +offset, 0);
  vertex(-offset, +offset + l, 0);
  vertex(-offset - l, +offset + l, 0);
  endShape();

  blendShader.setUniform('uMaterial1', indentityColor);
  blendShader.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
  blendShader.setUniform('brightness', 1.0);
  
  beginShape();
  vertex(+offset, +offset, 0);
  vertex(+offset + l, +offset, 0);
  vertex(+offset + l, +offset + l, 0);
  vertex(+offset, +offset + l, 0);
  endShape();
  
  blendShader.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
  blendShader.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
  blendShader.setUniform('brightness', brightness.value());
  
  beginShape();
  vertex(-l / 2, -offset - l, 0);
  vertex(+l / 2, -offset - l, 0);
  vertex(+l / 2, -offset, 0);
  vertex(-l / 2, -offset, 0);
  endShape();
}