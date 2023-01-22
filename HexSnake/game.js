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
class Camera {
  constructor(position, rotation, zoom) {
    this.position = position;
    this.angle = rotation;
    this.zoom = zoom;
  }
}
var camera = new Camera(new Vector2(0, 0), 0, 4);
var SnappyCam = new Vector2(0, 0);
var targetZoom = 4;
var zoom = true;
var smoothCamPos = false;
var shouldFetchZoom = true;
var map = [];

class Player {
  constructor(position) {
    this.position = position;
    this.score = 0;
    this.tailDelay = 10;
    this.isMoving = false;
    this.direction = 2;
  }
  update() {
    if(this.isMoving) {
      map[this.position.x][this.position.y].type = "tail";
    }
    if(W) {
      this.isMoving = true;
      //setup directions
      //1 - up; 2 - up-right; 3 - down-right; 4 - down; 5 - down-left; 6 - up-left;
      switch (this.direction) {
        case 1:
          this.position.y --;
          break;
        case 2:
          this.position.x ++;
          break;
        case 3:
          this.position.x ++;
          this.position.y ++;
          break;
        case 4:
          this.position.y ++;
          break;
        case 5:
          this.position.x --;
          break;
        case 6:
          this.position.x --;
          this.position.y --;
          break;
      }
    } else {
      this.isMoving = false;
    }
  }
}
var player = new Player(new Vector2(0, 0));


class MapHex {
  constructor(position, radius, color, type, id) {
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.type = type;
    this.id = id;
    this.timer = 0;
  }
  render() {
    if(this.id.x == player.position.x && this.id.y == player.position.y) {
      DrawNGon(new Vector2(this.position.x - camera.position.x, this.position.y - camera.position.y), 6, this.radius*camera.zoom, "red");
    }
    if(this.type == "tail") {
      DrawNGon(new Vector2(this.position.x - camera.position.x, this.position.y - camera.position.y), 6, this.radius*camera.zoom, "red");
    }
    if(this.type == "food") {
      DrawNGon(new Vector2(this.position.x - camera.position.x, this.position.y - camera.position.y), 6, this.radius*camera.zoom, "rgb(0, 255, 0)");
    }
    StrokeNGon(new Vector2(this.position.x - camera.position.x, this.position.y - camera.position.y), 6, this.radius*camera.zoom, this.color, 2);
    //DrawRectangle("red", 0.25, this.position.x-camera.position.x-this.radius, this.position.y-camera.position.y-getV(this.radius), this.radius*2, getV(this.radius)*2)
  }
  update() {
    if(this.type=="tail"&&player.isMoving) {
      this.timer++
      if(this.timer > player.tailDelay) {
        this.type = "empty";
        this.timer = 0;
      }
    } else if (this.type == "food") {
      if(this.id.x == player.position.x && this.id.y == player.position.y) {
        this.type = "empty";
        player.tailDelay += 10;
        player.score++;
        PlaySound("Coin_1");
        shouldFetchZoom = true;
      }
    }
  }
}




start();

//When the game starts this happens:
function start(){
  console.log("Made with Mateuss Engine v1.8");
  RegisterStarterSounds();
  generateMap(new Vector2(64, 64), 16, 16);
  shouldFetchZoom=true;
}

//This happens every millisecond:
function update() {
  deltaTime++;
  Save_old_cam_pos();
  Newtonus_PhysicsTick();
  if(smoothCamPos) {camera.position = VLerp(camera.position, SnappyCam, 0.8);}
  else camera.position = SnappyCam;
  //camera.position = SnappyCam;
  for (let x=0; x<map.length; x++) {
    for (let y=0; y<map[x].length; y++) {
      map[x][y].update();
    }
  }
  SnappyCam = new Vector2(map[player.position.x][player.position.y].position.x-1280/2, map[player.position.x][player.position.y].position.y-720/2);
  if(deltaTime%10==0) {
    player.update();
  }
  updateMap();
  if(iterateZoom(camera.zoom) != countOfType("tail") || shouldFetchZoom) {
    findAcceptableZoom(5, 0.8);
  }
  if(zoom) {
    camera.zoom = Lerp(camera.zoom, targetZoom, 0.1);
  }
  camera.angle = player.direction*60

  context.save();
  context.translate(player.position.x, player.position.y);
  context.rotate(ToRad(camera.angle));
  context.translate(-player.position.x, -player.position.y);
  context.restore();
}

//Rendering
function render(){
  Newtonus_RenderBodies();
  DrawRectangle("black", 1, 0, 0, 1980, 1080, 0);
  for (let x=0; x<map.length; x++) {
    for (let y=0; y<map[x].length; y++) {
      map[x][y].render();
    }
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
}

//When the user releases the mouse button
function mouse_up(){
  Mouse = false;
}

//Input's configurations being actually used
function keydown(key) {
  input_down(key);
  if(A) {
    shouldFetchZoom = true;
    if(player.direction>1) {
      player.direction--;
    } else {
      player.direction=6;
    }
  } else if (D) {
    shouldFetchZoom = true;
    if(player.direction<6) {
      player.direction++;
    } else {
      player.direction=1;
    }
  }

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
function generateMap(size, radius, foodProbability) {
  for (let x=0; x<size.x; x++) {
    map[x] = [];
    for (let y=0; y<size.y; y++) {
      let _rand = randomInteger(101);
      let _type
      if(_rand < foodProbability) {
        _type = "food";
      } else {
        _type = "empty";
      }
      map[x][y] = new MapHex(new Vector2((x*getV(radius)*2), y*getV(radius)*2-(x*getV(radius))), radius, "white", _type, new Vector2(x, y));
    }
  }
}

function updateMap() {
  for (let x=0; x<map.length; x++) {
    for (let y=0; y<map[x].length; y++) {
      map[x][y].position = new Vector2((x*getV(map[x][y].radius*camera.zoom)*2), y*getV(map[x][y].radius*camera.zoom)*2-(x*getV(map[x][y].radius*camera.zoom)));
    }
  }
}

function countOfType(type) {
  let cnt = 0;
  for (let x=0; x<map.length; x++) {
    for (let y=0; y<map[x].length; y++) {
      if(map[x][y].type == type) {
        cnt++;
      }
    }
  }
  return cnt;
}
function findAcceptableZoom(min, max) {
  zoom = false;
  smoothCamPos = false;
  let iterationResult = 0;
  for (let i=min; i>max; i-=0.01) {
    if (iterateZoom(i) == countOfType("tail") && i>max) {
      targetZoom = i;
      zoom = true;
      smoothCamPos = true;
      return;
    }
  }
}

function iterateZoom(zoom) {
  camera.zoom = zoom;
  updateMap();
  let collidingCells = 0;
  for (let x=0; x<map.length; x++) {
    for (let y=0; y<map[x].length; y++) {
      if(areColliding(0, 0, 1980, 1080,
        map[x][y].position.x-map[x][y].radius-camera.position.x, map[x][y].position.y-getV(map[x][y].radius)-camera.position.y, 20, 20)) {
        if(map[x][y].type == "tail") {
          collidingCells++;
        }
      }
    }
  }
  return collidingCells;
}
