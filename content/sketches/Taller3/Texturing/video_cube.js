let vid;
function preload() {
    vid = createVideo('/VisualComputing2022_2/sketches/Taller3/Texturing/dancing.mp4');
    vid.hide();
}

function setup() {
  createCanvas(500, 500, WEBGL);
  describe('spinning cube with a texture from an image');
}

function draw() {
  background(0);
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  //pass image as texture
  texture(vid);
  box(width / 2);
}

function mousePressed() {
    vid.loop();
}