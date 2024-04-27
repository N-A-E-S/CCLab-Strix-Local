var currentSystem;
var curlayer = 0;
var height = 800;
var layerSwitchPause = 0;
var recentLayerSwitch = false;
let cam;
let angle = 0;
let keys = {};
syslis = [];
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  //ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 2000);
  while (syslis.length < 50) {
    let x = random(width);
    let y = random(height);
    if (dist(width / 2, height / 2, x, y) < 400 && dist(width / 2, height / 2, x, y) > 100) {
      avaliable = true;
      for (let i = 0; i < syslis.length; i++) {
        if (dist(syslis[i].x, syslis[i].y, x, y) < 30) {
          avaliable = false;
          break;
        }
      }
      if (avaliable) {
        syslis.push(new system(x, y));
      }
    }
  }
  for (i in syslis) {
    for (j in syslis) {
      if (i != j) {
        if (dist(syslis[i].x, syslis[i].y, syslis[j].x, syslis[j].y) < 150 && !syslis[i].road.includes(j) && !syslis[j].road.includes(i)) {
          syslis[i].road.push(j);
          syslis[j].road.push(i);
        }
      }
    }
  }
  currentSystem = syslis[0];
  currentSystem.current = true;
  cam = createCamera();
  cam.move(200, -100, 200); // 初始摄像机位置
}
function draw() {
  background(0);
  if (keyIsPressed) {
    if (key == 'm') {
      if (recentLayerSwitch == false) {
        recentLayerSwitch = true;
        curlayer++;
      }
    }
  }
  if (recentLayerSwitch == true) {
    layerSwitchPause++;
    //console.log(curlayer,recentLayerSwitch, layerSwitchPause)
  }
  if (layerSwitchPause > 20) {
    recentLayerSwitch = false;
    layerSwitchPause = 0;
  }
  if (curlayer > 2) {
    curlayer = 0;
  }
  if (curlayer == 0) {
    camera();
    translate(-width / 2, -height / 2)
    push();
    drawGalaxy();
    if (mouseIsPressed) {
      for (i in syslis) {
        if (syslis[i].state == 'selected') {
          if (currentSystem.road.includes(i) || currentSystem == syslis[i]) {
            jumpto(syslis[i]);
          }
        }
      }
    }
    pop()
  }
  else
    if (curlayer == 1) {
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
    }
}

function drawGalaxy() {
  // 获取屏幕中心坐标
  let centerX = width / 2;
  let centerY = height / 2;
  // 绘制中央星团
  let startcolor = color(255, 255, 255)
  let endcolor = color(0, 0, 0)
  for (let r = 80; r > 0; r--) {
    let c = lerpColor(startcolor, endcolor, r / (80));
    fill(c)
    ellipse(centerX, centerY, r * 2);
  }
  let startcolor2 = color(0, 0, 0)
  let endcolor2 = color(120, 120, 120)
  for (let r = 40; r > 0; r--) {
    let c = lerpColor(startcolor2, endcolor2, r / (40));
    fill(c)
    ellipse(centerX, centerY, r * 2);
  }
  // 绘制星系
  for (let i = 0; i < syslis.length; i++) {
    syslis[i].draw();
    syslis[i].update();
  }
}
class system {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 7;
    this.state = 'unselected';
    this.road = [];
    this.current = false;
  }

  draw() {
    if (this.state == 'selected') {
      fill(255);
      ellipse(this.x, this.y, 20);
      fill(0);
      ellipse(this.x, this.y, 15);
      for (i in this.road) {
        stroke(255);
        strokeWeight(1);
        line(this.x, this.y, syslis[this.road[i]].x, syslis[this.road[i]].y);
      }
    }
    if (this.current) {
      fill(255, 255, 0);
      ellipse(this.x, this.y, 20);
      fill(0);
      ellipse(this.x, this.y, 15);
    }
    let centerColor = color(200);
    let outerColor = color(0);
    for (let r = 3; r > 0; r--) {
      let c = lerpColor(centerColor, outerColor, r / (10));
      fill(c)
      //noFill();
      ellipse(this.x, this.y, r * 2);
      noStroke();
    }
  }
  update() {
    if (mouseX > this.x - 10 && mouseX < this.x + 10 && mouseY > this.y - 10 && mouseY < this.y + 10) {
      this.state = 'selected';
    }
    else {
      this.state = 'unselected';
    }
  }
}
function jumpto(destination) {
  currentSystem.current = false;
  currentSystem = destination;
  currentSystem.current = true;
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
  let numLines = 50;
  for (let i = -numLines; i < numLines; i++) {
    line(i * spacing, 0, -numLines * spacing, i * spacing, 0, numLines * spacing);
    line(-numLines * spacing, 0, i * spacing, numLines * spacing, 0, i * spacing);
  }
}

function drawSun(position, size) {
  push();
  translate(position.x, position.y, position.z);
  // 光晕
  noStroke();
  fill(255, 140, 0, 100);
  sphere(300 * size);
  // 太阳
  fill(255, 104, 0);
  sphere(150 * size);
  pop();
}