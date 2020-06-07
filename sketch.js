let faceapi;
let video;
let detections;
let allAvg = [];
let dCount = 1;
let trim = 20;

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}

function setup() {
    createCanvas(320, 480);
    pixelDensity(1);

    h = height/2;
    // load up your video
    video = createCapture(VIDEO);
    video.size(width, h);
    video.hide();
    // video.hide(); // Hide the video element, and just show the canvas
    faceapi = ml5.faceApi(video, detection_options, modelReady);
    textAlign(RIGHT);
    g = createImage(width, h);
    background(0);
}

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detect(gotResults)

}

function gotResults(err, result) {
    detections = result;
    image(video, 0,0, width, h)
    if (detections) {
        if (detections.length > 0) {
            // console.log(detections)
            drawBox(detections)
        }
    }
    faceapi.detect(gotResults)
}

function drawBox(detections){
    for(let i = 0; i < detections.length; i++){
        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x
        const y = alignedRect._box._y
        const boxWidth = alignedRect._box._width
        const boxHeight  = alignedRect._box._height
        
        noFill();
        stroke(161, 95, 251);
        strokeWeight(2);
        rect(x, y, boxWidth, boxHeight);
    
        // cutout the detected face box and take average value

        video.loadPixels();
        cutout = video.get(x+trim, y+trim, boxWidth-trim*2, boxHeight-trim*2);
        cutout.loadPixels();
        let sumPix = 0;
        for (let i = 0; i < cutout.pixels.length; i += 4) {
            sumPix += (cutout.pixels[i+0] + cutout.pixels[i+1] + cutout.pixels[i+2]);
        }
        avgPix = sumPix / cutout.pixels.length;
        console.log(avgPix)
        allAvg.push(avgPix);
        image(cutout, 0, 0);

        // print avg luminance as point on lower section
        stroke(255);
        plotPoint = map(avgPix, 50, 100, h, h*2);
        point(dCount, plotPoint);
        dCount += 1;
        if (dCount > width) {
            dCount = 1;
            background(0);
        }


    }
    
}
