let cam;
let angle = 0;
let keys = {};
let img;
let p = []

function preload() {
  solarimg = loadImage('solar.png');
  img = loadImage('planet3.png');
  img2 = loadImage('planet2.png');
  img3 = loadImage('planet4.png');
  img4 = loadImage('planet5.png');
  img5 = loadImage('planet6.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  cam.move(200, -100, 200);
  let planetPosition1 = createVector(500, -100, 500);
  let np = new planet(planetPosition1, 1, img, 0.001, 0);
  p.push(np);
  let planetPosition2 = createVector(400, -100, 400);
  let np2 = new planet(planetPosition2, 0.25, img2, 0.001, 0);
  p.push(np2);
  let planetPosition3 = createVector(400, -100, -200);
  let np3 = new planet(planetPosition3, 0.65, img3, 0.001, 0);
  p.push(np3);
  let planetPosition4 = createVector(-300, -100, 900);
  let np4 = new planet(planetPosition4, 0.75, img4, 0.001, 0);
  p.push(np4);
  let planetPosition5 = createVector(-1200, -100, -600);
  let np5 = new planet(planetPosition5, 2, img5, 0.005, 0);
  p.push(np5);
}

function draw() {
  background(0);
  if (mouseIsPressed) {
    orbitControl();
  }
  let speed = 5;
  if (keys['w']) {
    cam.move(0, 0, -speed);
  }
  if (keys['s']) {
    cam.move(0, 0, speed);
  }
  if (keys['a']) {
    cam.move(-speed, 0, 0);
  }
  if (keys['d']) {
    cam.move(speed, 0, 0);
  }
  if (keys[' ']) {
    cam.move(0, -speed, 0);
  }
  if (keys['control']) {
    cam.move(0, speed, 0);
  }
  ambientLight(100, 100, 100);
  let sunPosition = createVector(0, -200, 0);
  pointLight(255, 155, 0, sunPosition.x, sunPosition.y, sunPosition.z);
  drawGridFloor();
  drawSun(sunPosition, 1);
  for (let i = 0; i < p.length; i++) {
    p[i].drawPlanet();
  }
}

function keyPressed() {
  keys[key.toLowerCase()] = true;
}

function keyReleased() {
  keys[key.toLowerCase()] = false;
}

function drawGridFloor() {
  noStroke();
  stroke(150);
  let spacing = 20;
  let numLines = 150;
  for (let i = -numLines; i < numLines; i++) {
    line(i * spacing, 0, -numLines * spacing, i * spacing, 0, numLines * spacing);
    line(-numLines * spacing, 0, i * spacing, numLines * spacing, 0, i * spacing);
  }
}

function drawSun(position, size) {
  push();
  texture(solarimg);
  translate(position.x, position.y, position.z);
  noStroke();
  sphere(150 * size);
  fill(255, 155, 0, 10);
  sphere(300 * size);
  pop();
}
class planet {
  constructor(position, size, img, rotateSpeed, angle = 0,) {
    this.position = position;
    this.size = size;
    this.img = img;
    this.angle = angle;
    this.rotateSpeed = rotateSpeed;
    this.state = 'unselected';
  }
  drawPlanet() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    rotateY(this.angle);
    noStroke()
    this.angle += this.rotateSpeed;
    texture(this.img);
    sphere(50 * this.size);
    pop();
  }
}

