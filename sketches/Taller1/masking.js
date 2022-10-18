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


// Luma Y' values for brightness

const y601 = [0.299, 0.587, 0.114];
const y240 = [0.212, 0.701, 0.087];
const y709 = [0.2126, 0.7152, 0.0722];
const y2020 = [0.2627, 0.6780, 0.0593];

let img, file, selection, slider, histogram = [], show = false;

function preload() {
    file = loadImage("/VisualComputing2022_2/docs/workshop/images/astronaut.jpg");
    img = loadImage("/VisualComputing2022_2/docs/workshop/images/astronaut.jpg");
}

function setup() {
    createCanvas(500, 500);
    pixelDensity(1);

    img.resize(0,500);
    file.resize(0,500);

    selection = createSelect();
    selection.position(10, 10);
    selection.option('Y601');
    selection.option('Y240');
    selection.option('Y709');
    selection.option('Y2020');
    selection.option('Intensity');
    selection.option('HSV value');
    selection.option('HSL lightness');

    selection.selected('Y709');
    selection.changed(selectedValue);

    slider = createSlider(0, 100, 0, 5);
    slider.position(10, 30);

    slider.changed(() => {
        switch (selection.value()) {
            case 'Intensity':
                lightnessControl();
                break;
            case 'HSV value':
                lightnessControl();
                break;
            case 'HSL lightness':
                lightnessControl();
                break;
            default:
                brightnessControl();
                break;
        }
    });
}

function draw(){
    image(img, 0, 0);
    if(show) showHistogram();
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
    showHistogram();
}

function resetImage(){
    img.copy(file, 0, 0, file.width, file.height, 0, 0, file.width, file.height);
    showHistogram();
}

function brightnessControl(luma = y709){
    resetImage();

    img.loadPixels();

    let percentage = slider.value() / 100;

    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {

            let index = (x + y * img.width) * 4;
            
            rValue = img.pixels[index] * luma[0] * percentage;
            gValue = img.pixels[index + 1] * luma[1] * percentage;
            bValue = img.pixels[index + 2] * luma[2] * percentage;

            let result = rValue + gValue + bValue;

            img.pixels[index] = constrain( result, 0, 255);
            img.pixels[index + 1] = constrain( result, 0, 255);
            img.pixels[index + 2] = constrain( result, 0, 255);
            img.pixels[index + 3] = alpha(color(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2]));
        }
    }

    img.updatePixels();
    showHistogram();
}

function selectedValue(){
    switch (selection.value()) {
        case 'Y601':
            slider.value(100);
            brightnessControl(y601);
            break;
        case 'Y240':
            slider.value(100);
            luma = y240;
            brightnessControl(y240);
            break;
        case 'Y709':
            slider.value(100);
            luma = y709;
            brightnessControl(y709);
            break;
        case 'Y2020':
            slider.value(100);
            luma = y2020;
            brightnessControl(y2020);
            break;
        default:
            slider.value(100);
            lightnessControl();
            break;
    }
}

function lightnessControl(){
    resetImage();
    img.loadPixels();

    let intensity = 0;
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
                
            let index = (x + y * img.width) * 4;
            
            if(selection.value() == 'Intensity'){
                intensity = img.pixels[index] / 3 + img.pixels[index + 1] / 3 + img.pixels[index + 2] / 3;
            }
            else if(selection.value() == 'HSV value'){
                intensity = max(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2]);
            }
            else{
                let aux = (max(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2]));
                let aux2 = (min(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2]));
                intensity = aux / 2 + aux2 / 2;
            }

            intensity *= slider.value() / 100;

            img.pixels[index] = intensity;
            img.pixels[index + 1] = intensity;
            img.pixels[index + 2] = intensity;
            //img.pixels[index + 3] = alpha(color(intensity, intensity, intensity));
        }
    }

    img.updatePixels();
    showHistogram();
}

function showHistogram(){

    noStroke();
    fill(255,204, 0);
    img.loadPixels();
    
    for(let i = 0; i < 256; i++){
        histogram[i] = 0;
    }

    for(let i = 0; i < img.pixels.length; i += 4){
        let r = img.pixels[i];
        let g = img.pixels[i + 1];
        let b = img.pixels[i + 2];

        let intensity = (r + g + b) / 3;
        histogram[intensity]++;
    }

    for(let i = 0; i < histogram.length; i++){                
        let x = map(i, 0, 255, 0, img.width);
        let y = constrain(histogram[i], 0, 400);
        rect(x, img.height, width / 256, -y);
    }
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
        case 'h':
            show = !show;
            break;
    }
}