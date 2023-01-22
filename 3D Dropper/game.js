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


class Player {
  constructor(position, size, speed) {
    this.position = position;
    this.size = size;
    this.speed = speed;
    this.isDead = false;
  }
  update() {
    //this.position.z += speed;
    if(W) {
      this.position.y-=this.speed;
    }
    if(S) {
      this.position.y+=this.speed;
    }
    if(A) {
      this.position.x-=this.speed;
    }
    if(D) {
      this.position.x+=this.speed;
    }
  }
}

var player = new Player(new Vector3(0, 0, 2), new Vector3(64, 64, 64), 5);
class Tile {
  constructor(position, size) {
    this.position = position;
    this.size = size;
  }
}

class Wall {
  constructor(position, tile_size, grid_size, hole_amount) {
    this.position = position;
    this.tile_size = tile_size; //how big is 1 tile
    this.grid_size = grid_size; //how much tiles is 1 wall;
    this.tiles = [];
    this.hole_amount = hole_amount;
  }
  generate() {
    this.position = new Vector3(0, 0, 5);

    for (let x=0; x<this.grid_size.x; x++) {
      this.tiles[x] = [];
      for (let y=0; y<this.grid_size.y; y++) {
        this.tiles[x][y] = new Tile(new Vector3(-screenSize.x+(x*this.tile_size.x), -screenSize.y+(y*this.tile_size.y), this.position.z), this.tile_size);
      }
    }

    for(let h=0; h<this.hole_amount; h++) {
      this.tiles[randomInteger(this.grid_size.x)][randomInteger(this.grid_size.y)] = new Tile(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
    }
  }
  update() {
    this.position.z -= 0.01;
    for (let x=0; x<this.grid_size.x; x++) {
      for (let y=0; y<this.grid_size.y; y++) {
        this.tiles[x][y].position.z = this.position.z;
      }
    }
    if(this.position.z <= 1) {
      this.generate();
    }
  }
  render() {
    for (let x=0; x<this.grid_size.x; x++) {
      for (let y=0; y<this.grid_size.y; y++) {
        let _ss_position = projectVector(this.tiles[x][y].position);
        let _ss_size = projectSize(this.tiles[x][y].size, this.tiles[x][y].position);
        //drawImage(box, _ss_position.x, _ss_position.y, _ss_size.x, _ss_size.y, 0);
        drawSpriteBlock(box, this.tiles[x][y].position, this.tiles[x][y].size);
      }
    }
  }
}
//Place for Your variables
let mateuss = true;

var testWall = new Wall(new Vector3(0, 0, 5), new Vector3(128, 128, 64), new Vector2((screenSize.x*2)/128, (screenSize.y*2)/128), 1);
start();

//When the game starts this happens:
function start(){
  console.log("Made with Mateuss Engine v1.8");
  RegisterStarterSounds();
  testWall.generate();
}

//This happens every millisecond:
function update() {
  if(!player.isDead) {
    deltaTime++;
    Save_old_cam_pos();
    Newtonus_PhysicsTick();
    player.update();
    testWall.update();
  }
}

//Rendering
function render(){
  //draw walls
  for(let i=0; i<20; i++) {
    context.strokeStyle = "black";
    let _real_pos = new Vector3(-screenSize.x, -screenSize.y, i);
    let _ss_pos = projectVector(_real_pos)
    let _ss_size = projectSize(new Vector2(screenSize.x*2, screenSize.y*2), _real_pos);
    context.strokeRect(_ss_pos.x, _ss_pos.y, _ss_size.x, _ss_size.y);
  }
  //player indicator
  let _real_player_pos = new Vector3(-screenSize.x, -screenSize.y, player.position.z);
  let _ss_pos = projectVector(_real_player_pos)
  let _ss_size = projectSize(new Vector2(screenSize.x*2, screenSize.y*2), _real_player_pos);
  context.strokeStyle = "red";
  context.strokeRect(_ss_pos.x, _ss_pos.y, _ss_size.x, _ss_size.y);
  Newtonus_RenderBodies();
  testWall.render();
  //draw player
  drawBlock("green", 0.5, player.position, player.size);
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
