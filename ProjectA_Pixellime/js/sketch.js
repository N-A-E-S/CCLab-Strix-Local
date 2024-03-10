//Reference of background image: https://www.youtube.com/watch?v=MIq1QW0ycI8&t=247s
var img;
function preload() {
    print("lo123123ed");
    img = loadImage('img.png');
}
function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas")
}
class creature//class for the creature, pixel slime shape
{
    constructor(x, y, size, r, g, b, name) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.size = size;
        this.color = color;
        this.hp = 100;
        this.hunger = 100;
        this.name = name;
        this.lifetime = 0;
        this.speedx = 0;
        this.speedy = 0;
        this.jumpduration = 0;
        this.startheight = y;
        this.jump = false;
        this.jumpbreak = 0;
        this.jumpdirection = 0;
        this.jumpforceX = 0;
        this.jumpforceY = 0;
        this.reproductionbreak = 0;
        this.lately_reproduction = false;

    }
    display() {
        push();;
        translate(this.x, this.y);
        fill(0);
        noStroke();
        //text of name and hp
        text(this.name, -10, -50);
        fill('red');
        rect(-20, -40, this.hp * 0.4, 5);
        fill(0)
        //text("Hunger: "+this.hunger,0,-10);
        //border for the whole slime
        rectMode(CENTER);
        if (this.jumpdirection < 0)
            scale(1, 1);
        else
            scale(-1, 1);
        rect(0, 0, this.size * 75, this.size * 10);//bottom of the slime
        rect(-1.25, 7.5, this.size * 72.5, this.size * 5);
        rect(-2.5, 11.25, this.size * 70, this.size * 2.5);
        rect(-2.5, 13.75, this.size * 65, this.size * 2.5);
        rect(-2.5, 16.25, this.size * 55, this.size * 2.5);
        rect(0, -7.5, this.size * 70, this.size * 5);//top of the slime
        rect(0, -12.5, this.size * 65, this.size * 5);
        rect(0, -17.5, this.size * 55, this.size * 5);
        rect(0, -20, this.size * 50, this.size * 2.5);
        rect(0, -22.5, this.size * 45, this.size * 2.5);
        rect(0, -25, this.size * 35, this.size * 2.5);
        rect(-2.5, -27.5, this.size * 22.5, this.size * 2.5);
        //body
        fill(this.r, this.g, this.b);
        scale(0.95);
        noStroke();
        rect(0, 0, this.size * 75, this.size * 10.5);//bottom of the slime
        rect(-1.25, 7.5, this.size * 72.5, this.size * 6);
        rect(-2.5, 11.25, this.size * 70, this.size * 3);
        rect(-2.5, 13.75, this.size * 65, this.size * 3);
        rect(-2.5, 16.25, this.size * 55, this.size * 3);
        rect(0, -7.5, this.size * 70, this.size * 5.75);//top of the slime
        rect(0, -12.5, this.size * 65, this.size * 5.75);
        rect(0, -17.5, this.size * 55, this.size * 5.75);
        rect(0, -20, this.size * 50, this.size * 3.25);
        rect(0, -22.5, this.size * 45, this.size * 3.25);
        rect(0, -25, this.size * 35, this.size * 3.25);
        rect(-2.5, -27.5, this.size * 22.5, this.size * 2.5);
        //eyes
        fill("white");
        rect(-15, -10, this.size * 5, this.size * 10);
        rect(10.5, -10, this.size * 10, this.size * 10);
        //outline for the lefteyes
        fill("black");
        rect(-18.75, -10, this.size * 2.5, this.size * 10);
        rect(-15, -3.75, this.size * 5, this.size * 2.5);
        rect(-15, -16.25, this.size * 5, this.size * 2.5);
        rect(-11.25, -10, this.size * 2.5, this.size * 15);
        //outline for the righteyes
        rect(4.25, -10, this.size * 2.5, this.size * 10)
        rect(10.5, -3.75, this.size * 10, this.size * 2.5);
        rect(10.5, -16.25, this.size * 10, this.size * 2.5);
        rect(16.75, -10, this.size * 2.5, this.size * 10);
        //mouth, "W" shape
        fill(this.r - 30, this.g - 30, this.b - 30);
        rect(-5, 5, this.size * 15, this.size * 2.5);
        fill(10);
        rect(-5, 5, this.size * 10, this.size * 2.5);
        rect(-11.25, 2.5, this.size * 2.5, this.size * 2.5);
        rect(1.25, 2.5, this.size * 2.5, this.size * 2.5);
        rect(-5, 2.5, this.size * 2.5, this.size * 2.5);
        pop();
    }
    move()//update the position of the slime
    {
        if (this.y < 250 || this.jump == true)
            this.y += 3 + this.jumpduration * 2;
        if (this.y + this.speedy < 500 && this.y + this.speedy > 0 && this.x + this.speedx < 800 && this.x + this.speedx > 0) {
            this.x += this.speedx;
            this.y += this.speedy;
        }
    }
    step()//jumping function
    {
        if (this.jump == true) {
            this.jumpduration++;

            if (this.jumpdirection < 0) {
                if (this.speedx > -5)
                    this.speedx -= this.jumpforceX;
                this.speedy = this.jumpforceY;
            }
            if (this.jumpdirection > 0) {
                if (this.speedx < 5)
                    this.speedx += this.jumpforceX;
                this.speedy = this.jumpforceY;
            }
            if (this.jumpduration > 1 && this.y >= this.startheight) {
                this.jump = false;
                this.jumpduration = 0;
                this.speedy = 0;
                this.speedx = 0;
                this.y = this.startheight;
            }
        }
    }
    print() {
        console.log(this.name)
    }
}
alllife = []
deployBreak = 0;
newdeploy = false
var alphabet = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')//alphabet for name generate
function name(len, inhen = null) {

    let name = ''
    if (inhen == null)
        for (i = 0; i < len; i++) {
            let w = int(random(1, 52))
            name += alphabet[w]
        }
    else {
        name += inhen
        for (i = 0; i < len; i++) {
            let w = int(random(1, 52))
            name += alphabet[w]
        }
    }
    return name
}
function findCloseSlimes() {
    let closeSlimes = [];
    for (let i = 0; i < alllife.length; i++) {
        for (let j = i + 1; j < alllife.length; j++) {
            let distance = dist(alllife[i].x, alllife[i].y, alllife[j].x, alllife[j].y);
            if (distance < 50) {
                closeSlimes.push(alllife[i]);
                closeSlimes.push(alllife[j]);
            }
        }
    }
    return closeSlimes;
}


