//Mateuss engine v1.8
//Dope sounds

//changelog:
//Moved all the internal builders to another file (features.js), so it's more sorted ;)
//From now on, to edit the functions yourself you'll have to use the features.js, instead of doing it here :P
//Newtonus is now recoded from scratch!
//Quality of the physics got better
//You can now rotate Rectangles!
//The whole input system was expanded
//Auditor! Now you can add Audio to your games! Use the sounds folder in the internal engine
//Tons of dope 8-bit sounds
//Tutorial.txt. Yeah, someone had to do it lol

let deltaTime = 0,
    //Input system

    W = false,
    A = false,
    S = false,
    D = false,
    Mouse = false,
    Enter = false,
    Space = false,
    LShift = false,
    LCtrl = false,
    LAlt = false,
    Q = false,
    E = false,
    Backspace = false,
    Escape = false;



//Place for Your variables
let mateuss = true;
var zoom = 2;
var pixSIze = 2;
var center = new Vector2(0.5, 0.5);


//When the game starts this happens:
function start(){
  console.log("Made with Mateuss Engine v1.8");
  RegisterStarterSounds();
  draw();
}

//This happens every millisecond:
function update() {
  deltaTime++;
  Save_old_cam_pos();
  Newtonus_PhysicsTick();
}

//Rendering
function render(){
  Newtonus_RenderBodies();
  context.strokeStyle = 'black';
  context.strokeRect(0, 0, canvas.width, canvas.height);
  //DrawRectangle("rgb(225, 225, 225)", 1, 0, 0, 1980, 1080, 0);
  for(let xi=0; xi<canvas.width; xi++) {
    for(let yi=0; yi<canvas.height; yi++) {
      let _pixColBlack = evalPixelMandelbrot(500, xi*pixSIze, yi*pixSIze);
      if(_pixColBlack == -1) {
        context.fillStyle = "black";
      } else {
        context.fillStyle = `hsl(${_pixColBlack*25}, 100%, 50%)`;

      }
      context.fillRect(xi*pixSIze, yi*pixSIze, 5, 5);
    }
  }





  context.font = "10px sans-serif";
  context.fillText(`x: ${mouseX} y:${mouseY}`, 0, 16);
  let trnx = realPosToMandelPosX(mouseX); let trny = realPosToMandelPosY(mouseY);
  context.fillText(`trx: ${trnx} try:${trny}`, 0, 32);
  context.fillText(`trx: ${mandlePosToRealPosX(trnx)} try:${mandlePosToRealPosY(trny)}`, 0, 64);
}

//Showing the render on render_screen. Screen is 1280x720
function draw(){
  render();
}

//Input config

//Input's configurations being actually used
function keydown(key) {
  if(key==38) {
    draw();
  }
}

function keyup(key) {
}

function mousedown() {
  
}

function mouseup() {
}

//Place your functions here
function getFX(ZX, ZY, CX, CY) {
  return ZX*ZX - ZY*ZY + CX;
}

function getFY(ZX, ZY, CX, CY) {
  return 2*ZX*ZY + CY;
}

function realPosToMandelPosX(posX) {
    return (posX/canvas.width - center.x)*4*zoom;
}

function realPosToMandelPosY(posY) {
    return (posY/canvas.height - center.y)*4*zoom;
}

function mandlePosToRealPosX(posX) {
  let _resultX = 0;
  _resultX = (posX/(4*zoom) + center.x)*canvas.width;
  return _resultX;
}

function mandlePosToRealPosY(posY) {
  let _resultY = 0;
  _resultY = (posY/(4*zoom) + center.y)*canvas.height;
  return _resultY;
}
// let CX = 0, CY = 0, _posX = 0, _posY = 0, _prevX = 0, _prevY = 0;

function evalPixelMandelbrot(iterations, posX, posY) {
  let CX = 0, CY = 0, _posX = 0, _posY = 0, _prevX = 0, _prevY = 0, br = 0;

  CX = realPosToMandelPosX(posX);
  CY = realPosToMandelPosY(posY);
  let _it = iterations

  for(let i=0; i<_it; i++) {
    if(_posX*_posX + _posY*_posY > 2*2) {
      return br;
    }
    _posX = getFX(_prevX, _prevY, CX, CY);
    _posY = getFY(_prevX, _prevY, CX, CY);
    _prevX = _posX;
    _prevY = _posY;
    br++;

  }
  return -1;
}
