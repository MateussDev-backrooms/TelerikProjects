// Mateuss engine v1.8
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
let mateuss = true,
    myX = 0,
    myY = 0;

var worldSize = new Vector3(400, 300, 5)
class Ball {
  constructor(position, size, deltaPosition) {
    this.position = position;
    this.size = size;
    this.deltaPosition = deltaPosition;
  }
  update() {
    //Basic movement
    this.position.x += this.deltaPosition.x;
    this.position.y += this.deltaPosition.y;
    this.position.z += this.deltaPosition.z*0.01;

    //gravity
    this.deltaPosition.y += 0.198;

    //Wall collision
    if(this.position.x <= -worldSize.x || this.position.x >= worldSize.x) {
      this.deltaPosition.x = -this.deltaPosition.x;
      //PlaySound("Gunshot_1");
    }
    if(this.position.y <= -worldSize.y || this.position.y >= worldSize.y) {
      this.deltaPosition.y = -this.deltaPosition.y;
      //PlaySound("Gunshot_1");
    }
    if(this.position.z >= worldSize.z || this.position.z <= 1) {
      this.deltaPosition.z = -this.deltaPosition.z
      //PlaySound("Gunshot_1");
    }
  }
}

var Balls = [
  new Ball(new Vector3(0, 0, 1), new Vector2(64, 64), new Vector3(5, 5, 5))
]
var BallCount = 1
start();

//When the game starts this happens:
function start(){
  console.log("Made with Mateuss Engine v1.8");
  RegisterStarterSounds();
}

//This happens every millisecond:
function update() {
  deltaTime++;
  Save_old_cam_pos();
  Newtonus_PhysicsTick();
  for(let i=0; i<BallCount; i++) {
    Balls[i].update();
  }
  //console.log(PlayerBall.position)
}

//Rendering
var tunnelDetail = 25;
function render(){
  Newtonus_RenderBodies();

  //render world
  for (let i=1; i<tunnelDetail; i++) {
    let _wallLoc = new Vector3(-worldSize.x, -worldSize.y, worldSize.z - i * (worldSize.z/tunnelDetail));
    let _wallSize = new Vector2(worldSize.x*2, worldSize.y*2);
    let _endWallPosStart = projectVector(_wallLoc);
    let _endWallPosSize = projectSize(_wallSize, _wallLoc);
    context.strokeRect(_endWallPosStart.x, _endWallPosStart.y, _endWallPosSize.x, _endWallPosSize.y);
  }

  //player
  for(let i=0; i<BallCount; i++) {
    draw3DObject(ballOrTree, Balls[i].position, Balls[i].size, 0, 1);
  }
}

//Showing the render on render_screen. Screen is 1280x720
function draw(){
  render();
}

//Input config

//When the user holds any keyboard button
function input_down(key){
  if(key==87 || key ==38){
    W = true;
  }
  if(key==65 || key ==37){
    A = true;
  }
  if(key==83 || key ==40){
    S = true;
  }
  if(key==68 || key ==39){
    D = true;
  }
  if (key == 13) {
    Enter = true;
  }
  if (key == 32) {
    Space = true;
  }
  if (key == 16) {
    LShift = true;
  }
  if (key == 17) {
    LCtrl = true;
  }
  if (key == 18) {
    LAlt = true;
  }
  if (key == 81) {
    Q = true;
  }
  if (key == 69) {
    E = true;
  }
  if (key == 8) {
    Backspace = true;
  }
  if (key == 27) {
    Escape = true;
  }
}

//When the user releases any keyboard button
function input_up(key){
  if(key==87 || key ==38){
    W = false;
  }
  if(key==65 || key ==37){
    A = false;
  }
  if(key==83 || key ==40){
    S = false;
  }
  if(key==68 || key ==39){
    D = false;
  }
  if (key == 13) {
    Enter = false;
  }
  if (key == 32) {
    Space = false;
  }
  if (key == 16) {
    LShift = false;
  }
  if (key == 17) {
    LCtrl = false;
  }
  if (key == 18) {
    LAlt = true;
  }
  if (key == 81) {
    Q = false;
  }
  if (key == 69) {
    E = false;
  }
  if (key == 8) {
    Backspace = false;
  }
  if (key == 27) {
    Escape = false;
  }

}

//When the user holds down the mouse button
function mouse_down(){
  Mouse = true;
  let _rndSize = 16+randomInteger(64)
  spawnBall(new Vector3(mouseX - subtractionPoint.x, mouseY - subtractionPoint.y, 2), new Vector2(_rndSize, _rndSize), new Vector3(randomInteger(5), randomInteger(5), randomInteger(5)));
}

//When the user releases the mouse button
function mouse_up(){
  Mouse = false;
}

//Input's configurations being actually used
function keydown(key) {
  input_down(key);
}

function keyup(key) {
  input_up(key);
}

function mousedown() {
  mouse_down();
}

function mouseup() {
  mouse_up();
}

//Place your functions here
function spawnBall(position, size, delta) {
  Balls[BallCount] = new Ball(position, size, delta);
  BallCount++;
}