function draw() {
    background(255);
    imageMode(CENTER);
    image(img, 400, 250, 800, 500);
    textSize(20);
    fill(0);
    text("Press b to create a slime", 15, 30);
    text("Remember: the more slimes you have, the faster they die", 15, 50)
    text("New slimes will inherit the name and color from both of their parents", 15, 70);
    text("current slimes: " + alllife.length, 15, 90);
    if (keyIsPressed === true)
        if (key == 'b' && newdeploy == false) {
            r = random(255);
            g = random(255);
            b = random(255);
            let new_name = name(3, null)
            console.log(new_name)
            alllife.push(new creature(mouseX, mouseY, 1, r, g, b, new_name));
            newdeploy = true;
        }
    if (newdeploy == true) {
        deployBreak++;
    }
    if (deployBreak > 50) {
        newdeploy = false;
        deployBreak = 0;
    }
    for (var i = 0; i < alllife.length; i++) {
        alllife[i].display();
        alllife[i].lifetime++;
        alllife[i].hp -= 0.05 + alllife.length * 0.001;
        alllife[i].hunger -= 0.05;
        alllife[i].move();
        alllife[i].step();
        if (alllife[i].jump == false) {
            alllife[i].jumpbreak++;
        }
        if (alllife[i].jumpbreak > 200) {
            alllife[i].jump = true;
            alllife[i].jumpdirection = random(-1, 1);
            alllife[i].jumpforceX = random(0.5, 1.5);
            alllife[i].jumpforceY = random(-20, -15);
            alllife[i].startheight = alllife[i].y;
            alllife[i].jumpbreak = 0;
        }
        if (alllife[i].lately_reproduction == true) {
            alllife[i].reproductionbreak++;
        }
        if (alllife[i].reproductionbreak > 400) {
            alllife[i].lately_reproduction = false;
            alllife[i].reproductionbreak = 0;
        }
        if (alllife[i].hp <= 0) {
            alllife.splice(i, 1);
        }
    }
    let closeSlimes = findCloseSlimes();
    for (let i = 0; i < closeSlimes.length; i += 2) {
        if (closeSlimes[i].lately_reproduction == false && closeSlimes[i + 1].lately_reproduction == false && closeSlimes[i].lifetime > 600 && closeSlimes[i + 1].lifetime > 600) {
            let new_name = name(2, closeSlimes[i].name[0] + closeSlimes[i + 1].name[0] + '.')
            alllife.push(new creature((closeSlimes[i].x + closeSlimes[i + 1].x) / 2, closeSlimes[i].y, 1, closeSlimes[i].r, closeSlimes[i + 1].g, (closeSlimes[i].b + closeSlimes[i + 1].b) / 2, new_name));
            closeSlimes[i].lately_reproduction = true;
            closeSlimes[i + 1].lately_reproduction = true;
        }
    }

}