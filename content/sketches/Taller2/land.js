let sizeLand = 10;
let depth = 400; 
let cam;
let overlap =500;
let water = 55;
let treeLine = -50;
let noiseDistance;
let terrainRange;
function preload(){
  
}
function setup() {
  let canv = createCanvas(700, 700, WEBGL);
  canv.mousePressed(setup);
  cam = createCamera();
  noLoop();
  noiseDistance =0.005;
  terrainRange = 100;
  seedRandom = random(0,10000)*10000
  draw();
}

function draw() {
  
  cam.camera(0,-100,-500,0,0,0,0,1,0);
  background(20,100,255);
  for(let x= -width/2-overlap; x <width/2+overlap; x+=sizeLand){
    for(let z= -depth/2-overlap; z< depth/2+overlap; z+=sizeLand){
      
      stroke(0)
      let y = noise(x*noiseDistance+seedRandom,z*noiseDistance+seedRandom)*terrainRange;
      fill(0,153,12)
      if(y<treeLine){
        fill(102,82,81);
      }
      if(y > water){
        fill(16,30,255);
        noStroke();
      }
      push();
      translate(x,y,z);
      box(sizeLand);
      translate(0,sizeLand*3,0)
      fill(102,82,81);
      box(sizeLand, sizeLand *5,sizeLand)
      pop();
    }
  }
}