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

var solver = new Solver(8); //collision solver
var map = [];
class Person extends VerletObject {
  constructor(position, radius) {
    super(position, radius);
    this.speed = 10;
  }
}

var cellTypes = [
  'empty',
  'arrow_up',
  'arrow_r',
  'arrow_dw',
  'arrow_l',
  'wall',
  'shop'
]
class Cell {
  constructor(position, type, size) {
    this.position = position;
    this.type = type;
    this.size = size;
  }
  render() {
    let _img;
    switch (this.type) {
      case 'empty':
        _img = 0;
        break;
      case 'arrow_up':
        _img = arrowUp;
        break;
      case 'arrow_r':
        _img = arrowRight;
        break;
      case 'arrow_dw':
        _img = arrowDown;
        break;
      case 'arrow_l':
        _img = arrowLeft;
        break;
      case 'wall':
        _img = box;
        break;
      case 'shop':
        _img = shop;
        break;
    }

    DrawRectangle('white', 1, this.position.x, this.position.y, this.size.x, this.size.y, 0);
    if(_img != 0) {
      drawImage(_img, this.position.x, this.position.y, this.size.x, this.size.y, 0);
    }
  }
  update() {
    switch (this.type) {
      case 'wall':
        verlectObjectArray.forEach((obj, i) => {
          if(SphereCollision(obj.position, obj.radius, new Vector2(this.position.x+this.size.x/2, this.position.y+this.size.y/2), this.size.x/2)) {
            const _ang = angleFrom2Pos(new Vector2(this.position.x+this.size.x/2, this.position.y+this.size.y/2), obj.position);
            const _acc = new Vector2(-Math.cos(_ang)*obj.radius, -Math.sin(_ang)*obj.radius)
            obj.acceleration = _acc;
          }
        });
        break;
      case 'arrow_up':
        verlectObjectArray.forEach((obj, i) => {
          if(SphereCollision(obj.position, obj.radius, new Vector2(this.position.x+this.size.x/2, this.position.y+this.size.y/2), this.size.x/2)) {
            obj.accelerate(new Vector2(0, -8));
          }
        });
        break;
      case 'arrow_dw':
        verlectObjectArray.forEach((obj, i) => {
          if(SphereCollision(obj.position, obj.radius, new Vector2(this.position.x+this.size.x/2, this.position.y+this.size.y/2), this.size.x/2)) {
            obj.accelerate(new Vector2(0, 8));
          }
        });
        break;
      case 'arrow_l':
        verlectObjectArray.forEach((obj, i) => {
          if(SphereCollision(obj.position, obj.radius, new Vector2(this.position.x+this.size.x/2, this.position.y+this.size.y/2), this.size.x/2)) {
            obj.accelerate(new Vector2(-8, 0));
          }
        });
        break;
      case 'arrow_r':
        verlectObjectArray.forEach((obj, i) => {
          if(SphereCollision(obj.position, obj.radius, new Vector2(this.position.x+this.size.x/2, this.position.y+this.size.y/2), this.size.x/2)) {
            obj.accelerate(new Vector2(8, 0));
          }
        });
        break;
      case 'shop':
        verlectObjectArray.forEach((obj, i) => {
          if(SphereCollision(obj.position, obj.radius, new Vector2(this.position.x+this.size.x/2, this.position.y+this.size.y/2), this.size.x/2)) {
            verlectObjectArray.splice(i, 1);
          }
        });
        break;
    }
  }
}
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
  solver.update();
  for(let x=0; x<map.length; x++) {
    for(let y=0; y<map[x].length; y++) {
      map[x][y].update();
    }
  }
  if(deltaTime%5==0 && Space) {
    CreateVerletObject(new Person(new Vector2(mouseX, mouseY), 12));
  }

}

//Rendering
function render(){
  DrawRectangle("black", 1, 0, 0, 1980, 1080, 0);
  Newtonus_RenderBodies();
  for(let x=0; x<map.length; x++) {
    for(let y=0; y<map[x].length; y++) {
      map[x][y].render();
    }
  }

  solver.RenderVerlet("yellow");
  solver.StrokeVerlet("orange", 4);

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
function generateMap(size, cell_size) {
  for(let x=0; x<size.x; x++) {
    map[x] = [];
    for(let y=0; y<size.y; y++) {
      const _type = cellTypes[randomInteger(cellTypes.length)];
      map[x][y] = new Cell(new Vector2(x*cell_size, y*cell_size), _type, new Vector2(cell_size, cell_size));
    }
  }
}

function generateStaticMap(size, cell_size, cellType) {
  for(let x=0; x<size.x; x++) {
    map[x] = [];
    for(let y=0; y<size.y; y++) {
      const _type = cellType;
      map[x][y] = new Cell(new Vector2(x*cell_size, y*cell_size), _type, new Vector2(cell_size, cell_size));
    }
  }
}
