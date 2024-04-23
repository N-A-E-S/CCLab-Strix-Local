let x = 0;
let y = 195;
let xSpd = 2;
let s = 1;
let offsetX = 0;
function setup() {
  createCanvas(400, 250);
  
}

function draw() {
  background(220);
  if(x >= width - 120 || x < 0){
    xSpd *=-1;
    s *= -1;
    if(s == -1){
      offsetX = -110;
    }else{
      offsetX = 0;
    }
  }
  // x+=xSpd;
  drawCar("grey", "🕵️‍");
  
}

// defining a function
function drawCar(carColor, driver){
  push()
  translate(x, y)
  scale(s,1)
  translate(offsetX, 0);
  // light
  fill("blue");
  ellipse(40, -40, 10, 20)
  
  // body
  fill(carColor);
  rect(30, -40, 40, 40);
  rect(0, 0, 120, 40);
  
  // window
  fill(198,238,255);
  rect(33, -37, 34, 37, 5);
  
  // driver
  textSize(30);
  
  text(driver, 35, -5);
  
  // decoration
  fill("red");
  rect(0, 20, 120, 5);
  fill("blue");
  rect(0, 25, 120, 5);


  // wheels
  fill(0);
  circle(25, 40, 30);
  circle(95, 40, 30);
  pop()
  
  
}


function keyPressed() {
  saveCanvas('Q3.2.1', 'jpg');
  // saveGif("Q5.1", 5);
}

