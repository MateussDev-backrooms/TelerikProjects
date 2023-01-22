var player = {
  x: 1280 / 2,
  y: 720 / 2,
  dx: 0,
  dy: 0,
  currentArea: "Lozenets (Easy)",
  hp: 100,
  balance: 10,
  inventory: [],
};
var inventory_opened = false;
var globalTextStyle = new TextStyle(
  "24px arial sans-serif",
  "left",
  "top",
  "white"
);
var globalSmallTextStyle = new TextStyle(
  "12px arial sans-serif",
  "left",
  "top",
  "white"
);
var showTooltip = false;
var tooltipData = {
  itmName: "",
  text: "",
  lowerText: "Press E to use/equip",
  hoveredItmInd: -1
}

class Lootbox {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isOpened = false;
  } 
  open(cnt) {
    if(!this.isOpened) {
      for(let i=0; i<cnt; i++) {
        addItemToInventory(allPossibleItems[Math.floor(n_randomRange(0, allPossibleItems.length-1))])
      }
      this.isOpened = true;
    }
  }
}

var Lootboxes = [];

function init() {
  //runs as soon as engine starts
  spawnLootbox()
}

function update() {
  //runs every update tick configured in engine.js
  r_globalCamera.position = new Vector2(
    player.x - 1280 / 2,
    player.y - 720 / 2
  );

  //Movement
  player.x += player.dx;
  player.y += player.dy;

  if (player.dx > 0.5) {
    player.dx -= 0.2;
  } else if (player.dx < -0.5) {
    player.dx += 0.2;
  } else {
    player.dx = 0;
  }

  if (player.dy > 0.5) {
    player.dy -= 0.2;
  } else if (player.dy < -0.5) {
    player.dy += 0.2;
  } else {
    player.dy = 0;
  }

  if (I_I_keypress(68)) {
    player.x += 2.5;
  }

  if (I_I_keypress(65)) {
    player.x -= 2.5;
  }

  if (I_I_keypress(87)) {
    player.y -= 2.5;
  }

  if (I_I_keypress(83)) {
    player.y += 2.5;
  }

  //collision
  Lootboxes.forEach((lbox, i) => {
    if(n_distance(player.x, player.y, lbox.x, lbox.y) < 100) {
      lbox.open(n_randomRange(1, 4));
    }
  });

  //update UI
  document.getElementById("ui_health").innerHTML = `HP: ${player.hp}`;
  document.getElementById(
    "ui_balance"
  ).innerHTML = `Balance: ${player.balance}lv`;
  document.getElementById("ui_area").innerHTML = `Area: ${player.currentArea}`;

  //update tooltip
  if(I_mouseX > 1280-360 && inventory_opened) {
    showTooltip = true;
  } else {
    showTooltip = false;
  }
  for (let i = 0; i < player.inventory.length; i++) {
    if(n_isColliding(I_mouseX - 8, I_mouseY - 98, 5, 5, 1280-360, 10+i*48, 360, 32)) {
      tooltipData.hoveredItmInd = i;
    } else {
    }
  }
}

function OnKeyDown(key) {
  if (key == 82) {
    inventory_opened = !inventory_opened;
  }
}

function onMouseUp() {
  player.dx = -(1280 / 2 - I_mouseX) / 25;
  player.dy = -(720 / 2 - I_mouseY) / 25;
}

function r_update() {
  //runs rendering
  r_drawTexture("./Assets/Textures/t_bg_ovchaKupel.jpg", 0, 0, 1900, 1300);
  r_drawTexture("./Assets/Textures/t_jeff.png", player.x, player.y, 64, 64);

  renderLootboxes();

  if (inventory_opened) {
    ctx.fillStyle = "gray";
    ctx.fillRect(1280 - 372, 0, 372, 720);
    for (let i = 0; i < player.inventory.length; i++) {
      let _textStyle = new TextStyle(
        "24px arial sans-serif",
        "left",
        "top",
        "white"
      );

      //change style of the text on tier
      switch (player.inventory[i].tier) {
        case 1: //common tier
          _textStyle.color = "white"
          break;
        case 2: //uncommon tier
          _textStyle.color = "rgb(0, 255, 50)"
          break;
        case 3: //rare tier
          _textStyle.color = "blue"
          break;
        case 4: //epic tier
          _textStyle.color = "rgb(255, 0, 128)"
          break;
        case 5: //legendary tier
          _textStyle.color = "yellow"
          break;
      }

      //render the text
      r_drawUITexture(
        player.inventory[i].path,
        1280 - 360,
        10 + i * 48,
        32,
        32
      );
      r_drawText(
        `${i + 1}: ${player.inventory[i].name} - ${
          player.inventory[i].description
        }`,
        1280 - 324,
        12 + i * 48,
        _textStyle
      );
      r_strokeUIRectangle(1280-360, 10+i*48, 360, 32, "red", 3, 0.75)
    }
  }
  renderTooltip();
}

function addItemToInventory(obj) {
  if (player.inventory.length < 15) {
    player.inventory.push(obj);
  } else {
    console.log("Inventory is full!");
  }
}

function removeItemFromInventory(obj) {
  const ind = player.inventory.findIndex((e) => {
    return e == obj
  });
  player.inventory.splice(ind, 1);
}

function spawnLootbox() {
  Lootboxes.push(new Lootbox(n_randomRange(0, 1280), n_randomRange(0, 720)));
}

function renderLootboxes() {
  Lootboxes.forEach((lbox, i) => {
    r_drawTexture('Assets/Textures/t_trash.png', lbox.x, lbox.y, 128, 128);
  });
}

function renderTooltip() {
  if(showTooltip && tooltipData.hoveredItmInd != -1) {
    let _col = ''

    //change style of the text on tier
    switch (player.inventory[tooltipData.hoveredItmInd].tier) {
      case 1: //common tier
        _col = "white"
        break;
      case 2: //uncommon tier
        _col = "rgb(0, 255, 50)"
        break;
      case 3: //rare tier
        _col = "blue"
        break;
      case 4: //epic tier
        _col = "rgb(255, 0, 128)"
        break;
      case 5: //legendary tier
        _col = "yellow"
        break;
    }
    
    r_drawUIRectangle(I_mouseX, I_mouseY - 64, 212, 256, "black", 0.75);
    r_strokeUIRectangle(I_mouseX, I_mouseY - 64, 212, 256, _col, 5, 1);
    r_drawText(player.inventory[tooltipData.hoveredItmInd].name, I_mouseX + 4, I_mouseY - 60, globalTextStyle)
    r_drawText(player.inventory[tooltipData.hoveredItmInd].tooltip, I_mouseX + 4, I_mouseY, globalSmallTextStyle)
  }
}