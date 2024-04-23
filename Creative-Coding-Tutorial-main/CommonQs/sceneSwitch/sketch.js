function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(230);
  // By defalt, the blendmode is "BLEND". Let's draw a normal rectangle
  noStroke();
  fill(255, 0, 0); // red color 
  rect(50, 50, 100, 100);
  
  // Set blendMode to "DIFFERENCE" for the triangle
  push();
  fill(255, 0, 0); // still apply red color
  blendMode(DIFFERENCE);
  beginShape();
  vertex(150, height / 2);
  vertex(250, height / 2);
  vertex(200, 280);
  endShape(CLOSE);
  
  // Unmute this to apply "ADD" blendMode to the circle
  // blendMode(ADD); 
  circle(width / 2, height / 2, 100)
  pop();
  
  // Here we reset the blendMode to "BLEND" for all the shapes drawn below
  blendMode(BLEND);
  
  // Draw other shapes with normal blend mode
  fill(255, 0, 0); // again apply red color
  ellipse(300, 300, 100, 120);
}
