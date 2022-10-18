# Kernel de imagen

## 1. Introducción
En este parte del taller se busca aplicar distintos kernels de imagén junto con varias herramientas de luminosidad o brillo de imagén, partiendo de varios conceptos que serán detallados en el siguiente punto.

## 2. Revisión bibliográfica

## Convolución
Antes que nada, es necesario entender brevemente *¿Qué es una convolución?* aplicado al procesamiento de imágenes. 

La convolución dentro del procesamiento de imágenes, es el proceso de transformar una imagén aplicando unos valores de un kernel sobre cada píxel y sus vecinos locales.

Para realizar la convolución de una imagen, primero se multiplican los valores tanto del píxel seleccionado como los de sus vecinos locales por su respectivo valor de la matriz del kernel, y luego se realiza una sumatoria de cada uno de los valores obtenidos para así obtener el valor del píxel seleccionado.

De esta forma cada píxel toma un nuevo valor mediante la medida ponderada de los pixeles contiguos.

## Kernel
El kernel es una matriz {{< katex >}}M{\times}M{{< /katex >}} cuyos valores determinan la transformación que sufrirá la imagen original, ya sea para difuminar, detectar ejes o aumentar su nitidez.

Algunos kernels usados en este taller son:

* Identidad:

{{< katex display>}}

\begin{bmatrix}
0 & 0 & 0\\
0 & 1 & 0\\
0 & 0 & 0
\end{bmatrix}

{{< /katex >}}

* Desenfoque de caja:

{{< katex display>}}
\frac{1}{9}
\begin{bmatrix}
1 & 1 & 1\\
1 & 1 & 1\\
1 & 1 & 1
\end{bmatrix}

{{< /katex >}}

* Desenfoque gaussiano:

{{< katex display>}}
\frac{1}{16}
\begin{bmatrix}
1 & 2 & 1\\
2 & 4 & 2\\
1 & 2 & 1
\end{bmatrix}

{{< /katex >}}

* Enfoque o afilado (Sharpen)
{{< katex display>}}
\begin{bmatrix}
0 & -1 & 0\\
-1 & 5 & -1\\
0 & -1 & 0
\end{bmatrix}

{{< /katex >}}

{{< hint info >}}

**Ejemplo gŕafico -** Operación de convolución de una imagen con el kernel de Sharpen:
<img src="https://miro.medium.com/max/1400/1*O06nY1U7zoP4vE5AZEnxKA.gif" alt="Convolution" style="height: 300px; width:600px; margin: 30px auto; display: block;"/>

{{< /hint >}}

## Luminosidad

<img src="https://c1.staticflickr.com/1/805/39523785660_ed4b725d9f_c.jpg" alt="Luma" style="height: 350px; width:600px; margin: 30px auto; display: block;"/>

La luminosidad aplicada en este caso está asociada a una conversión del espacio de color RGB a un espacio de escala de grises aplicando métodos ponderados como también mediante la intensidad (método promedio), valor HSV y luminosidad HSL. Estos dos últimos transforman el espacio cartesiano RGB.

Se obtiene esta escala de grises debido a la luminancia, la cual representa el brillo de las componentes de blanco y negro, esta se crea a partir de las componentes del espacio RGB las cuales son multiplicadas independientemente por un valor especifico.

Dado que el ojo humano tiene un mayor sensibilidad a la luz verde, adquiere un mayor valor en la ponderación del luma (Y'), seguido del rojo y a su vez del azul.

{{< katex display>}}
Y_{601}^{'} = 0.2989 \cdot R + 0.5870 \cdot G + 0.1140 \cdot B
{{< /katex >}}
{{< katex display>}}
Y_{240}^{'} = 0.212 \cdot R + 0.701 \cdot G + 0.087 \cdot B
{{< /katex >}}
{{< katex display>}}
Y_{709}^{'} = 0.2126 \cdot R + 0.7152 \cdot G + 0.0.0722 \cdot B
{{< /katex >}}
{{< katex display>}}
Y_{2020}^{'} = 0.2627 \cdot R + 0.6780 \cdot G + 0.0593 \cdot B 
{{< /katex >}}

Por otra parte, los siguientes métodos no tienen en cuenta esta sensibilidad.

{{< hint info >}}
Nota: Se recomienda dividir por separado cada componente RGB con el fin de que no se sobrepase un valor de 255.
{{< /hint >}}

{{< katex display>}}
Intensity = \frac{1}{3}(R + G + B) = \frac{R}{3} + \frac{G}{3} + \frac{B}{3}
{{< /katex >}}
{{< katex display>}}
HSV-Value = max(R, G, B)
{{< /katex >}}
{{< katex display>}}
HSL-Lightness = \frac{1}{2}(max(R, G, B) + min(R, G, B))
{{< /katex >}}

# 3. Métodos

Para la realización de este tema hicimos uso de los conceptos anteriormente expuestos, de tal forma que se presenta una implementación del procesamiento de imágenes mediante la convolución con distintos valores del kernel para lograr diferentes efectos, como también del brillo de una imagen mediante distintos métodos de luminosidad monocromática.

# 4. Resultados

{{< details "Atajos de teclado" >}}

El manejo del kernel como del histograma se hace mediante teclado, mientras que para las herramientas de brillo es mediante el select y el slider.

| **Tecla** | **Descripción** |
| ----- | ----------- |
| `1`  | Imagen original |
| `2`  | Desenfoque de caja |
| `3`  | Enfoque o afilado (Sharpen) |
| `4`  | Desenfoque Gaussiano |
| `5`  | Detección de crestas (Ridges) |
| `6`  | Operador Sobel |
| `h`  | Mostrar u ocultar histograma|
{{< /details >}}

{{< p5-iframe sketch="/VisualComputing2022_2/sketches/masking.js" width="515" height="515" >}}

{{< details "Código" >}}

```js
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
```
{{< /details >}}


## Referencias
* [Código guía](https://editor.p5js.org/cassie/sketches/u2wNEyqgs)

* [Función de convolución](https://desktop.arcgis.com/es/arcmap/latest/manage-data/raster-and-images/convolution-function.htm#:~:text=La%20funci%C3%B3n%20de%20convoluci%C3%B3n%20realiza,realces%20basados%20en%20el%20kernel.)

* [Kernel](https://en.wikipedia.org/wiki/Kernel_%28image_processing%29)

* [Matrices para el kernel de una imagen](https://sbme-tutorials.github.io/2018/cv/notes/4_week4.html)

* [Convolución en imagenes](https://medium.com/@bdhuma/6-basic-things-to-know-about-convolution-daef5e1bc411#:~:text=In%20image%20processing%2C%20convolution%20is,effect%20of%20the%20convolution%20process.)

* [Kernels en el procesamiento de imágenes](https://nrsyed.com/2018/02/17/kernels-in-image-processing/)

* [Luminosidad](https://en.wikipedia.org/wiki/HSL_and_HSV#Lightness)

* [Conversión del espacio de colo](https://www.dynamsoft.com/blog/insights/image-processing/image-processing-101-color-space-conversion/)

* [Espacio de color HSV, HSL y RGB](https://www.davidsalomon.name/DC2advertis/AppendH.pdf)