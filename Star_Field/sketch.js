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
let shipX = 0;
let shipY = 0;
let shipZ = 0;
let prevMouseX, prevMouseY;
let modelRotationY = 0;
var cameraAngleX = 0;
var cameraAngleY = 0;
var camDistance = 300;
let featurelib = ['mountain', 'lake', 'forest', 'desert', 'volcano', 'ocean']
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
  img12 = loadImage('assest/texture/planet12.png');
  img13 = loadImage('assest/texture/planet13.png');
  img14 = loadImage('assest/texture/planet14.png');
  img15 = loadImage('assest/texture/planet15.png');
  img16 = loadImage('assest/texture/planet16.png');
  img17 = loadImage('assest/texture/planet17.png');
  img18 = loadImage('assest/texture/planet18.png');
  img19 = loadImage('assest/texture/planet19.png');
  img20 = loadImage('assest/texture/planet20.png');
  sysname = loadStrings('assest/sysname.txt');
  shipmodel = loadModel('assest/ISS-0-MODEL_export.obj');
  //console.log(sysname)
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
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
        syslis.push(new system(x, y, sysname[syslis.length]));
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
      let img = eval('img' + str(int(random(1, 21))));
      let rotateSpeed = random(0.001, 0.005);
      let size = random(0.5, 0.75) + j * 0.15;
      let np = new planet(planetPosition, size, img, rotateSpeed, 0);
      syslis[i].planetlist.push(np);
      featurenum = int(random(0, 6));
      for (let k = 0; k < featurenum; k++) {
        let feature = random(featurelib);
        np.feature.push(feature);
        let featurePosition = createVector(random(-4000, 4000), -5, random(-4000, 4000));
        np.featurePositions.push(featurePosition);
      }
    }
  }
  currentSystem = syslis[0];
  currentSystem.current = true;
  cam = createCamera();
  cam.move(200, -100, 200);
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  canvas.addEventListener('mousedown', function (event) {
    event.preventDefault();
  });
  document.addEventListener('wheel', function (event) {
    handleMouseWheel(event);
  });
  window.addEventListener("gamepadconnected", function (e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);
  });
}
div1 = createDiv();
div2 = createDiv(300, 50, 'infoDiv2', 300, 50);
div3 = createDiv(450, 50, 'infoDiv3', 300, 150);

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
    document.getElementById('infoDiv3').innerHTML = ' ';
    document.getElementById('infoDiv2').innerHTML = 'current system: ' + currentSystem.name;
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
      if (recentLayerSwitch == true) {
        camera(camX, camY, camZ, camlookX, camlookY, camlookZ, camdx, camdy, camdz);
        shipX = camX;
        shipY = camY;
        shipZ = camZ;
      }
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
      let gamepads = navigator.getGamepads(); // 获取所有连接的手柄
      if (gamepads[0]) {
        let pad = gamepads[0]; // 假设Xbox手柄是第一个连接的设备

        // 读取手柄的摇杆和按钮状态
        let leftX = pad.axes[0];
        let leftY = pad.axes[1];
        let rightX = pad.axes[2];
        let rightY = pad.axes[3];

        let buttonA = pad.buttons[0].pressed; // A按钮
        let buttonB = pad.buttons[1].pressed; // B按钮
        let buttonX = pad.buttons[2].pressed; // X按钮
        let buttonY = pad.buttons[3].pressed; // Y按钮
        if (leftX > 0.1 || leftX < -0.1 || leftY > 0.1 || leftY < -0.1) {
          // 使用手柄控制飞船移动
          if (leftY < -0.1) { // 向前
            shipZ -= 3 * cos(modelRotationY);
            shipX -= 3 * sin(modelRotationY);
          }
          if (leftY > 0.1) { // 向后
            shipZ += 3 * cos(modelRotationY);
            shipX += 3 * sin(modelRotationY);
          }
          if (leftX < -0.1) { // 左转
            modelRotationY += 0.02;
          }
          if (leftX > 0.1) { // 右转
            modelRotationY -= 0.02;
          }

          // 使用手柄控制飞船上下移动
          if (buttonB) { // 向上
            shipY -= 3;
          }
          if (buttonA) { // 向下
            shipY += 3;
          }
        }
        let rightpadX = pad.axes[2];
        let rightpadY = pad.axes[3];
        if (rightpadX > 0.1 || rightpadX < -0.1 || rightpadY > 0.1 || rightpadY < -0.1) {
          cameraAngleY += rightpadX * 0.1;
          cameraAngleX += rightpadY * 0.1;
        }
        let camX = shipX + camDistance * sin(cameraAngleY) * cos(cameraAngleX);
        let camY = shipY - camDistance * sin(cameraAngleX);
        let camZ = shipZ - camDistance * cos(cameraAngleY) * cos(cameraAngleX);
        cam.setPosition(camX, camY, camZ);
        cam.lookAt(shipX, shipY, shipZ);
      }
      ambientLight(200, 200, 180);
      let sunPosition = createVector(0, -200, 0);
      pointLight(255, 155, 0, sunPosition.x, sunPosition.y, sunPosition.z);
      drawGridFloor();
      noStroke();
      for (let i = 0; i < currentSystem.planetlist.length; i++) {
        currentSystem.planetlist[i].update();
        if (currentSystem.planetlist[i].state == 'selected') {
          curPlanet = currentSystem.planetlist[i];
          RomeIndex = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII'];
          let index = RomeIndex[i];
          document.getElementById('infoDiv').innerHTML = currentSystem.name + index + ' selected, press "m" to land on the planet or "n" to go back to the system view';
          for (let j = 0; j < currentSystem.planetlist.length; j++) {
            if (j != i) {
              currentSystem.planetlist[j].state = 'unselected';
            }
          }
          break;
        }
        else {
          document.getElementById('infoDiv').innerHTML = 'No planet selected, go closer to a planet to select it';
          document.getElementById('infoDiv3').innerHTML = 'Use "WASD" to move the ship and "Q" and "E" to rotate the ship. Press "Space" to move up and "Ctrl" to move down.';
        }
      }
      drawSun(sunPosition, currentSystem.solarsize);
      for (let i = 0; i < currentSystem.planetlist.length; i++) {
        currentSystem.planetlist[i].drawPlanet();
      }
      push();
      translate(shipX, shipY, shipZ);
      rotateY(modelRotationY);
      rotateX(PI);
      scale(0.5);
      stroke(150);
      updateCam();
      strokeWeight(0.05);
      fill(200);
      model(shipmodel);
      pop();

    }
    else
      if (curlayer == 2) {
        if (recentLayerSwitch == true) {
          shipX = 0
          shipY = -400;
          shipZ = 0;
        }
        push();
        translate(shipX, shipY, shipZ);
        // rotateY(modelRotationY);
        scale(5);
        rotateX(PI);
        stroke(150);
        strokeWeight(0.05);
        fill(200);
        model(shipmodel);
        pop();
        keyboardCamControl();
        if (recentLayerSwitch == true)
          camera(0, -400, 100, 0, 0, 0, 0, 1, 0);
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
          landingHeight = curPlanet.mapheight[0][0];
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
          if (shipY < -(landingHeight + 15)) {
            shipY += 3;
            cam.move(0, 3, 0);
          }
        }
        noStroke();
        noFill();
        curPlanet.drawFeatures();
      }
}
function handleMouseWheel(event) {
  let zoomSensitivity = 0.1;
  if (event.deltaY < 0) {
    camDistance -= zoomSensitivity * 100;
  } else {
    camDistance += zoomSensitivity * 100;
  }
  camDistance = constrain(camDistance, 100, 2000);
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
function keyboardCamControl() {
  let speed = 3;
  if (mouseIsPressed) {
    manualOrbitControl();
  }
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
function keyboadControl() {
  let speed = 3;
  if (keys['w']) {
    shipZ -= speed * cos(modelRotationY);
    shipX -= speed * sin(modelRotationY);
  }
  if (keys['s']) {
    shipZ += speed * cos(modelRotationY);
    shipX += speed * sin(modelRotationY);
  }
  if (keys['a']) {
    modelRotationY += 0.02;
  }
  if (keys['d']) {
    modelRotationY -= 0.02;
  }
  if (keys[' ']) {
    shipY -= speed;
  }
  if (keys['control']) {
    shipY += speed;
  }
}
function updateCam() {
  if (mouseIsPressed) {
    cameraAngleY += (mouseX - pmouseX) * 0.01;
    cameraAngleX += (mouseY - pmouseY) * 0.01;
  }
  let camX = shipX + camDistance * sin(cameraAngleY) * cos(cameraAngleX);
  let camY = shipY - camDistance * sin(cameraAngleX);
  let camZ = shipZ - camDistance * cos(cameraAngleY) * cos(cameraAngleX);
  cam.setPosition(camX, camY, camZ);
  cam.lookAt(shipX, shipY, shipZ);
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
  constructor(x, y, name, solarsize, planetlist) {
    this.x = x;
    this.y = y;
    this.size = 7;
    this.state = 'unselected';
    this.road = [];
    this.current = false;
    this.solarsize = solarsize;
    this.planetlist = planetlist;
    this.name = name;
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
  push();
  stroke(150);
  let spacing = 20;
  let numLines = 80;
  for (let i = -numLines; i < numLines; i++) {
    line(i * spacing, 0, -numLines * spacing, i * spacing, 0, numLines * spacing);
    line(-numLines * spacing, 0, i * spacing, numLines * spacing, 0, i * spacing);
  }
  pop();
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
    this.feature = [];
    this.featurePositions = [];
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
    if (dist(shipX, shipY, shipZ, this.position.x, this.position.y, this.position.z) < 300) {
      this.state = 'selected';
    }
    else {
      this.state = 'unselected';
    }
  }
  drawFeatures() {
    for (let i = 0; i < this.feature.length; i++) {
      push();
      let featureType = this.feature[i];
      let pos = this.featurePositions[i];
      translate(pos.x, pos.y, pos.z);
      switch (featureType) {
        case 'mountain':
          fill(150, 150, 150);
          push();
          translate(0, -200, 0);
          rotateX(PI);
          cone(100, 500);
          pop();
          break;
        case 'lake':
          fill(50, 50, 255);
          push();
          translate(0, -15, 0);
          rotateX(PI / 2);
          ellipse(0, 0, 200, 100);
          pop();
          break;
        case 'forest':
          fill(0, 128, 0);
          for (let j = 0; j < 10; j++) {
            push();
            translate(random(-30, 30), -40, random(-30, 30));
            rotateX(PI);
            cone(50, 30);
            pop();
          }
          break;
        case 'desert':
          fill(233, 221, 109);
          push();
          translate(0, -15, 0);
          rotateX(PI / 2);
          ellipse(0, 0, 40, 20);
          pop();
          break;
        case 'volcano':
          push();
          translate(0, -150, 0);
          rotateX(PI);
          fill(128, 0, 0);
          cone(150, 250);
          pop();
          break;
        case 'ocean':
          fill(0, 105, 148);
          push();
          translate(0, -15, 0);
          rotateX(PI / 2);
          ellipse(0, 0, 500, 250);
          pop();
          break;
      }
      pop();
    }
  }
}

// create an HTML element
function createDiv(posx = 50, posy = 50, id = 'infoDiv', width = 300, height = 200) {
  let div = document.createElement('div');
  document.body.appendChild(div);

  div.id = id;

  div.style.width = width + 'px';
  div.style.height = height + 'px';

  div.style.position = 'fixed';
  div.style.bottom = posx + 'px';
  div.style.right = posy + 'px';

  div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  //div.style.backgroundColor = 'yellow';
  div.style.color = 'white';
  div.style.padding = '10px';

  // add html text to the div
  div.innerHTML = 'Distance: 100m';
}
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


