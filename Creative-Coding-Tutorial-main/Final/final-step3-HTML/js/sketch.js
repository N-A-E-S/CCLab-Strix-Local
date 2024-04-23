let colorStem = [
  [56, 130, 60], // green
  [250, 80, 80], //pink
  [120, 150, 190], //blue
];

let colorRange = [
  [
    [91, 179, 24],
    [244, 206, 10],
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
let canvas;
let currentLayer = 1;
let maxLayerNum = 2;

let seeds = [];
let cores = [];

let dataNum = 0;
let stopHover = false;
let achieveData =[];


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  
  for (let r = currentLayer; r > 0; r--) {
    for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + r * 3)) {
      seeds.push(
        new Seed(
          width / 2 - 100,
          height / 2,
          r,
          i,
          random(0, 0.003),
          random(0.001, 0.002),
          0
        )
      );
    }
  }
  cores.push(new Core(width / 2 - 100, height / 2, currentLayer, 0));
}

function draw() {
  background(0);
  drawStem(
    map(sin(frameCount * 0.01), -1, 1, -60, 60),
    map(cos(frameCount * 0.01), -1, 1, -10, 0),
    width / 2 - 100,
    height / 2,
    0
  );
  
  if (seeds.length == 0) {
    currentLayer = 1;
    dataNum = 0;
    for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + currentLayer * 3)) {
      seeds.push(
        new Seed(
          width / 2 - 100,
          height / 2,
          currentLayer,
          i,
          random(0, 0.003),
          random(0.001, 0.002),
          0
        )
      );
    }
  } else {
    for(let i = 0; i < seeds.length; i ++){
      dataNum += seeds[i].data.length;
      if (!stopHover) {
        if (seeds[i].isWriting || seeds[i].isReading) {
          stopHover = true;
          console.log("stop!");
        }
      } else {
        // console.log(document.getElementById("writeAreaContainer"));
        if (
          document.getElementById("writeAreaContainer") == null &&
          document.getElementById("readAreaContainer") == null
        ) {
          stopHover = false;
        }
        if (seeds[i].achievedData.length != 0) {
          achieveData.push(seeds[i].achievedData[0]);
          seeds[i].achievedData.splice(0, 1);
        }
      }
    }
    

    if(dataNum == seeds.length){
      if(currentLayer == maxLayerNum){
        for (let i = 0; i < seeds.length; i++) {
          seeds[i].ifFly = true;
        }
        
      } else{
        currentLayer ++;
        for (let i = 0; i < 2 * PI; i += (2 * PI) / (11 + currentLayer * 3)) {
          seeds.push(
            new Seed(
              width / 2 - 100,
              height / 2,
              currentLayer,
              i,
              random(0, 0.003),
              random(0.001, 0.002),
              0
            )
          );
        }
      }
    }
    dataNum= 0;
  }
  for (let i = 0; i < seeds.length; i++) {
    seeds[i].update(stopHover);
    seeds[i].display();
    if (!seeds[i].ifFly) {
      seeds[i].lastCoreX = seeds[i].coreX;
      seeds[i].lastCoreY = seeds[i].coreY;
      seeds[i].lastSeedX = seeds[i].seedX;
      seeds[i].lastSeedY = seeds[i].seedY;
    }
    if (seeds[i].flyDone) {
      seeds.splice(i, 1);
    }
  }
  for (let i = 0; i < cores.length; i++) {
    cores[i].update(stopHover, achieveData);
    cores[i].display();
  }
  achieveData = [];
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

//http://127.0.0.1:5501/B611/
function keyPressed() {
  if (keyCode == 38) {
    //ArrowUp
  }
  if (keyCode == 40) {
    //ArrowDown
  }
  // if (keyCode == 75) {
  //   //k
  //   for (let i = 0; i < seeds.length; i++) {
  //     seeds[i].ifFly = true;
  //   }
  // }
  if (keyCode == 70) {
    //f
    for (let i = 0; i < seeds.length; i++) {
      seeds[i].ifFriend = true;
    }
    for (let i = 0; i < cores.length; i++) {
      cores[i].ifFriend = true;
    }
  }
  
  if (keyCode == 66) {
    //b
    for (let i = 0; i < seeds.length; i++) {
      seeds[i].ifFriend = false;
      seeds[i].isHovering = false;
    }
    for (let i = 0; i < cores.length; i++) {
      cores[i].ifFriend = false;
      cores[i].isHovering = false;
    }
  }

}

function mousePressed() {
  for (let i = 0; i < seeds.length; i++) {
    if (seeds[i].isHovering && !seeds[i].isWriting) {
      seeds[i].ifClicked = true;
    }
  }
  for (let i = 0; i < cores.length; i++) {
    if (cores[i].isHovering && !cores[i].isReading) {
      cores[i].ifClicked = true;
    }
  }
}
