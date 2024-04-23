var currentSystem;
syslis = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
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
}
function draw() {
  background(0);
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
}

function drawGalaxy() {
  // 获取屏幕中心坐标
  let centerX = width / 2;
  let centerY = height / 2;
  // 绘制中央星团
  let gradient = drawingContext.createRadialGradient(
    width / 2, height / 2, 0, // 渐变中心坐标
    width / 2, height / 2, 80 // 渐变半径
  )
  gradient.addColorStop(0, 'rgb(200,200,200)') // 渐变起始颜色
  gradient.addColorStop(1, 'rgb(0,0,0)') // 渐变终止颜色
  drawingContext.fillStyle = gradient
  circle(centerX, centerY, 200)
  let gradient2 = drawingContext.createRadialGradient(
    width / 2, height / 2, 0, // 渐变中心坐标
    width / 2, height / 2, 30 // 渐变半径
  )
  gradient2.addColorStop(1, 'rgb(120,120,120)') // 渐变起始颜色
  gradient2.addColorStop(0, 'rgb(0,0,0)') // 渐变终止颜色
  drawingContext.fillStyle = gradient2
  //fill()
  circle(centerX, centerY, 60)
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
    for (let r = 0; r < 5; r++) {
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