function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  push();
  noFill();
  stroke(255, 100);
  strokeWeight(5);
  let x = map(sin(frameCount * 0.01), -1, 1, -60, 60);
  let y = map(cos(frameCount * 0.01), -1, 1, -10, 0);
  bezier(x, y, 0, 150, 0, 500, 0, 500);
  pop();

  for (let r = 0; r < 6; r++) {
    for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + r * 3)) {
      let x1 = x + sin((PI / 2) * (r + 1) + i) * (40 + r * 20);
      let y1 = y + cos((PI / 2) * (r + 1) + i) * (40 + r * 20);
      fill(255);
      stroke(255, 100);
      strokeWeight(map(sin(i + frameCount * 0.05), -1, 1, 0.01, 2));
      line(x1, y1, x, y);
      noStroke();

      circle(x1, y1, map(sin(i + frameCount * 0.05), -1, 1, 3, 6 + r * 3.5));
    }
  }
  circle(x, y, 30);
}
