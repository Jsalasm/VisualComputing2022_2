let lumaShader;
let img;
let grey_scale;

function preload() {
  lumaShader = readShader('/VisualComputing2022_2/sketches/Taller3/Texturing/luma.frag',
                        { varyings: Tree.texcoords2 });
  // image source: https://t.ly/Dz8W
  img = loadImage('/VisualComputing2022_2/sketches/Taller3/Texturing/fire_breath.png');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  grey_scale = createCheckbox('luma', false);
  grey_scale.position(10, 10);
  grey_scale.style('color', 'white');
  grey_scale.input(() => lumaShader.setUniform('grey_scale',
                                                grey_scale.checked()));
  lumaShader.setUniform('texture', img);
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
}