function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  drawDandFlower(6, width / 2, height / 2);
  drawDandFlower(3, width / 2 - 200, height / 2 + 80);
  drawDandFlower(4, width / 2 + 190, height / 2 + 100);
}

function drawDandFlower(layerNum, transX, transY) {
  push();
  translate(transX, transY);
  push();
  noFill();
  stroke(255, 100);
  strokeWeight(5);
  let x = map(sin(frameCount * 0.01), -1, 1, -60, 60);
  let y = map(cos(frameCount * 0.01), -1, 1, -10, 0);
  bezier(x, y, 0, 150, 0, 500, 0, 500);
  pop();
  for (let r = 0; r < layerNum; r++) {
    for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + r * 3)) {
      let x1 = x + sin((PI / 2) * (r + 1) + i) * (40 + r * 20);
      let y1 = y + cos((PI / 2) * (r + 1) + i) * (40 + r * 20);
      let distFromCentX = transX - width / 2;
      let distFromCentY = transY - height / 2;
      let dmouse = dist(
        x1 + width / 2 + distFromCentX,
        y1 + height / 2 + distFromCentY,
        mouseX,
        mouseY
      );

      if (dmouse <= 20) {
        y1 += map(dmouse, 0, 20, 10, 0);
        x1 += map(dmouse, 0, 20, 10, 0);
      }
      fill(255);
      stroke(255, 100);
      strokeWeight(map(sin(i + frameCount * 0.05), -1, 1, 0.01, 2));
      line(x1, y1, x, y);
      noStroke();
      circle(x1, y1, map(sin(i + frameCount * 0.05), -1, 1, 3, 6 + r * 3.5));
    }
  }
  circle(x, y, 30);
  pop();
}
