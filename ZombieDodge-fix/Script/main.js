var player = {
  x: 0,
  y: 0,
}

var zombies = [];
var movementTypes = [zombieMove_straightLn, zombieMove_straightSpiral, zombieMove_wobblyCircle, zombieMove_wobblyLn]
var time = 0;

function init() {
  //runs as soon as engine starts
  spawnHorde(100)
}

function update() {
  //runs every update tick configured in engine.js
  time++;
  for(zombie of zombies) {
    zombie.moveType();
    zombie.collision();
    zombie.t ++;
  }
  player.x = I_mouseX;
  player.y = I_mouseY;
}

function r_update() {
  //runs rendering
  for(zombie of zombies) {
    r_drawTexture("Assets/Textures/t_zombie.jpg", zombie.x - 16, zombie.y - 16, 32, 32);
  }
}

function spawnHorde(cnt) {
  for(let i=0; i<cnt; i++) {
    spawnZombie(n_randomRange(0, 1280), n_randomRange(0, 720), 5, movementTypes[Math.floor(0)], n_randomRange(0, 360));
  }
}

function spawnZombie(x,y, speed, movementType, t_init) {
  let _buffer = {
    x: x,
    y: y,
    speed: speed,
    moveType: movementType,
    t: t_init,
    collision: collision
  }
  zombies.push(_buffer);
}

function zombieMove_straightLn() {
  let _ang = n_lookAtAngle(this.x, this.y, player.x, player.y);

  if(n_distance(this.x, this.y, player.x, player.y) > 50) {
    this.x += -Math.cos(_ang) * this.speed;
    this.y += -Math.sin(_ang) * this.speed;
  }
}
function zombieMove_wobblyLn() {
  let _ang = n_lookAtAngle(this.x, this.y, player.x, player.y);
  _ang += (Math.sin((this.t)/10)*1);

  if(n_distance(this.x, this.y, player.x, player.y) > 50) {
    this.x += -Math.cos(_ang) * this.speed;
    this.y += -Math.sin(_ang) * this.speed;
  }
}

function zombieMove_straightSpiral() {
  let _ang = n_lookAtAngle(this.x, this.y, player.x, player.y) + n_toRad(75);

  if(n_distance(this.x, this.y, player.x, player.y) > 50) {
    this.x += -Math.cos(_ang) * this.speed;
    this.y += -Math.sin(_ang) * this.speed;
  }
}
function zombieMove_wobblyCircle() {
  let _ang = n_lookAtAngle(this.x, this.y, player.x, player.y) + n_toRad(75);
  _ang += (Math.sin((this.t)/10)*1);

  if(n_distance(this.x, this.y, player.x, player.y) > 50) {
    this.x += -Math.cos(_ang) * this.speed;
    this.y += -Math.sin(_ang) * this.speed;
  }
}

function collision() {
  //colission with walls
  if(this.x > 1280-32) {
    this.x = 1280-32;
  }
  if(this.y > 720-32) {
    this.y = 720-32;
  }
  if(this.x < 0) {
    this.x = 0;
  }
  if(this.y < 0) {
    this.y = 0;
  }
  //colission with other zombies
  for(zombie of zombies) {
    if(zombie != this) {
      for(let it=0; it<5; it++) {
        if(n_distance(this.x, this.y, zombie.x, zombie.y) < 32) {
          let _ang = n_lookAtAngle(this.x, this.y, zombie.x, zombie.y) + n_toRad(180);
  
          this.x += -Math.cos(_ang) * (this.speed*(1 -(n_distance(this.x, this.y, zombie.x, zombie.y)/32)));
          this.y += -Math.sin(_ang) * (this.speed*(1 -(n_distance(this.x, this.y, zombie.x, zombie.y)/32)));
        }
      }
    }
  }
}
