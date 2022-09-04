// Image kernel matrices

// Matrix values taken from
// - https://sbme-tutorials.github.io/2018/cv/notes/4_week4.html
// - https://en.wikipedia.org/wiki/Kernel_%28image_processing%29


const identityMatrix = [[ 0, 0, 0 ],
                        [ 0, 1, 0 ],
                        [ 0, 0, 0 ]];

const boxMatrix = [[ 1/9, 1/9, 1/9 ],
                   [ 1/9, 1/9, 1/9 ],
                   [ 1/9, 1/9, 1/9 ]];

const sharpenMatrix = [[  0, -1,  0 ], 
                       [ -1,  5, -1 ],
                       [  0, -1,  0 ]];

const gaussianMatrix = [[ 1/16, 1/8, 1/16 ],
                        [ 1/8,  1/4, 1/8 ],
                        [ 1/16, 1/8, 1/16 ]];

const ridgeDetectionMatrix = [[ -1, -1, -1 ],
                              [ -1,  8, -1 ],
                              [ -1, -1, -1 ]];  

const sobelMatrix = [[ -1, -2, -1 ],
                     [  0,  0,  0 ],
                     [  1,  2,  1 ]];

const matrixSize = 3;

let img, file;

function preload() {
    file = loadImage("/VisualComputing2022_2/docs/workshop/images/astronaut.jpg");
    img = loadImage("/VisualComputing2022_2/docs/workshop/images/astronaut.jpg");
}

function setup() {
    createCanvas(500, 500);
    pixelDensity(1);

    img.resize(0,500);
    file.resize(0,500);
}

function draw(){
    image(img, 0, 0);
}

function convolution(x, y, kernel){
    let r = 0.0;
    let g = 0.0; 
    let b = 0.0;

    for(let i = 0; i < matrixSize; i++){
        for(let j = 0; j < matrixSize; j++){
            
            let index = ((x + i) + img.width * (y + j)) * 4;
            index = constrain(index, 0, img.pixels.length - 1);

            r += img.pixels[index] * kernel[i][j];
            g += img.pixels[index + 1] * kernel[i][j];
            b += img.pixels[index + 2] * kernel[i][j];
        }
    }

    return {
        r: constrain(r, 0, 255),
        g: constrain(g, 0, 255),
        b: constrain(b, 0, 255)
    }
}

function convolveImage(kernel){
    resetImage();
    img.loadPixels();

    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {

            let index = (x + y * img.width) * 4;
            let result = convolution(x, y, kernel);

            img.pixels[index] = result.r;
            img.pixels[index + 1] = result.g;
            img.pixels[index + 2] = result.b;
            img.pixels[index + 3] = alpha(color(result.r, result.g, result.b));
        }
    }

    stroke(300, 100, 80);
    img.updatePixels();
}

function resetImage(){
    img.copy(file, 0, 0, file.width, file.height, 0, 0, file.width, file.height);
}

function keyPressed() {
    switch (key) {
        case '1':
            convolveImage(identityMatrix);
            break;
        case '2':
            convolveImage(boxMatrix);
            break;
        case '3':
            convolveImage(sharpenMatrix);
            break;
        case '4':
            convolveImage(gaussianMatrix);
            break;
        case '5':
            convolveImage(ridgeDetectionMatrix);
            break;
        case '6':
            convolveImage(sobelMatrix);
            break;
    }
}