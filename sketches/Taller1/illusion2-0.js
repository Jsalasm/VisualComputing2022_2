var redC = 253;
var greenC = 0;
var blueC = 238;
var xC = [0,0,0,0,0,0];
var yC =[0,0,0,0,0,0];

function drawCircle(){
  for(var i =0; i<6;i++){
    xC[i]=random(25,850)
    yC[i] = random(25,850) 
  }
}

function drawCircleInTime(){
  for(var i = 0;i>3;i++){
    circle(xC[i], yC[i],50) 
    console.log(xC[i]);
  }
}

function setup() {
  createCanvas(800, 800);
  setInterval(drawCircle,1000)
}

function draw() {
  background(180);
  fill(redC,greenC,blueC)
  noStroke();
  drawCircleInTime();
  circle(xC[0], yC[0],50) 
  circle(xC[1], yC[1],50) 
  circle(xC[2], yC[2],50)
  fill(2,255,27)
  circle(xC[3], yC[3],50) 
  circle(xC[4], yC[4],50) 
  circle(xC[5], yC[5],50)
  fill(140)
  circle(400, 400,50)
  
}