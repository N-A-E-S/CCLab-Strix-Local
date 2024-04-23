let angle = 0;
let h = 50;
let x = 0;

let bg;

function setup() {
  createCanvas(400, 400);
  bg = createGraphics(400, 400);
  bg.background(0);
  
  // here we take Moon's in-class demo as the pattern
  for (let i = 0; i < 200; i++) {
    angle += 72 + 0.2;
    x += -1;
    h += 0.2;

    bg.push();
    bg.translate(width / 2, height / 2);
    bg.rotate(radians(angle));
    //blendMode(ADD);
    bg.noFill();
    bg.stroke(255, 120, 10, 100);
    bg.rect(x, 0, 120, h);
    bg.pop();
  }
}

function draw() {
  background(0);
  image(bg, 0, 0);
  background(0, 0);
  noStroke();
  fill(255, 0, 0);
  circle(frameCount * 2, height / 2, 100)
    
}
