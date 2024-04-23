// CCLab Mini Project - 9.R Particles Template

let NUM_OF_PARTICLES = 20; // Decide the initial number of particles.
let bullets = [];
let particles = [];
var total_points = 0;
fireBreak = false;
fireBreakTime = 0;
let yoff = 0.0;
function generateNoiseColor() {
  let r = noise(yoff) * 255;
  let g = noise(yoff + 5) * 255;
  let b = noise(yoff + 10) * 255;
  yoff += 0.005;
  return color(r, g, b);
}
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xspd = 0;
    this.yspd = 0;
    this.dir = 1;
  }
  display() {
    push();
    translate(this.x, this.y);
    scale(this.dir, 1);
    noStroke();
    rectMode(CENTER);
    fill(30);
    rect(-7.5, 0, 55, 50);
    rectMode(CORNER);
    fill(60);
    rect(-20, -10, 20, 30);
    rect(-20, -10, 25, 10);
    rect(-20, -10, 30, 5);
    rect(-50, -5, 15, 15);
    rect(-45, -15, 10, 15);
    rect(20, -5, 15, 15);
    rect(20, -15, 10, 15);
    rect(-35, -45, 5, 10)
    fill(65);
    rect(-30, -50, 55, 30);
    fill('gold');
    rect(-30, -20, 5, 5);
    rect(-25, -15, 5, 5);
    rect(-20, -10, 5, 5);
    rect(-15, -5, 5, 5);
    rect(-10, 0, 10, 5);
    rect(0, 5, 10, 5);
    rect(10, 10, 5, 5);
    rect(15, 15, 5, 5);
    rect(-50, 10, 15, 5);
    rect(20, 10, 15, 5);
    fill(0);
    rect(-5, 25, 5, 5);
    rect(0, 30, 5, 5);
    rect(-10, 30, 5, 5);
    rect(5, 35, 5, 20);
    rect(-15, 35, 5, 20);
    rect(10, 50, 40, 5);
    rect(-50, 50, 40, 5);
    rect(45, 40, 5, 10);
    rect(35, 35, 10, 5);
    rect(25, 30, 10, 5);
    rect(20, 25, 10, 5);
    rect(-50, 40, 5, 10);
    rect(-45, 35, 10, 5);
    rect(-40, 30, 10, 5);
    rect(-35, 25, 5, 5);
    rect(-35, -25, 5, 5);
    rect(-45, -20, 10, 5);
    rect(-50, -15, 5, 10);
    rect(-55, -5, 5, 20);
    rect(-50, 15, 15, 5);
    rect(-35, 0, 5, 15);
    rect(-40, 0, 5, 5);
    rect(-25, -20, 5, 5);
    rect(-20, -15, 30, 5);
    rect(10, -20, 20, 5);
    rect(30, -20, 5, 15);
    rect(35, -5, 5, 20);
    rect(20, 15, 15, 5);
    rect(15, 0, 5, 10);
    rect(20, 0, 5, 5);
    rect(-35, -50, 5, 5);
    rect(-30, -60, 5, 10);
    rect(-25, -65, 5, 5);
    rect(-20, -70, 15, 5);
    rect(-10, -75, 15, 5);
    rect(5, -70, 5, 5);
    rect(10, -65, 5, 5);
    rect(15, -60, 5, 5);
    rect(20, -55, 5, 10);
    fill(30);
    rect(10, 40, 35, 10);
    rect(10, 35, 25, 5);
    rect(10, 25, 10, 5);
    rect(-45, 40, 30, 10);
    rect(-35, 35, 20, 5);
    rect(-30, 25, 10, 5);
    rect(-40, -15, 5, 5);
    rect(20, -15, 5, 5);
    rect(-30, -50, 50, 5);
    rect(-25, -55, 45, 5);
    rect(-25, -60, 40, 5);
    rect(-20, -65, 30, 5);
    rect(-5, -70, 10, 5);
    fill(80);
    rect(-25, -60, 5, 5);
    rect(-20, -65, 10, 5);
    fill(60);
    rect(5, 30, 20, 5);
    rect(0, 25, 10, 5);
    rect(-30, 30, 20, 5);
    rect(-20, 25, 15, 5);
    rect(-20, -60, 5, 5);
    rect(-10, -65, 5, 5);
    rect(-5, -70, 5, 5);
    fill('gold');
    rect(-15, -45, 15, 5);
    rect(-10, -40, 15, 10);
    rect(-15, -30, 15, 5);
    rect(15, -45, 10, 5);
    rect(10, -40, 10, 10);
    rect(15, -30, 10, 5);
    pop();
  }
  update() {
    if (keyIsPressed) {
      switch (key) {
        case 'w':
          //if (this.y > 50) {
          this.yspd = -10
          break;
        //}
        case 's':
          this.yspd = 1;
          break;
        case 'a':
          this.xspd = -5;
          this.dir = -1;
          break;
        case 'd':
          this.xspd = 5;
          this.dir = 1;
          break;
      }
    }
    if (this.y >= 600 && !(keyIsPressed && key == 'w')) {
      this.yspd = 0;
      this.y = 600;
    }
    else {
      if (this.y < 600) {
        this.yspd += 1;
      }
    }
    if (this.x >= 0 && this.x <= width) {
      this.x += this.xspd;
      this.y += this.yspd;
    }
    this.xspd = 0;
  }
}

