var colors = [
  'red',
  'white',
  'blue',
  'cyan',
  'orange',
  'grey',
  'pink'
]

var time = 0;

class House {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.type = 0; //0 is none, 1 is candy and 2 is gun
    this.sprite = sprite; //path
  }
  update() {
    if(time % 1000 == 0) {
      this.type = Math.floor(n_randomRange(0, 2))
      console.log('type changed to', this.type)
    }
    //handle collision
    for(let i=0; i<kids.length; i++) {
      if(n_sphereCollision(this.x + 64, this.y + 64, 72, kids[i].x, kids[i].y, 12)) {
        switch(this.type) {
          case 0:
            break;
          case 1:
            score += 10;
            this.type = 0;
            a_playPlainSound('./Assets/Audio/Coin_2.mp3', 1, 1, false);
            break;
          case 2:
            if(kids.length > 0) {
              kids.pop();
              a_playPlainSound('./Assets/Audio/Gunshot_2.mp3', 1, 1, false);

            }
            this.type = 0;
            break;
        }
      }
    }
  }
  renderType() {
    switch(this.type) {
      case 0:
        break;
      case 1:
        r_drawTexture('./Assets/Textures/t_candy.png', this.x, this.y, 96, 96)
        break;
      case 2:
        r_drawTexture('./Assets/Textures/t_gun.png', this.x, this.y, 96, 96)
        break;
    }
  }
}

var kids = [];
class Kid {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.color = col;
  }
  update() {
    let _angleToMouse = n_lookAtAngle(this.x, this.y, I_mouseX, I_mouseY);
    if(n_distance(this.x, this.y, I_mouseX, I_mouseY) > 75) {
      kids.forEach((e, i) => {
        if(n_sphereCollision(this.x, this.y, 12, e.x, e.y, 12) && this != e) {
          let _oppositeEDir = 180 + n_lookAtAngle(this.x, this.y, e.x, e.y);
  
          this.x -= Math.cos(_oppositeEDir);
          this.y -= Math.sin(_oppositeEDir);
        } else {
          this.x -= Math.cos(_angleToMouse) ;
          this.y -= Math.sin(_angleToMouse) ;
        }
      })
    }
  }
  render() {
    r_drawNGon(this.x, this.y, 12, 12, this.color);
  }
}

var houses = [];
var score = 0;
var distance = 0;

function init() {
  //runs as soon as engine starts

  //generate kids
  for(let i=0; i<5; i++) {
    kids[i] = new Kid(e_html_canvasWidth / 2, e_html_canvasHeight / 2, colors[Math.floor(n_randomRange(0, colors.length))]);
  }

  //generate houses
  houses[0] = new House(10, 10, './Assets/Textures/house[0].png')
  houses[1] = new House(10, 25 + 128, './Assets/Textures/house[2].png')
  houses[2] = new House(10, 50 + 256, './Assets/Textures/house[0].png')
  houses[3] = new House(10, 75 + 256 + 128, './Assets/Textures/house[1].png')
  houses[4] = new House(1280 - 138, 10, './Assets/Textures/house[3].png')
  houses[5] = new House(1280 - 138, 25 + 128, './Assets/Textures/house[0].png')
  houses[6] = new House(1280 - 138, 50 + 256, './Assets/Textures/house[4].png')
  houses[7] = new House(1280 - 138, 75 + 256 + 128, './Assets/Textures/house[1].png')
}

function update() {
  //runs every update tick configured in engine.js
  time++;
  //update all kids
  for(let i=0; i<kids.length; i++) {
    kids[i].update();
  }

  //update all houses
  for(let i=0; i<houses.length; i++) {
    houses[i].update();
  }
}

function r_update() {
  r_drawRectangle(0, 0, e_html_canvasWidth, e_html_canvasHeight, 'black', 1)
  //runs rendering
  for(let i=0; i<kids.length; i++) {
    kids[i].render();
  }

  houses.forEach((e, i) => {
    r_drawTexture(e.sprite, e.x, e.y, 128, 128);
    e.renderType();
  })
}
