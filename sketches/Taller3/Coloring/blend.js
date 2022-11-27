let blendShader;
let color1, color2;
let radius;

function preload() {
  blendShader = readShader('/VisualComputing2022_2/sketches/Taller3/Coloring/blend.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(500, 500, WEBGL);
  colorMode(RGB, 1);
  radius = width / 5;
  noStroke();
  color1 = createColorPicker(color(0.8, 0.5, 0.3));
  color1.position(10, 10);
  color2 = createColorPicker(color(0.9, 0.1, 0.4));
  color2.position(width / 2 + 10, 10);
  shader(blendShader);
}

function draw() {
  let l = 0.8;
  let offset = (1 - l) / 2;
  let color1Color = color1.color();
  let color2Color = color2.color();
  background(0);
  blendShader.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
  blendShader.setUniform('uMaterial2', [1.0, 1.0, 1.0, 1.0]);
  beginShape();
  vertex(-offset - l, +offset, 0);
  vertex(-offset, +offset, 0);
  vertex(-offset, +offset + l, 0);
  vertex(-offset - l, +offset + l, 0);
  endShape();
  blendShader.setUniform('uMaterial1', [1.0, 1.0, 1.0, 1.0]);
  blendShader.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
  beginShape();
  vertex(+offset, +offset, 0);
  vertex(+offset + l, +offset, 0);
  vertex(+offset + l, +offset + l, 0);
  vertex(+offset, +offset + l, 0);
  endShape();
  blendShader.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
  blendShader.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
  beginShape();
  vertex(-l / 2, -offset - l, 0);
  vertex(+l / 2, -offset - l, 0);
  vertex(+l / 2, -offset, 0);
  vertex(-l / 2, -offset, 0);
  endShape();
}