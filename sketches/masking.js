let img;

// Convolution matrices

let sharpenMatrix = [ [ -1, -1, -1 ] , 
                      [ -1,  9, -1 ] ,
                      [ -1, -1, -1 ] ];

function preload() {
    img = loadImage("content/docs/workshop/images/astronaut.jpg");
}

function setup() {
    createCanvas(img.width, img.height);
    pixelDensity(1);
}

function draw(){
    img.resize(450,450)
    img.loadPixels();

    for(let x = 0; x < img.width; x++){
        for(let y = 0; y < img.height; y++){

            let result = convolution(x, y, sharpenMatrix, 3, img);
            var loc = (x + y * img.width) * 4;
            pixels[loc    ] = result[0];
            pixels[loc + 1] = result[1];
            pixels[loc + 2] = result[2];
            pixels[loc + 3] = 255;
        }
    }
    updatePixels();

    stroke(0);
    noFill();
}

function convolution(x, y, matrix, matrixsize, img) {
    var rtotal = 0.0;
    var gtotal = 0.0;
    var btotal = 0.0;
    var offset = floor(matrixsize / 2);

    for (var i = 0; i < matrixsize; i++ ) {
        for (var j = 0; j < matrixsize; j++ ) {
        // What pixel are we testing
        var xloc = x + i-offset;
        var yloc = y + j-offset;
        var loc = (xloc + img.width * yloc) * 4;
        
        
        loc = constrain(loc, 0, img.pixels.length-1);

        // We sum all the neighboring pixels multiplied by the values in the convolution matrix.
        rtotal += img.pixels[loc    ] * matrix[i][j];
        gtotal += img.pixels[loc + 1] * matrix[i][j];
        btotal += img.pixels[loc + 2] * matrix[i][j];
        }
    }
    
    // Make sure RGB is within range
    rtotal = constrain(rtotal,0,255);
    gtotal = constrain(gtotal,0,255);
    btotal = constrain(btotal,0,255);
    
    // Return an array with the three color values
    return [rtotal,gtotal,btotal]; 
}