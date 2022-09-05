var redC = 253;
var greenC = 0;
var blueC = 238;
var xC = [0,0,0,0,0,0];
var yC =[0,0,0,0,0,0];

let button;
let valButton=0;
function drawCircle(){
  for(var i =0; i<6;i++){
    xC[i]=random(50,550)
    yC[i] = random(50,550) 
  }
}

function changeBG() {
  valButton += 1;
  if(valButton>2){
    valButton=0
  }
}

function setup() {
  createCanvas(600, 600);
  setInterval(drawCircle,1000)

  button = createButton('color');
  button.position(0, 0);
  button.mousePressed(changeBG);
}

function draw() {
  background(180);
  fill(100)
  circle(280, 280,50)

  noStroke();
  fill(redC,greenC,blueC)
  if(valButton==2){
    fill(255-redC,255-greenC,255-blueC)
  }
  circle(xC[0], yC[0],50) 
  circle(xC[1], yC[1],50) 
  circle(xC[2], yC[2],50)
  fill(255-redC,255-greenC,255-blueC)
  if(valButton==1){
    fill(redC,greenC,blueC)
  }
  circle(xC[3], yC[3],50) 
  circle(xC[4], yC[4],50) 
  circle(xC[5], yC[5],50)
}