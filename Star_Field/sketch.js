var currentSystem;
var curlayer = 0;
var height = 800;
var layerSwitchPause = 0;
var recentLayerSwitch = false;
let cam;
let angle = 0;
let keys = {};
syslis = [];
let camX = 0;
let camY = -200;
let camZ = 800;
let camlookX = 0;
let camlookY = 0;
let camlookZ = 0;
let camdx = 0;
let camdy = 1;
let camdz = 0;
let curPlanet;
//let div = document.getElementById('infoDiv');
function preload() {
  solarimg = loadImage('assest/texture/solar.png');
  img1 = loadImage('assest/texture/planet1.png');
  img2 = loadImage('assest/texture/planet2.png');
  img3 = loadImage('assest/texture/planet3.png');
  img4 = loadImage('assest/texture/planet4.png');
  img5 = loadImage('assest/texture/planet5.png');
  img6 = loadImage('assest/texture/planet6.png');
  img7 = loadImage('assest/texture/planet7.png');
  img8 = loadImage('assest/texture/planet8.png');
  img9 = loadImage('assest/texture/planet9.png');
  img10 = loadImage('assest/texture/planet10.png');
  img11 = loadImage('assest/texture/planet11.png');
}
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
  for (i in syslis) {
    syslis[i].solarsize = random(0.5, 1.5);
    syslis[i].planetlist = [];
    let planetnum = int(random(4, 7));
    let baseDistance = 200 + 300 * syslis[i].solarsize;
    let distanceIncrement = 250;
    for (let j = 0; j < planetnum; j++) {
      let radius = baseDistance + j * distanceIncrement + j * (10, 25);
      let angle = j * 2 * PI / planetnum + random(-PI / 4, PI / 4);
      let planetPosition = createVector(
        radius * cos(angle),
        random(-250, -150),
        radius * sin(angle)
      );
      let img = eval('img' + str(int(random(1, 12))));
      let rotateSpeed = random(0.001, 0.005);
      let size = random(0.5, 0.75) + j * 0.15;
      let np = new planet(planetPosition, size, img, rotateSpeed, 0);
      syslis[i].planetlist.push(np);
    }
    //syslis[i].planetlist[0].state = 'selected';
  }
  currentSystem = syslis[0];
  currentSystem.current = true;
  cam = createCamera();
  cam.move(200, -100, 200);
}
createDiv();
function draw() {
  background(0);
  if (keyIsPressed) {
    if (key == 'm') {
      if (recentLayerSwitch == false) {
        recentLayerSwitch = true;
        curlayer++;
      }
    }
    if (key == 'n') {
      if (recentLayerSwitch == false) {
        recentLayerSwitch = true;
        curlayer--;
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
  if (curlayer < 0) {
    curlayer = 0;
  }
  if (curlayer == 0) {
    document.getElementById('infoDiv').innerHTML = 'Select a system to travel to by clicking on it, press "m" to go into the system';
    camera(0, 0, 800, 0, 0, 0, 0, 1, 0);
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
      //document.getElementById('infoDiv').style.display = 'fixed';
      if (recentLayerSwitch == true)
        camera(camX, camY, camZ, camlookX, camlookY, camlookZ, camdx, camdy, camdz);
      else {
        camX = cam.eyeX;
        camY = cam.eyeY;
        camZ = cam.eyeZ;
        camlookX = cam.centerX;
        camlookY = cam.centerY;
        camlookZ = cam.centerZ;
        camdx = cam.upX;
        camdy = cam.upY;
        camdz = cam.upZ;
      }
      background(0);
      keyboadControl();
      ambientLight(200, 200, 180);
      let sunPosition = createVector(0, -200, 0);
      pointLight(255, 155, 0, sunPosition.x, sunPosition.y, sunPosition.z);
      drawGridFloor();
      for (let i = 0; i < currentSystem.planetlist.length; i++) {
        currentSystem.planetlist[i].update();
        if (currentSystem.planetlist[i].state == 'selected') {
          curPlanet = currentSystem.planetlist[i];
          document.getElementById('infoDiv').innerHTML = 'Planet ' + i + ' selected, press "m" to land on the planet or "n" to go back to the system view' + '/n' + 'Press "w" "a" "s" "d" "space" "ctrl" to move the camera';
          for (let j = 0; j < currentSystem.planetlist.length; j++) {
            if (j != i) {
              currentSystem.planetlist[j].state = 'unselected';
            }
          }
          break;
        }
        else {
          document.getElementById('infoDiv').innerHTML = 'No planet selected, go closer to a planet to select it';
        }
      }
      drawSun(sunPosition, currentSystem.solarsize);
      for (let i = 0; i < currentSystem.planetlist.length; i++) {
        currentSystem.planetlist[i].drawPlanet();
      }

    }
    else
      if (curlayer == 2) {
        //document.getElementById('infoDiv').style.display = 'fixed';
        keyboadControl();
        if (recentLayerSwitch == true)
          camera(0, -200, 800, 0, 0, 0, 0, 1, 0);
        if (curPlanet == undefined) {
          curlayer = 1;
        }
        else {
          if (curPlanet.mapheight.length == 0) {
            curPlanet.mapheight = Array.from({ length: 8000 }, () => Array(8000).fill(0));
            curPlanet.noisevals = Array.from({ length: 8000 }, () => Array(8000).fill(0));
            let scale = 0.05;
            for (let x = 0; x < 8000; x += 300) {
              for (let z = 0; z < 8000; z += 300) {
                let noiseVal = noise(x * scale, z * scale);
                curPlanet.noisevals[x][z] = noiseVal
                if (noiseVal > 0.8)
                  curPlanet.mapheight[x][z] = noiseVal * (300 + noiseVal * 15);
                if (0.6 < noiseVal < 0.8)
                  curPlanet.mapheight[x][z] = noiseVal * (150 + noiseVal * 7.5);
                if (0.3 < noiseVal < 0.6)
                  curPlanet.mapheight[x][z] = noiseVal * (50 - noiseVal * 3.5);
              }
            }
          }
          let step = 300;
          stroke(255);
          strokeWeight(0.3);
          noFill();
          texture(curPlanet.img);
          for (let x = -4000; x < 4000 - step; x += step) {
            for (let z = -4000; z < 4000 - step; z += step) {
              beginShape(TRIANGLES);
              let v1 = createVector(x, -curPlanet.mapheight[x + 4000][z + 4000], z);
              let v2 = createVector(x + step, -curPlanet.mapheight[x + 4000 + step][z + 4000], z);
              let v3 = createVector(x + step, -curPlanet.mapheight[x + 4000 + step][z + 4000 + step], z + step);
              let v4 = createVector(x, -curPlanet.mapheight[x + 4000][z + 4000 + step], z + step);
              vertex(v1.x, v1.y, v1.z);
              vertex(v2.x, v2.y, v2.z);
              vertex(v3.x, v3.y, v3.z);

              vertex(v1.x, v1.y, v1.z);
              vertex(v3.x, v3.y, v3.z);
              vertex(v4.x, v4.y, v4.z);
              endShape();
            }
          }
        }

      }
}
function displayPlanetInfo(info) {
  push();
  fill(255);
  textSize(16);
  textAlign(RIGHT, BOTTOM);
  text(info, width - 50, height - 50);
  pop();
}
function manualOrbitControl() {
  let dx = (pmouseX - mouseX) * 0.005;
  let dy = (pmouseY - mouseY) * -0.005;
  cam.pan(dx);
  cam.tilt(dy);
}
function keyboadControl() {
  if (mouseIsPressed) {
    //cam.setPosition(camX, camY, camZ);
    manualOrbitControl();
  }
  let speed = 10;
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
}
function drawGalaxy() {
  let centerX = width / 2;
  let centerY = height / 2;
  let centerZ = 0;
  let startcolor = color(255, 255, 255)
  let endcolor = color(0, 0, 0)
  for (let r = 80; r > 0; r--) {
    let c = lerpColor(startcolor, endcolor, r / (80));
    fill(c)
    push();
    translate(centerX, centerY, centerZ);
    ellipse(0, 0, r * 2);
    pop();
  }
  let startcolor2 = color(0, 0, 0)
  let endcolor2 = color(120, 120, 120)
  for (let r = 40; r > 0; r--) {
    let c = lerpColor(startcolor2, endcolor2, r / (40));
    fill(c);
    push();
    translate(centerX, centerY, centerZ + 5);
    ellipse(0, 0, r * 2);
    pop();
  }
  for (let i = 0; i < syslis.length; i++) {
    syslis[i].draw();
    syslis[i].update();
  }
}
class system {
  constructor(x, y, solarsize, planetlist) {
    this.x = x;
    this.y = y;
    this.size = 7;
    this.state = 'unselected';
    this.road = [];
    this.current = false;
    this.solarsize = solarsize;
    this.planetlist = planetlist;
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
  let numLines = 80;
  for (let i = -numLines; i < numLines; i++) {
    line(i * spacing, 0, -numLines * spacing, i * spacing, 0, numLines * spacing);
    line(-numLines * spacing, 0, i * spacing, numLines * spacing, 0, i * spacing);
  }
}

function drawSun(position, size) {
  push();
  texture(solarimg);
  translate(position.x, position.y, position.z);
  noStroke();
  sphere(150 * size);
  fill(255, 155, 0, 60);
  sphere(300 * size);
  pop();
}

class planet {
  constructor(position, size, img, rotateSpeed, angle = 0,) {
    this.position = position;
    this.size = size;
    this.img = img;
    this.angle = angle;
    this.rotateSpeed = rotateSpeed;
    this.state = 'unselected';
    this.mapheight = [];
    this.noisevals = [];
  }
  drawPlanet() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    ambientLight(50, 50, 50);
    rotateY(this.angle);
    noStroke()
    this.angle += this.rotateSpeed;
    texture(this.img);
    sphere(50 * this.size);
    if (this.state == 'selected') {
      fill(255, 255, 255, 30);
      sphere(60 * this.size);
    }
    pop();
  }
  update() {
    if (dist(cam.eyeX, cam.eyeY, cam.eyeZ, this.position.x, this.position.y, this.position.z) < 300) {
      this.state = 'selected';
    }
    else {
      this.state = 'unselected';
    }
  }
}

// create an HTML element
function createDiv() {
  let div = document.createElement('div');
  document.body.appendChild(div);

  div.id = 'infoDiv';

  div.style.width = '300px';
  div.style.height = '200px';

  div.style.position = 'fixed';
  div.style.bottom = '50px';
  div.style.right = '50px';

  div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  //div.style.backgroundColor = 'yellow';
  div.style.color = 'white';
  div.style.padding = '10px';

  // add html text to the div
  div.innerHTML = 'Distance: 100m';
}

let isShowing = true;
//function mousePressed() {
//document.getElementById('infoDiv').innerHTML = 'Yay!';
//let div = document.getElementById('infoDiv');
//div.innerHTML = 'Yay!';
//div.style.display = 'none';
//div.style.display = 'fixed';
//}
// select the div html element and update the div's text; use this in p5's draw()
/*
  documnet.getElementById('infoDiv').innerHTML = 'new value';
*/


