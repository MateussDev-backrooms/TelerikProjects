// * Factorio clone code refactor

// Assets for buildings
const kartinki = [
  arrowRight,
  arrowDownRight,
  arrowDown,
  arrowDownLeft,
  arrowLeft,
  arrowUpLeft,
  arrowUp,
  arrowUpRight,
  explosion1,
  building[3],
];

// 2D map where each cell corresponds to a type
let tipNaKletka;
let w, h, squareW, squareH;
let itemKartinki = [bird, bee, cherry];
let itemX, itemY, itemType, itemCount, dX, dY, timer;
let itemSize;
let itemSpeed;
let spawnerX = [],
  spawnerY = [];

let timeMultiplier = 1;

// * Load initial values
function init() {
  generateWorld(8, 4, 2, 3);
}

// Define a timer
let t = 0;

// * Updates each frame:
function update() {
  //Timer tick
  t += 1 * timeMultiplier;

  // * Cell tick
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      // * Generator cell
      // Generator generates a type 1 item each 40 timer ticks
      if (Math.floor(t) % 40 == 0 && tipNaKletka[i][j] == 8) {
        spawnItem(i, j, 0);
      }

      // * Factory cell
      if (tipNaKletka[i][j] == 9) {
        let brResursi = 0;

        //Find all resources that are colliding with the factory block
        for (let h = 0; h < itemCount; h++) {
          if (
            timer[h] <= 0 &&
            itemType[h] == 0 &&
            areColliding(
              itemX[h],
              itemY[h],
              itemSize,
              itemSize,
              i * squareW,
              j * squareH,
              squareW,
              squareH
            )
          ) {
            brResursi++;
          }
        }

        //Craft be when enough resources are available
        if (brResursi >= 2) {
          spawnItem(i, j, 1);
          for (let h = 0; h < itemCount - 1 && brResursi > 0; h++) {
            if (
              timer[h] <= 0 &&
              itemType[h] == 0 &&
              areColliding(
                itemX[h],
                itemY[h],
                itemSize,
                itemSize,
                i * squareW,
                j * squareH,
                squareW,
                squareH
              )
            ) {
              itemX[h] = NaN;
              brResursi--;
            }
          }
        }
      }

      // * Item movement
      for (let h = 0; h < itemCount; h++) {
        //Conveyor belt modifiers
        //COnveyor belts modify the speed of a specific item to a specific direction
        if (
          timer[h] <= 0 &&
          areColliding(
            itemX[h],
            itemY[h],
            itemSize,
            itemSize,
            i * squareW,
            j * squareH,
            squareW,
            squareH
          )
        ) {
          //Setup diagonal movement fix
          //? Most games forget to add this thing, that makes diagonal movement the same speed as normal movement
          let squareDiag = Math.sqrt(squareH * squareH + squareW * squareW);

          //Conveyor setup

          //Factory structure (Moves items to the left)
          if (itemType[h] == 1 && tipNaKletka[i][j] == 9) {
            dX[h] = itemSpeed;
            dY[h] = 0;
            timer[h] = squareW / itemSpeed;
          }

          //Spawner or Left conveyor structure (Moves items to the left)
          if (tipNaKletka[i][j] == 0 || tipNaKletka[i][j] == 8) {
            dX[h] = itemSpeed;
            dY[h] = 0;
            timer[h] = squareW / itemSpeed;
          }

          //Down-Left conveyor (Moves items on a down-left diagonal)
          if (tipNaKletka[i][j] == 1) {
            dX[h] = itemSpeed;
            dY[h] = itemSpeed;
            timer[h] = squareDiag / (Math.sqrt(2) * itemSpeed);
          }

          //Down conveyor (Moves items down)
          if (tipNaKletka[i][j] == 2) {
            dX[h] = 0;
            dY[h] = itemSpeed;
            timer[h] = squareH / itemSpeed;
          }

          //Down-Right conveyor (Moves items on a down-right diagonal)
          if (tipNaKletka[i][j] == 3) {
            dX[h] = -itemSpeed;
            dY[h] = itemSpeed;
            timer[h] = squareDiag / (Math.sqrt(2) * itemSpeed);
          }

          //Right conveyor (Moves items to the right)
          if (tipNaKletka[i][j] == 4) {
            dX[h] = -itemSpeed;
            dY[h] = 0;
            timer[h] = squareW / itemSpeed;
          }

          //Up-Right conveyor (Moves items on a up-right diagonal)
          if (tipNaKletka[i][j] == 5) {
            dX[h] = -itemSpeed;
            dY[h] = -itemSpeed;
            timer[h] = squareDiag / (Math.sqrt(2) * itemSpeed);
          }

          //Up conveyor (Moves items to the top)
          if (tipNaKletka[i][j] == 6) {
            dX[h] = 0;
            dY[h] = -itemSpeed;
            timer[h] = squareH / itemSpeed;
          }

          //Up-Left conveyor (Moves items on a up-left diagonal)
          if (tipNaKletka[i][j] == 7) {
            dY[h] = -itemSpeed;
            dX[h] = itemSpeed;
            timer[h] = squareDiag / (Math.sqrt(2) * itemSpeed);
          }
        }
      }
    }
  }

  // * Item movement
  for (let h = 0; h < itemCount; h++) {
    if (timer[h] <= 0) {
      //Stop items on start
      dX[h] = 0;
      dY[h] = 0;
    } else {
      //Move items to the deltaX/Y direction
      timer[h]--;
      itemX[h] += dX[h] * timeMultiplier;
      itemY[h] += dY[h] * timeMultiplier;
    }
  }
}

