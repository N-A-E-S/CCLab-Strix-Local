let colorStem = [
  [56, 130, 60], // green
  [250, 80, 80], //pink
  [120, 150, 190], //blue
];

let colorRange = [
  [
    [56, 142, 60],
    [255, 245, 157],
  ],
  [
    [255, 234, 221],
    [255, 102, 102],
  ],
  [
    [130, 170, 227],
    [234, 253, 252],
  ],
];

let layerNum = 5;
let seeds = [];
let cores = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  layerNum = floor(random(2, 6));
  for (let r = layerNum; r > 0; r--) {
    for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + r * 3)) {
      seeds.push(
        new Seed(
          width / 2,
          height / 2,
          r,
          i,
          random(0, 0.003),
          random(0.001, 0.002),
          1
        )
      );
    }
  }
  cores.push(new Core(width / 2, height / 2, layerNum, 1));
}

function draw() {
  background(0);
  drawStem(
    map(sin(frameCount * 0.01), -1, 1, -60, 60),
    map(cos(frameCount * 0.01), -1, 1, -10, 0),
    width / 2,
    height / 2,
    1
  );
  if (seeds.length == 0) {
    layerNum = 1;
    for (let r = layerNum; r > 0; r--) {
      for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + r * 3)) {
        seeds.push(
          new Seed(
            width / 2,
            height / 2,
            r,
            i,
            random(0, 0.003),
            random(0.001, 0.002),
            1
          )
        );
      }
    }
  }
  for (let i = 0; i < seeds.length; i++) {
    seeds[i].update();
    seeds[i].display();
    if (!seeds[i].ifFly) {
      seeds[i].lastCoreX = seeds[i].coreX;
      seeds[i].lastCoreY = seeds[i].coreY;
    }
    if (seeds[i].flyDone) {
      seeds.splice(i, 1);
    }
  }
  for (let i = 0; i < cores.length; i++) {
    cores[i].update();
    cores[i].display();
  }
}
function drawStem(x, y, transX, transY, colorIndex) {
  push();
  translate(transX, transY);
  strokeWeight(5);
  stroke(
    colorStem[colorIndex][0],
    colorStem[colorIndex][1],
    colorStem[colorIndex][2]
  );
  noFill();
  bezier(x, y, 0, 150, 0, 500, 0, 500);
  pop();
}

class Seed {
  constructor(x, y, layer, sdPos, dirx, diry, ci) {
    this.x = x;
    this.y = y;
    this.coreX = 0;
    this.coreY = 0;
    this.seedX = 0;
    this.seedY = 0;
    this.lastCoreX = 0;
    this.lastCoreY = 0;

    this.layerNum = layer;
    this.seedPos = sdPos;

    this.xSpd = 0;
    this.ySpd = 0;
    this.dirx = dirx;
    this.diry = diry;
    this.angle = 0;
    this.flyAngle = 0;

    this.dmouse = dist(
      this.x + this.seedX,
      this.y + this.seedY,
      mouseX,
      mouseY
    );
    this.hideX = 0;
    this.hideY = 0;
    this.ifFriend = false;
    this.ifClose = false;
    this.ifHovered = false;
    this.ifClicked = false;
    this.ifFly = false;
    this.flyDone = false;
    this.ifData = false;

    this.colorIndex = ci;
  }

