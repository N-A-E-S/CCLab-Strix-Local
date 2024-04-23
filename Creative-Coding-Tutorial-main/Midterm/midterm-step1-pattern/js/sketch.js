function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  translate(width / 2, height / 2);
  for (let r = 0; r < 6; r++) {
    for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + r * 3)) {
      fill(255);
      noStroke();
      let x1 = sin((PI / 2) * (r + 1) + i) * (40 + r * 20);
      let y1 = cos((PI / 2) * (r + 1) + i) * (40 + r * 20);
      circle(x1, y1, map(sin(i + PI / 2), -1, 1, 3, 6 + r * 3.5));
    }
  }
}

function draw() {}