// * Rendering/Drawing
function draw() {
  // Draw 2d table of world
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      //Set image according to structure type
      drawImage(
        kartinki[tipNaKletka[i][j]],
        i * squareW,
        j * squareH,
        squareW,
        squareH
      );
    }
  }

  // Draw items
  for (let h = 0; h < itemCount; h++) {
    drawImage(
      itemKartinki[itemType[h]],
      itemX[h],
      itemY[h],
      itemSize,
      itemSize
    );
  }
}
function mouseup() {
  // Reda i kolonata, na koito e kliknato
  // Row, column that has been clicked
  let kliknatKol = Math.floor(mouseX / squareW);
  let kliknatRed = Math.floor(mouseY / squareH);
  console.log(kliknatKol, kliknatRed);

  // Dali sme kliknali vurhu strelka
  // Check if the clicked cell contains an arrow
  if (tipNaKletka[kliknatKol][kliknatRed] < 8) {
    // 0 -> 1 -> 2 -> 3 .... -> 6 -> 7 -> 0 -> 1 -> 2 -> 3 -> 4 -> .... -> 6 -> 7 -> 0 -> ....
    tipNaKletka[kliknatKol][kliknatRed] =
      (tipNaKletka[kliknatKol][kliknatRed] + 1) % 8;
  }
}

// * Spawn structure via keyboard keybind
function keyup(key) {
  // Find location of hovered cell
  let kliknatKol = Math.floor(mouseX / squareW);
  let kliknatRed = Math.floor(mouseY / squareH);

  // Use keybind to set cell type

  //Space
  if (key == 32) {
    //Spawn a spawner structure (Type 8)
    tipNaKletka[kliknatKol][kliknatRed] = 8;
  }
  //B
  if (key == 66) {
    //Spawn a factory structure (Type 9)
    tipNaKletka[kliknatKol][kliknatRed] = 9;
  }
}

// * Function for spawning an item
// Spawns an item at a given position (x, y) with a type (itmType)
function spawnItem(x, y, itmType) {
  //set item position
  itemX[itemCount] = (x + 0.5) * squareW - itemSize / 2;
  itemY[itemCount] = (y + 0.5) * squareH - itemSize / 2;

  //reset the item speed/direction
  dX[itemCount] = 0;
  dY[itemCount] = 0;

  //reset timer of item
  timer[itemCount] = 0;

  //set type of item
  itemType[itemCount] = itmType;

  //increase the item counter
  itemCount++;
}

function generateWorld(width, height, itmSpeed, itmSize) {
  //Reset the grid and setup default values
  tipNaKletka = [];
  w = width;
  h = height;
  squareW = canvas.width / w;
  squareH = canvas.height / h;
  itemX = [];
  itemY = [];
  itemType = [];
  dX = [];
  dY = [];
  timer = [];
  itemCount = 0;
  itemSize = squareW / itmSize;
  itemSpeed = itmSpeed;

  // Generate a random et of arrows
  for (let i = 0; i < w; i++) {
    tipNaKletka[i] = [];
    for (let j = 0; j < h; j++) {
      tipNaKletka[i][j] = randomInteger(8);
    }
  }
}
