var levelData = {
  levelName: "CYCLOLCYC",
  colBG: "blue",
  colGrnd: "blue",
  level: [
    {
      texture: "./Assets/Texture/GD_spike.png",
      blockType: 0, //0 - spike, 1 - block, 2 - contact interactable (portals, pads), 3 - click interactable (orbs)
      x: 2, //in grid position
      y: 0,
      w: 82,
      h: 82,
    },
  ]
}

var player = {
  x:0,
  y:0,
  dy: 0,
  speed:4,
  gravity:0.3,
  isGrounded: false,
  angle: 0,
  dang: 0,
  clickFunc: gamemode_cube, //defines how the player works when you hold the mouse
}

let _isClicking = false;
let _bgParralax = 0;

function gamemode_cube() {
  // console.log("test")
  if(player.isGrounded) {
    player.y = -1;
    player.isGrounded = false;
    player.dy = 12;
    player.dang = n_toRad(2.5);
  }
}

function init() {
  //runs as soon as engine starts
  r_globalCamera.position.y -= 500;


}

function update() {
  //runs every update tick configured in engine.js

  //update level
  _bgParralax += 2;

  //update player

  //move forward
  player.x += player.speed;

  //move with dy
  player.y -= player.dy;

  //camera lockdown
  if(player.x > 350) {
    r_globalCamera.position.x = player.x-350;
  }

  //do jumping shit
  if(_isClicking) {
    player.clickFunc();
  }

  //gravity
  if(player.y < 0) {
    player.dy -= player.gravity;
    player.isGrounded = false;
    // console.log(player.angle)
  } else {
    player.dy = 0;
    player.y = 0;
    player.isGrounded = true;
    player.dang = 0;
    
    //find closest angle that is mul of 90
    let _targetAngle = player.angle/n_toRad(90)
    player.angle = n_lerp(player.angle, Math.trunc(_targetAngle)*n_toRad(90), 0.2);
  }

  //angular momentum
  player.angle += player.dang
}

function r_update() {
  //runs rendering
  let _player_loc_grnd = Math.floor(player.x/256);
  let _player_loc_bg = Math.floor((player.x - _bgParralax)/1200);
  //render BG
  for(let i=_player_loc_bg; i<_player_loc_bg+4; i++) {
    r_drawTexture("./Assets/Texture/GD_background.png", (i-1)*1200 + _bgParralax, 82-1000, 1200, 1000);
  }

  //render ground
  for(let i=_player_loc_grnd; i<_player_loc_grnd+8; i++) {
    r_drawTexture("./Assets/Texture/GD_Ground.png", (i-2)*256, 82, 256, 256);
  }


  r_drawTextureComplex("./Assets/Texture/GD_icon.png", player.x, player.y, 82, 82, player.angle);

  renderLevel();

}

function onMouseDown() {
  _isClicking = true;
}

function onMouseUp() {
  _isClicking = false;
}

function renderLevel() {
  levelData.level.forEach((block, i) => {
    r_drawTexture(block.texture, block.x*82, block.y*82, block.w, block.h);
  });
}
