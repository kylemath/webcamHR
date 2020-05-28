let cam;
let g;
let w, h;
let allAvg = [];
let fft;
let dCount = 1;

function setup() {
	createCanvas(320, 480)
	pixelDensity(1)
	h = height/2;
	w = width;
	cam = createCapture(VIDEO)
	cam.size(w, h);
	cam.hide()
	g = createImage(w, h);
	g.loadPixels();
	background(0);
}

function draw() {


  cam.loadPixels();
  for (let i = 0; i < cam.pixels.length; i += 4) {
    g.pixels[i + 0] = 0;
    g.pixels[i + 1] = cam.pixels[i + 1];
    g.pixels[i + 2] = 0;
    g.pixels[i + 3] = 255;
  }
  g.updatePixels();
  image(cam, 0, 0, w, h);
    
  // cutout the center box and take average value  
  cutout = g.get(w/2-50, h/2-50, 100, 100);
  cutout.loadPixels();
  let sumG = 0;
  for (let i = 0; i < cutout.pixels.length; i += 4) {
  	sumG += (cutout.pixels[i + 0] + cutout.pixels[i + 1] + cutout.pixels[i + 2]);
  }
  avgG = sumG / cutout.pixels.length;
  allAvg.push(avgG);
  image(cutout, 0, 0);
  
  // print avg luminance as point on lower section
  stroke(255);
  print(avgG)
  plotPoint = map(avgG,25, 30, 240, 480);
  point(dCount,plotPoint);
  dCount += 1;
  if (dCount > 320) {
    dCount = 1;
    background(0);
  }
}
