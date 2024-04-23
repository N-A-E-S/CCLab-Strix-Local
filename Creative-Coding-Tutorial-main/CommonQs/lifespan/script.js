let x = [];
let y = [];
let s = [];
let a = [];
let lifespan = [];
let n = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < n; i++) {
    x[i] = random(80+width / 3 * i,width / 3 * (i+1) - 80);
    y[i] = height / 2;
    s[i] = random(80, 100);
    a[i] = 255;
    lifespan[i] = 6;
    
  }
}

function draw() {
  background(0);
  if (x.length > 0) {
    for (let i = 0; i < x.length; i++) {
      drawFace(x[i], y[i], s[i], a[i]);
    }
  } else {
    for (let i = 0; i < n; i++) {
      x[i] = random(80+width / 3 * i,width / 3 * (i+1) - 80);
      y[i] = height / 2;
      a[i] = 255;
      lifespan[i] = 6;
      s[i] = random(80, 100);
    }
  }
}

function drawFace(x, y, s, a) {
  push();
  translate(x, y);
  //face
  fill(220, 80, 50, a);
  stroke(255);
  circle(0, 0, s);
  //eyes and mouth
  fill(255);
  circle(-s * 0.3, 0, s * 0.05);
  circle(s * 0.3, 0, s * 0.05);
  arc(0, 0, s * 0.3, s * 0.3, 0, PI);
  pop();
}

function checkIfAlive() {
  for (let i = 0; i < lifespan.length; i++) {
    if (lifespan[i] <= 0) {
      x.splice(i, 1);
      y.splice(i, 1);
      s.splice(i, 1);
      a.splice(i, 1);
      lifespan.splice(i, 1);
    }
  }
}

function attack() {
  for (let i = 0; i < x.length; i++) {
    if (dist(x[i], y[i], mouseX, mouseY) < s[i] - 10) {
      lifespan[i]--;
      a[i] = map(lifespan[i], 0, 6, 0, 255);
    }
  }
  checkIfAlive();
}

function mousePressed() {
  attack();
}
function keyPressed() {
  saveGif("mySketch", 5);
}
