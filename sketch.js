var picture;
var canvasWidth;
var canvasHeight;
var cellSize = 8;
var started = false;

function setup() 
{
    console.log('🔨 setup()')
    //Create canvas and bind it to pre-made HTML div.
    let canvasHolder = select('#canvas-holder');
    canvas = createCanvas(canvasHolder.width,canvasHolder.height);  
    canvas.id('canvas');
    canvas.parent('canvas-holder');
    noLoop();
}

function draw()
{
    console.log('✏️ draw()')
    if(started)
    {   
        console.log(refImage);
        drawRefImage();
        generate();
        started = false;
    }
}

function start()
{
    console.log('🚀 start()')
    resizing();

    picture = new Picture(refImage,cellSize)
    picture.gridCreate();  //Divide picture size by cellSize and make a 2D-Array which will hold all color-values.
    started = true;
    draw();
}

function resizing()
{
    console.log('📐 resizing()');
    let canvasHolder = document.getElementById('canvas-holder');
    canvasWidth = refImage.width;
    canvasHeight = refImage.height;
    resizeCanvas(canvasWidth, canvasHeight);
    //canvasHolder.width = canvasWidth;
    //canvasHolder.height = canvasHeight;

}

function generate()
{
    console.log('🌱 generate()')
    picture.extractRgba(); //Substract Colors from Source Image, store in 2D Array (picture.grid).

    clear();
    stroke(0,0);
    fill('#484848');

    for(var y = 0; y < picture.gridY; y++)
    {
        for(let x = 0; x < picture.gridX; x++)
        {
            let rgbaColor = picture.grid[x][y];
            let hsbColor = rgbToHsb(rgbaColor[0],rgbaColor[1],rgbaColor[2]);
            let circleSize = 0;

            if (hsbColor.bri <= 25)
            {
                circleSize = cellSize;
            }
            else if (hsbColor.bri <= 50)
            {
                circleSize = (cellSize /4)*3;
            }
            else if (hsbColor.bri <= 75)
            {
                circleSize = (cellSize /4)*2;
            }

            circle(((picture.cellSize)+x*(picture.cellSize)),((picture.cellSize)+y*(picture.cellSize)),circleSize);
        }
    }
}

//Converts to color HSB object (code from here http://www.csgnetwork.com/csgcolorsel4.html with some improvements)
  //Improvements not by me, but by Marco Demaio at https://stackoverflow.com/questions/2348597/why-doesnt-this-javascript-rgb-to-hsl-code-work
  function rgbToHsb(r, g, b)
  {    
    console.log('🎨 rgbToHsb()')
    r /= 255; g /= 255; b /= 255; // Scale to unity.   
    var minVal = Math.min(r, g, b),
    maxVal = Math.max(r, g, b),
    delta = maxVal - minVal,
    HSB = {hue:0, sat:0, bri:maxVal},
    del_R, del_G, del_B;

    if( delta !== 0 )
    {
        HSB.sat = delta / maxVal;
        del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
        del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
        del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

        if (r === maxVal) {HSB.hue = del_B - del_G;}
        else if (g === maxVal) {HSB.hue = (1 / 3) + del_R - del_B;}
        else if (b === maxVal) {HSB.hue = (2 / 3) + del_G - del_R;}

        if (HSB.hue < 0) {HSB.hue += 1;}
        if (HSB.hue > 1) {HSB.hue -= 1;}
    }

    HSB.hue *= 360;
    HSB.sat *= 100;
    HSB.bri *= 100;

    return HSB;
  }