  update() {
    this.dmouse = dist(
      this.x + this.seedX + this.coreX,
      this.y + this.seedY + this.coreY,
      mouseX,
      mouseY
    );
    this.checkFly();
    this.fly();
    if (this.ifFly) {
      this.seedX += this.xSpd;
      this.seedY += this.ySpd;
    } else {
      if (this.ifFriend) {
        this.checkHover();
      } else {
        this.checkHide();
      }
      this.coreX = map(sin(frameCount * 0.01), -1, 1, -60, 60);
      this.coreY = map(cos(frameCount * 0.01), -1, 1, -10, 0);
      this.seedX =
        sin((PI / 2) * (this.layerNum + 1) + this.seedPos) *
          (40 + this.layerNum * 20) +
        this.hideX;
      this.seedY =
        cos((PI / 2) * (this.layerNum + 1) + this.seedPos) *
          (40 + this.layerNum * 20) +
        this.hideY;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    this.drawSeedStem();
    this.drawSeed();
    pop();
  }

  drawSeed() {
    push();
    if (this.ifFly) {
      translate(this.lastCoreX + this.seedX, this.lastCoreY + this.seedY);
    } else {
      translate(this.coreX + this.seedX, this.coreY + this.seedY);
    }
    let fluct1 = sin((PI / 2) * (this.layerNum + 1) + this.seedPos);
    if (this.ifHovered) {
      push();
      noStroke();
      for (let i = 0; i < 100; i++) {
        fill(250, 30, 20, floor(map(i, 0, 99, 0, 5)));
        circle(0, 0, floor(i * 0.5 + this.layerNum));
        fill(250, 30, 20);
        circle(0, 0, 20);
      }
      pop();
    } else {
      push();
      this.assignColor(fluct1);
      noStroke();
      if (this.ifData) {
        push();
        fill(255, 255, 255, 60);
        circle(
          0,
          0,
          5 +
            map(
              sin(this.seedPos + frameCount * 0.05),
              -1,
              1,
              3,
              6 + this.layerNum * 3.5
            )
        );
        pop();
      }
      circle(
        0,
        0,
        map(
          sin(this.seedPos + frameCount * 0.05),
          -1,
          1,
          3,
          6 + this.layerNum * 3.5
        )
      );
      pop();
    }

    pop();
  }

  drawSeedStem() {
    if (this.seedX > 0) {
      this.angle = PI / 2 + atan(this.seedY / this.seedX);
    } else {
      this.angle = -PI / 2 + atan(this.seedY / this.seedX);
    }

    push();
    if (this.ifFly) {
      translate(this.lastCoreX + this.seedX, this.lastCoreY + this.seedY);
    } else {
      translate(this.coreX + this.seedX, this.coreY + this.seedY);
    }

    stroke(255, 100);
    strokeWeight(map(sin(this.seedPos + frameCount * 0.05), -1, 1, 0.01, 2));
    rotate(this.angle + this.flyAngle);
    if (this.ifFly) {
      line(
        0,
        0,
        0,
        this.lastCoreX,
        this.lastCoreY,
        this.seedX + this.lastCoreX,
        this.seedY + this.lastCoreY
      );
    } else {
      line(
        0,
        0,
        0,
        dist(
          this.coreX,
          this.coreY,
          this.seedX + this.coreX,
          this.seedY + this.coreY
        )
      );
    }
    pop();
  }

  assignColor(fluct) {
    fill(
      map(
        fluct,
        -1,
        1,
        colorRange[this.colorIndex][0][0],
        colorRange[this.colorIndex][1][0]
      ),
      map(
        fluct,
        -1,
        1,
        colorRange[this.colorIndex][0][1],
        colorRange[this.colorIndex][1][1]
      ),
      map(
        fluct,
        -1,
        1,
        colorRange[this.colorIndex][0][2],
        colorRange[this.colorIndex][1][2]
      )
    );
  }

  checkHide() {
    if (this.dmouse <= 20) {
      this.hide();
    } else {
      this.hideX = 0;
      this.hideY = 0;
    }
  }

  hide() {
    this.hideX = map(this.dmouse, 0, 20, 10, 0);
    this.hideY = map(this.dmouse, 0, 20, 10, 0);
  }

  checkHover() {
    if (this.dmouse <= 10) {
      this.hover();
    } else {
      this.ifHovered = false;
    }
  }

  hover() {
    this.ifHovered = true;
  }

  checkClick() {
    if (this.ifClicked) {
      if (this.dmouse <= 10) {
        if (this.ifData) {
          this.readText();
        } else {
          this.writeText();
        }
      }
    }
  }

  writeText() {
    this.ifData = true;
  }

  readText() {}

  checkFly() {
    if (
      this.layerNum == 5 &&
      this.seedPos + (2 * PI) / (11 + this.layerNum * 3) >= 2 * PI
    ) {
      //check the last seed of the 5th layer of dandelion
      if (this.ifData) {
        //if it contains data, then all the seeds of the dandelion contain data
        this.ifFly = true;
      }
    }
    if (
      this.x + this.seedX + this.lastCoreX > windowWidth ||
      this.x + this.seedX + this.lastCoreX < 0 ||
      this.y + this.seedY + this.lastCoreY > windowHeight ||
      this.y + this.seedY + this.lastCoreY < 0
    ) {
      this.flyDone = true;
    }
  }

  fly() {
    if (this.ifFly) {
      this.xSpd += random(-0.01, 0.01) + random(0, this.dirx);
      this.ySpd += random(-0.01, 0.01) - random(0, this.diry);
      this.flyAngle = map(
        noise(sin(frameCount * 0.01)),
        0,
        1,
        -PI / 30,
        PI / 30
      );
    }
  }
}

class Core {
  constructor(x, y, layerNum, ci) {
    this.x = x;
    this.y = y;
    this.layerNum = layerNum;
    this.coreX = 0;
    this.coreY = 0;

    this.dmouse = dist(
      this.x + this.seedX,
      this.y + this.seedY,
      mouseX,
      mouseY
    );
    this.ifFriend = false;
    this.ifHovered = false;
    this.ifClicked = false;

    this.colorIndex = ci;
  }

