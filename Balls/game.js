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

let balls = [];

class Ball {
  constructor(position, radius, delta) {
    this.position = position;
    this.delta = delta;
    this.radius = radius;
	  this.friction = 1.01;
    this.doCollisionInvert = true;
    this.isFixingCollision = false;
    this.collisionQuality = 100;
    this.mass = radius/8;
  }
  update() {
    this.position.x += this.delta.x;
    this.position.y += this.delta.y;

	   this.delta.x /= this.friction;
	   this.delta.y /= this.friction;

    //collision with balls
    balls.forEach((ball, i) => {
      if(SphereCollision(this.position, this.radius, ball.position, ball.radius) && ball!=this) {
          //fix collision
          let _fixedCollision = false;
          for(let i=0; i<this.collisionQuality; i++) {
            if(this.delta.length() > 2) {
              this.doImpact(ball);
              break;
            } else {
              this.fixCollision(ball);
            }

            if(!SphereCollision(this.position, this.radius, ball.position, ball.radius) && ball!=this) {
                _fixedCollision = true;
                break;
              }
          }
      }
    });
    //collision with borders
    if(this.position.x+this.radius>=1280 || this.position.x-this.radius <= 0) {
      this.delta.x*=-1;
    }
    if(this.position.y+this.radius>=720 || this.position.y+this.radius <= 0) {
      this.delta.y*=-1;
    }
  }
  fixCollision(other) {
    let _ang = angleFrom2Pos(this.position, other.position);
    other.delta.x = -Math.cos(_ang);
    other.delta.y = -Math.sin(_ang);
  }
  doImpact(other) {
    //this.fixCollision(other);
    //elastic collision function
    let o1 = Math.atan2(this.delta.y, this.delta.x);
    let o2 = Math.atan2(other.delta.y, other.delta.x);
    let phi = Math.atan2(other.position.y - this.position.y, other.position.x - this.position.x);
    let v1 = this.delta.length();
    let v2 = this.delta.length()

    let m1 = this.mass;
    let m2 = other.mass;

    let vx1 = v1*Math.cos(o2-phi)*Math.cos(phi) + v1*Math.sin(o2-phi)*Math.cos(phi+Math.PI/2)
    let vy1 = v1*Math.cos(o2-phi)*Math.sin(phi) + v1*Math.sin(o2-phi)*Math.sin(phi+Math.PI/2)

    let vx2 = v2*Math.cos(o1-phi)*Math.cos(phi) + v2*Math.sin(o1-phi)*Math.cos(phi+Math.PI/2)
    let vy2 = v2*Math.cos(o1-phi)*Math.sin(phi) + v2*Math.sin(o1-phi)*Math.sin(phi+Math.PI/2)

    this.delta = new Vector2(vx1, vy1);
    other.delta = new Vector2(vx2, vy2);
  }
}

class Player extends Ball {
  constructor(position, radius, delta) {
    super(position, radius, delta);
    this.angle = 0;
    this.speed = 5;
  }
  launch(ang) {
    this.delta.x = -Math.cos(this.angle)*this.speed;
    this.delta.y = -Math.sin(this.angle)*this.speed;
  }
}

var player = new Player(new Vector2(256, 720/2), 15, new Vector2(0, 0));
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
  balls.forEach((ball, i) => {
    ball.update();
  });
  player.update()
}

//Rendering
function render(){
  Newtonus_RenderBodies();
  DrawRectangle("green", 1, 0, 0, 1980, 1080, 0);
  balls.forEach((ball, i) => {
    DrawNGon(ball.position, 16, ball.radius, "red");
  });
  DrawNGon(player.position, 16, player.radius, "white");
  if(Mouse) {
    drawImage(arrowLeft, player.position.x-16, player.position.y-16, 32, 32, ToDeg(angleFrom2Pos(player.position, new Vector2(mouseX, mouseY))));
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
  player.angle = angleFrom2Pos(player.position, new Vector2(mouseX, mouseY))
  player.launch(player.angle);
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
function generateBalls(amnt) {
  for(let i=0; i<amnt; i++) {
    balls.push(new Ball(new Vector2(randomInteger(1280), randomInteger(720)), 16, new Vector2(0, 0)));
  }
}
