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
    console.log('🎨 draw()')
    if(started)
    {   
        console.log(started);
        started = false;
    }
}

function start()
{
    console.log('🚀 start()')
    draw();
}