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

const brightnessOptions = {
    "None": 0,
    "Luma Y` 601": 1,
    "Intensity": 2,
    "HSV value": 3,
    "HSL lightness": 4,
}

const radioButtonOptions = {
    "None": {"magnifierTool": false, "regionTool": false},
    "Zoom": {"magnifierTool": true, "regionTool": false},
    "Region": {"magnifierTool": false, "regionTool": true},
}


let img;
let maskShader;
let radioButton;
let brightnessSelection;
let inputFile;

function preload() {
    maskShader = readShader(
        '/VisualComputing2022_2/sketches/Taller3/ImageProcessing/mask.frag', 
        { varyings: Tree.texcoords2 }
    );

    img = loadImage('/VisualComputing2022_2/sketches/Taller3/ImageProcessing/nature1.jpg');
}

function setup() {
    // shaders require WEBGL mode to work
    createCanvas(700, 700, WEBGL);
    noStroke();

    textureMode(NORMAL);
    shader(maskShader);

    addUI();

    maskShader.setUniform('texture', img);
    maskShader.setUniform('mask', identityMatrix.flat());
    maskShader.setUniform("brightnessTool", 0);
    maskShader.setUniform("magnifierScale", 0.5);
    maskShader.setUniform("magnifierRadius", 100.0);
    maskShader.setUniform("magnifierTool", false);
    maskShader.setUniform("regionTool", false);
    
    emitTexOffset(maskShader, img, 'texOffset');
    emitResolution(maskShader, "resolution");
}

function draw() {
        
    quad(-width / 2,
         -height / 2,
         width / 2,
         -height / 2,
         width / 2,
         height / 2,
         -width / 2,
         height / 2
    );

    emitMousePosition(maskShader, "mouseCoords");
}

function addUI(){
    brightnessSelection = createSelect();
    brightnessSelection.position(10, 10);
    brightnessSelection.option('None');
    brightnessSelection.option('Luma Y` 601');
    brightnessSelection.option('Intensity');
    brightnessSelection.option('HSV value');
    brightnessSelection.option('HSL lightness');

    brightnessSelection.changed(() => {
        let option = brightnessOptions[brightnessSelection.value()];
        maskShader.setUniform("brightnessTool", option)
    });

    radioButton = createRadio();
    radioButton.position(10, 40);
    radioButton.option('None', 'None');
    radioButton.option('Zoom', 'Zoom');
    radioButton.option('Region', 'Region');
    radioButton.style('width', '70px');
    radioButton.style('color', 'white');
    radioButton.selected('None');

    radioButton.changed(() => {
        maskShader.setUniform("magnifierTool", radioButtonOptions[radioButton.value()].magnifierTool);
        maskShader.setUniform("regionTool", radioButtonOptions[radioButton.value()].regionTool);
    });

    inputFile = createFileInput(handleFile);
    inputFile.position(150, 10);
}

function handleFile(file) {
    if (file.type === 'image') {
        img = loadImage(file.data, () => {
            let aspectRatio = img.width / img.height;
            
            resizeCanvas(700, 700 / aspectRatio, WEBGL);
            img.resize(700, 700 / aspectRatio);

            maskShader.setUniform('texture', img);
        });
    } else {
        img = null;
    }
}

function keyPressed() {
    switch (key) {
        case '1':
            maskShader.setUniform('mask', identityMatrix.flat());
            break;
        case '2':
            maskShader.setUniform('mask', boxMatrix.flat());
            break;
        case '3':
            maskShader.setUniform('mask', sharpenMatrix.flat());
            break;
        case '4':
            maskShader.setUniform('mask', gaussianMatrix.flat());
            break;
        case '5':
            maskShader.setUniform('mask', ridgeDetectionMatrix.flat());
            break;
        case '6':
            maskShader.setUniform('mask', sobelMatrix.flat());
            break;
        default:
            maskShader.setUniform('mask', identityMatrix.flat());
            break;
    }
}