  display() {
    push();
    translate(this.x, this.y);
    this.drawCore();
    pop();
  }

  update() {
    this.dmouse = dist(
      this.x + this.coreX,
      this.y + this.coreY,
      mouseX,
      mouseY
    );
    if (this.ifFriend) {
      this.checkHover();
    }
    this.coreX = map(sin(frameCount * 0.01), -1, 1, -60, 60);
    this.coreY = map(cos(frameCount * 0.01), -1, 1, -10, 0);
  }
  drawCore() {
    push();
    noStroke();
    if (this.ifHovered) {
      for (let i = 0; i < 100; i++) {
        fill(250, 30, 20, floor(map(i, 0, 99, 0, 5)));
        circle(
          this.coreX,
          this.coreY,
          floor(i * 0.5 + map(this.layerNum, 1, 8, 30, 45))
        );
        fill(250, 30, 20);
      }
    } else {
      let fluct2 = sin(PI / 2 + frameCount * 0.01);
      this.assignColor(fluct2);
    }
    circle(this.coreX, this.coreY, map(this.layerNum, 1, 8, 30, 45));

    pop();
  }

  checkHover() {
    if (this.dmouse <= 20) {
      this.hover();
    } else {
      this.ifHovered = false;
    }
  }

  hover() {
    this.ifHovered = true;
  }

  assignColor(fluct) {
    fill(
      map(
        fluct,
        -1,
        1,
        colorRange[this.colorIndex][0][0],
        colorRange[this.colorIndex][1][0]
      ),
      map(
        fluct,
        -1,
        1,
        colorRange[this.colorIndex][0][1],
        colorRange[this.colorIndex][1][1]
      ),
      map(
        fluct,
        -1,
        1,
        colorRange[this.colorIndex][0][2],
        colorRange[this.colorIndex][1][2]
      )
    );
  }
}

//http://127.0.0.1:5501/B611/final-Dande-OOP/
function keyPressed() {
  if (keyCode == 38) {
    //ArrowUp
    for (let i = 0; i < seeds.length; i++) {
      seeds[i].ifFly = true;
    }
  }
  if (keyCode == 40) {
    //ArrowDown
  }
  if (keyCode == 70) {
    //f
    for (let i = 0; i < seeds.length; i++) {
      seeds[i].ifFriend = true;
    }
    for (let i = 0; i < cores.length; i++) {
      cores[i].ifFriend = true;
    }
  }
  if (keyCode == 68) {
    //d
    for (let i = 0; i < seeds.length; i++) {
      seeds[i].ifData = true;
    }
    for (let i = 0; i < cores.length; i++) {
      cores[i].ifData = true;
    }
  }
  if (keyCode == 66) {
    //b
    for (let i = 0; i < seeds.length; i++) {
      seeds[i].ifFriend = false;
      seeds[i].ifHovered = false;
      seeds[i].ifData = false;
    }
    for (let i = 0; i < cores.length; i++) {
      cores[i].ifFriend = false;
      cores[i].ifHovered = false;
      cores[i].ifData = false;
    }
  }
  if (key === "s") {
    saveGif("prince-1.1", 3);
  }
}

function mousePressed() {
  for (let i = 0; i < seeds.length; i++) {
    seeds[i].ifClicked = true;
  }
  for (let i = 0; i < cores.length; i++) {
    cores[i].ifClicked = true;
  }
}
