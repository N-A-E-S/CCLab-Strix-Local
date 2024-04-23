let angle = 0;
let h = 50;
let x = 0;
let patternX = [];
let patternH = [];
let patternA = [];

function setup() {
  createCanvas(400, 400);
  background(0);
  // here we take Moon's in-class demo as the pattern
  for (let i = 0; i < 200; i++) {
    angle += 72 + 0.2;
    x += -1;
    h += 0.2;
    patternX.push(x);
    patternH.push(h);
    patternA.push(angle);
  }
}

function draw() {
  background(0);
  drawPattern();
  noStroke();
  fill(255, 0, 0);
  circle(frameCount * 2, height / 2, 100)
}

function drawPattern(){
  for(let i = 0; i < patternX.length; i ++){
    push();
    translate(width / 2, height / 2);
    rotate(radians(patternA[i]));
    //blendMode(ADD);
    noFill();
    stroke(255, 120, 10, 100);
    rect(patternX[i], 0, 120, patternH[i]);
    pop();
  }
    
}
