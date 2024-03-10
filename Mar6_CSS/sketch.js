let mood;
let startAngle = 0; 
let inc = 0.1;
let offsetX, offsetY;
let positionX, positionY;
let speedX = 1;
let speedY = 1;
let itemX,itemY;
let radius;
let cellSize=1;
let lastTime = 0;
let genInterval = 1000;
let triX,triY;
let heart;
let fillcolor;
function preload(){
  heart = loadImage("heart.png")
}
function setup() {
  textFont('Courier New');
  createCanvas(800,800);
  offsetX = random(width);
  offsetY = random(height);
  positionX = random(2);
  positionY = random(2);
  itemX=-100;
  itemY=mouseY;
  //set obstacle positions
  triX =0;
  triY =0;
  mood = 100;
}

function draw() {
  background(219, 243, 255,20);
  noStroke();
 
  fill(219, 243, 255);
     rect(0,0,200,50);
        if(cellSize<0){
      background(0)
      fill(255)
      textSize(35)
      textAlign(CENTER)
     text("Please Feed Me With More Love :(",width/2,height/2)
        noLoop()
      
    }
//   //obstacles
  


  push()
  translate(offsetX, offsetY); 
  // let colorIndex = (mood,0,100,0,255)
  beginShape();
  stroke(0);
  strokeWeight(2);//cell wall
  let startColor = color(255, 18, 152);
  let endColor = color(0);
   fillColor = lerpColor(endColor,startColor, mood / 100);
  fill(fillColor);
  
  if (mood>0){
    // fill(255, 200-colorIndex,200-colorIndex);
  } else{
    speedX=0;
    speedY=0;
    if(cellSize>=0)
      {cellSize -=0.01}

  }
  
  scale(cellSize);
   radius = 50;
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let noiseVal = noise(cos(angle) * 0.5 + startAngle, sin(angle) * 0.5 + startAngle);
    //let noiseVal = cos(random(0,2*PI));
    let r = radius + map(noiseVal, 0, 1, -10,10);
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x, y);
    
    
    //circle(x,y,10);
    startAngle += inc;
  }
  endShape(CLOSE);
 
  offsetX += speedX * positionX;
  offsetY += speedY * positionY;

  if (offsetX < 0 || offsetX > width) {
    positionX *= -1;   
   
  }
  if (offsetY < 0 || offsetY > height) {
    positionY *= -1;
   
  }
  pop()
  if(mouseIsPressed){
    itemX=mouseX;
    itemY=mouseY;

  }
    fill(255,0,0);
    image(heart,itemX,itemY,35,30);
    if(offsetX>itemX-radius*cellSize && offsetX<itemX+radius*cellSize){
      if(offsetY>itemY-radius*cellSize && offsetY<itemY+radius*cellSize){
        console.log("Thank You For Your Love!")
        // cellSize+=0.1;
         speedX+=0.1;
         speedY+=0.1;
        mood+=15;
        itemX=-100
        itemY=-100
    }//noLoop()

    }
     
    fill(0);
  textSize(20)
    text("Current mood:",0,20)
    text(floor(mood),150,20)
    mood -=0.1
    if(cellSize>=0){
      cellSize=map(mood,0,100,0,1)
    }
    push()
  let currTime=millis();
  if (currTime - lastTime >= genInterval){
    let yPos =0;
    triX = random(width);
    triY = random(height);
    if (triX>0 && triX<width-100){
      if(triY>25&&triY<height){
        translate(triX,triY);
        for(let posX=30;posX<100;posX+=30){
          noStroke();
          fill(200,0,0);
            triangle(posX,yPos,posX+15,yPos-25,posX+30,yPos)
          
          }
        lastTime = currTime
        }
      }
    }
      if(offsetX>triX-radius*cellSize && offsetX<triX+radius*cellSize){
      if(offsetY>triY-radius*cellSize && offsetY<triY+radius*cellSize){
        //console.log(1)
        // cellSize+=0.1;
         speedX-=0.1;
         speedY-=0.1;
        mood-=30;
        triX=-100
        triY=-100
        
        console.log("Oh no! I'm hurt!")
    }//noLoop()

    }
   pop() 
}
function cell(cellSize){
//   push()
//   translate(offsetX, offsetY); 
  
//   beginShape();
//   stroke(0);
//   strokeWeight(2);//cell wall
//   fill(map(sin(radians(frameCount)), 0, 1, 0, 255), 100, 50,30);
//   scale(cellSize);
//    radius = 50;
//   for (let angle = 0; angle < TWO_PI; angle += 0.1) {
//     let noiseVal = noise(cos(angle) * 0.5 + startAngle, sin(angle) * 0.5 + startAngle);
//     //let noiseVal = cos(random(0,2*PI));
//     let r = radius + map(noiseVal, 0, 1, -10,10);
//     let x = r * cos(angle);
//     let y = r * sin(angle);
//     vertex(x, y);
    
    
//     //circle(x,y,10);
//     startAngle += inc;
//   }
//   endShape(CLOSE);

//   offsetX += speedX * positionX;
//   offsetY += speedY * positionY;

//   if (offsetX < 0 || offsetX > width) {
//     positionX *= -1;   
   
//   }
//   if (offsetY < 0 || offsetY > height) {
//     positionY *= -1;
   
//   }
//   pop()
}