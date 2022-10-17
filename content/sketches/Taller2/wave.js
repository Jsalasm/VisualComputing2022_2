let angle = 0;
let w = 24;
let ma = 0;
function setup() {
  createCanvas(400, 400, WEBGL);
  ma = atan(1/sqrt(2));
}

function draw() {
  background(0);
  ortho(-300,280,-300,1000,0,500)
  rotateX(-QUARTER_PI);
  rotateY(ma);
  //translate(width/2 , height/2)
  //rectMode(CENTER)
  
  //rotateX(angle * 0.25)
  
  let offset = 0;
  for(let j =0; j<height;j+=w){
    for(let i =0; i<width;i+=w){
      push()
      let a = angle + offset;
      let h = map(sin(a),-1,1,0,100);
      fill(255)
      translate(i - width/2,0,j-height/2)
      box(w-2,h,w-2)
      //rect(i- width/2 +w/2,0,w-2,h);
      
      pop()
    }
    offset+=0.1
  }
  angle +=0.1
}