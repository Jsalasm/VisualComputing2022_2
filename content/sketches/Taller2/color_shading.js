let quadrille;
let ROWS, COLS, LENGTH;
let x0, y0, x1, y1, x2, y2;
let v0Color, v1Color, v2Color;
let slider, colorPick = [6, 6, 23];

function setup(){
    createCanvas(500, 500);
    frameRate(10);
    slider = createSlider(5, 100, 25, 5);
    slider.position(25, 25);

    quadrille = createQuadrille(ROWS, COLS);

    v0Color = createColorPicker(color('#f6d265'));
    v1Color = createColorPicker(color('#2a65b4'));
    v2Color = createColorPicker(color('#cc0a30'));

    v0Color.position(180, 20);
    v1Color.position(240, 20);
    v2Color.position(300, 20);

    v0Color.input(() => { quadrille.colorizeTriangle(x0, y0, x1, y1, x2, y2, v0Color.color(), v1Color.color(), v2Color.color()) });
    v1Color.input(() => { quadrille.colorizeTriangle(x0, y0, x1, y1, x2, y2, v0Color.color(), v1Color.color(), v2Color.color()) });
    v2Color.input(() => { quadrille.colorizeTriangle(x0, y0, x1, y1, x2, y2, v0Color.color(), v1Color.color(), v2Color.color()) });

    quadrilleZoom();
    slider.changed(quadrilleZoom);

    randomTriangle();
}

function draw(){
    background('#060621');
    drawQuadrille(quadrille, { cellLength: LENGTH, outlineWeight: 0.5, outlineColor: color('green'), board: false });
    tri();
    setText();
    pickColor();
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

function setText(){

    fill(colorPick);
    rect(370, 12, 110, 25, 2)
    noStroke();

    fill(255);
    text(colorPick.toString(), width - 75, 30)
    textSize(16);
    textAlign(CENTER);
}

function pickColor(){
    let x = mouseX;
    let y = mouseY;

    let colCell = floor(x / LENGTH);
    let rowCell = floor(y / LENGTH);

    let cellInfo = quadrille.read(rowCell, colCell)

    cellInfo
    ? colorPick = ([cellInfo.levels[0], cellInfo.levels[1], cellInfo.levels[2]])
    : colorPick = [6, 6, 23];
}