class bullet {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.xspd = 0;
    this.yspd = 0;
    this.color = color;
  }
  update() {
    this.x += this.xspd;
    this.y += this.yspd;
  }
  display() {
    push();
    translate(this.x, this.y);
    if (this.color == 'blue') {
      noStroke();
      fill(0, 0, 255);
      rect(0, 0, 10, 10);
      if (dist(this.x, this.y, this.startX, this.startY) > 60) {
        for (let i = 1; i <= 10; i++) {
          fill(i * 20, i * 20, 255)
          rect(-i * this.xspd * 0.8, -i * this.yspd * 0.8, 10 - 0.2 * i, 10 - 0.2 * i);
        }
      }
    }
    else {
      if (this.color == 'red') {
        noStroke();
        fill(255, 0, 0);
        rect(0, 0, 5, 5);
        if (dist(this.x, this.y, this.startX, this.startY) > 60) {
          for (let i = 1; i <= 10; i++) {
            fill(255, i * 20, i * 20)
            rect(-i * this.xspd * 0.8, -i * this.yspd * 0.8, 5 - 0.2 * i, 5 - 0.2 * i);
          }
        }
      }
    }
    pop();
  }
  hit_detection() {
    for (let i = 0; i < particles.length; i++) {
      if (dist(this.x, this.y, particles[i].x, particles[i].y) < particles[i].dia / 2) {
        point = particles[i].value;
        particles.splice(i, 1);
        i--;
        total_points += point;
      }
    }
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.xspd = random(0, 0.8);
    this.yspd = random(0.5, 2);
    this.dia = random(10, 30);
    this.dir = 1;
    this.value = int(map(this.dia, 10, 30, 0, 10));
  }

  // methods (functions): particle's behaviors
  update() {
    // (add) 
    this.x += this.xspd * this.dir;
    this.y += this.yspd;
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    noStroke();
    fill(generateNoiseColor());
    circle(0, 0, this.dia);
    pop();
  }
  applyWind() {
    if (mouseX < width / 2) {
      this.dir = 1;
    } else {
      this.dir = -1;
    }
  }
  stop() {
    if (this.y >= height - 10) {
      this.yspd = 0;
      this.xspd = 0;
    }
  }
}
function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("canvasWrapper");
  pl = new Player(width / 2, height / 2);
  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(-height, 0));
  }
}
function draw() {
  background(200);
  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.applyWind();
    p.stop();
    p.update();
    p.display();
    if (p.y >= height - 10) {
      particles.splice(i, 1);
      i--;
      p.y = random(-height, 0);
    }
  }
  if (particles.length == 0) {
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
      particles[i] = new Particle(random(width), random(-height, 0));
    }
  }
  if (mouseIsPressed && !fireBreak) {
    n_bullet = new bullet(pl.x, pl.y, 'blue');
    n_bullet.xspd = 10 * (mouseX - pl.x) / dist(pl.x, pl.y, mouseX, mouseY);
    n_bullet.yspd = 10 * (mouseY - pl.y) / dist(pl.x, pl.y, mouseX, mouseY);
    bullets.push(n_bullet);
    fireBreak = true;
  }
  if (keyIsPressed && key == ' ' && !fireBreak) {
    n_bullet = new bullet(pl.x, pl.y, 'red');
    n_bullet.xspd = 10 * (mouseX - pl.x) / dist(pl.x, pl.y, mouseX, mouseY);
    n_bullet.yspd = 10 * (mouseY - pl.y) / dist(pl.x, pl.y, mouseX, mouseY);
    bullets.push(n_bullet);
    spd = createVector(mouseX - pl.x, mouseY - pl.y).normalize().mult(10);
    spd.rotate(PI / 6);
    n_bullet2 = new bullet(pl.x, pl.y, 'red');
    n_bullet2.xspd = spd.x;
    n_bullet2.yspd = spd.y;
    bullets.push(n_bullet2);
    bullet3 = new bullet(pl.x, pl.y, 'red');
    spd.rotate(-PI / 3);
    bullet3.xspd = spd.x;
    bullet3.yspd = spd.y;
    bullets.push(bullet3);
    fireBreak = true;
  }
  if (fireBreak) {
    fireBreakTime++;
    if (fireBreakTime >= 20) {
      fireBreak = false;
      fireBreakTime = 0;
    }
  }
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
    bullets[i].display();
    if (bullets[i].x > width || bullets[i].x < 0 || bullets[i].y > height || bullets[i].y < 0) {
      bullets.splice(i, 1);
      i--;
    }
    else {
      bullets[i].hit_detection();
    }
  }
  pl.update();
  pl.display();
  text("Score: " + total_points, 10, 10);
}

