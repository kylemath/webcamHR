//Made by Misa Sivonen
let slider;

function setup() {
  createCanvas(1000, 800);
  drawBack();
  
  slider = createSlider(1,100,1,1);
  slider.position(10,10);
  slider.style('width', '80px');
  
}


function drawBack() {
   background(55);
   fill(77, 111, 33);
   noStroke();
}

function draw() {
  
  thisAngle = map(slider.value(),1,100,.5,10);
  thisBloom = map(slider.value(),1,100,10,1);
  thisHeight = map(slider.value(),1,100,50,200);

  drawBack();
  push();
  translate(0, height * 0.9);
  for (let i = 1; i < 2; i++) {
    translate(width/2, 0);
    push();
    branch(thisHeight);
    pop();
  }
  pop();

  
}

function branch(blength) {
  stroke(40, 30, 10);
  if (blength < 10) {
    stroke(0, 200, 0);
  }
  if (blength < 4) {
    stroke(random(155, 200), random(50, 140), 0);
  }  
  strokeWeight(blength / 14);
  ang = thisAngle; 
  line(0, 0, 0, -blength);
  translate (0, -blength);
  if (blength > thisBloom) {
    push();
    rotate(ang * 7 / blength);
    let multi = 0.6; 

    branch(blength * multi);
    pop();
    push();
    rotate(-ang * 7 / blength);
    multi = 0.7; 

    branch(blength * multi);
    pop();

  }
}

