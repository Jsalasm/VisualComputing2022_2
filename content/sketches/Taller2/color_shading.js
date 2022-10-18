let quadrille;
let ROWS, COLS, LENGTH;
let x0, y0, x1, y1, x2, y2;
let v0Color, v1Color, v2Color;
let slider, checkboxAntialiasing;

function setup(){
    createCanvas(500, 500);
    slider = createSlider(5, 100, 25, 5);
    slider.position(25, 25);

    quadrille = createQuadrille(ROWS, COLS);

    v0Color = createColorPicker(color('red'));
    v1Color = createColorPicker(color('blue'));
    v2Color = createColorPicker(color('green'));

    v0Color.position(200, 20);
    v1Color.position(260, 20);
    v2Color.position(320, 20);

    v0Color.input(() => { quadrille.colorizeTriangle(x0, y0, x1, y1, x2, y2, v0Color.color(), v1Color.color(), v2Color.color()) });
    v1Color.input(() => { quadrille.colorizeTriangle(x0, y0, x1, y1, x2, y2, v0Color.color(), v1Color.color(), v2Color.color()) });
    v2Color.input(() => { quadrille.colorizeTriangle(x0, y0, x1, y1, x2, y2, v0Color.color(), v1Color.color(), v2Color.color()) });

    quadrilleZoom();
    slider.changed(quadrilleZoom);

    checkboxAntialiasing = createCheckbox('Antialiasing', false);
    checkboxAntialiasing.position(380,15)
    checkboxAntialiasing.style('color', 'white')

    randomTriangle();
}

function draw(){
    background('#060621');
    drawQuadrille(quadrille, { cellLength: LENGTH, outlineWeight: 0.5, outlineColor: color('green'), board: false });
    tri();

    if(checkboxAntialiasing.checked()){
        colorizeTriangle();
    }
}

function randomTriangle(){
    x0 = int(random(0, ROWS));
    y0 = int(random(0, COLS));
    x1 = int(random(0, ROWS));
    y1 = int(random(0, COLS));
    x2 = int(random(0, ROWS));
    y2 = int(random(0, COLS));

    quadrille.clear();
    quadrille.colorizeTriangle(x0, y0, x1, y1, x2, y2, v0Color.color(), v1Color.color(), v2Color.color());
}

function keyPressed(){
    randomTriangle();
}

function tri() {
    push();
    stroke('cyan');
    strokeWeight(2);
    noFill();
    triangle(y0 * LENGTH + LENGTH / 2, 
             x0 * LENGTH + LENGTH / 2, 
             y1 * LENGTH + LENGTH / 2, 
             x1 * LENGTH + LENGTH / 2, 
             y2 * LENGTH + LENGTH / 2, 
             x2 * LENGTH + LENGTH / 2
    );
    pop();
}

function quadrilleZoom(){
    aux1 = ROWS;
    aux2 = COLS;

    COLS = slider.value();
    LENGTH = int(width / COLS);
    ROWS = int(height / LENGTH);

    quadrille = createQuadrille(COLS, ROWS);

    x0 = round(map(x0, 0, aux1, 0, ROWS));
    y0 = round(map(y0, 0, aux2, 0, COLS));
    x1 = round(map(x1, 0, aux1, 0, ROWS));
    y1 = round(map(y1, 0, aux2, 0, COLS));
    x2 = round(map(x2, 0, aux1, 0, ROWS));
    y2 = round(map(y2, 0, aux2, 0, COLS));

    quadrille.colorizeTriangle(x0, y0, x1, y1, x2, y2, v0Color.color(), v1Color.color(), v2Color.color());
}