let ground;

let box, coin, cylinder;

let maze, maze_walls;

let flashlight;

let player_move_f = true, player_move_b = true, player_move_l = true, player_move_r = true;
let player_moving_f = false, player_moving_b = false, player_moving_l = false, player_moving_r = false;

let keyDownArr = Array(256).fill(0); // Generates 256 long empty array for all keyboard buttons

let mouseX, mouseY;

function init() {
  setupInput();
  // Adjust camera
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 9999, 5);
  camera.up.set(0, 0, 1);

  // We will use the same geometry for all boxes
  // Meshes can be scaled to change size
  const box_geom = new THREE.BoxGeometry(1, 1, 1);

  // Grass texture
  const grass_texture = new THREE.TextureLoader().load(
    "./public/images/grass.jpg"
  );
  grass_texture.wrapS = THREE.RepeatWrapping;
  grass_texture.wrapT = THREE.RepeatWrapping;
  grass_texture.repeat.set(64, 64);

  // Iron wall texture
  const wall_texture = new THREE.TextureLoader().load(
    "./public/images/wallpaper.jpg"
  );
  wall_texture.wrapS = THREE.RepeatWrapping;
  wall_texture.wrapT = THREE.RepeatWrapping;
  wall_texture.repeat.set(1, 1);

  // Iron wall texture
  const gold_texture = new THREE.TextureLoader().load(
    "./public/images/stotinka.jpg"
  );
  gold_texture.wrapS = THREE.RepeatWrapping;
  gold_texture.wrapT = THREE.RepeatWrapping;
  gold_texture.rotation = -Math.PI / 2;
  gold_texture.repeat.set(1, 1);

  const grass_mat = new THREE.MeshPhongMaterial({
    color: "white",
    map: grass_texture,
  });

  // Create ground
  ground = new THREE.Mesh(box_geom, grass_mat);
  ground.scale.set(64, 64, 1);
  ground.receiveShadow = true;

  //setup default geometries
  box = new THREE.BoxGeometry(1, 1, 1);
  coin = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 12);

  maze = [];
  maze = generateRandomMazeMap(64, 64, 25, 4);
  maze_walls = [];
  let maze_wall_material = new THREE.MeshPhongMaterial({
    color: "white",
    map: wall_texture,
  });
  let coin_material = new THREE.MeshPhongMaterial({
    color: "yellow",
    map: gold_texture,
  });
  for (let i = 0; i < maze.length; i++) {
    maze_walls[i] = [];
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] == 1) {
        maze_walls[i][j] = new THREE.Mesh(box_geom, maze_wall_material);
        maze_walls[i][j].position.set(
          i - maze.length / 2 + 0.5,
          j - maze.length / 2 + 0.5,
          1
        );
        maze_walls[i][j].castShadow = true;
        maze_walls[i][j].receiveShadow = true;
        scene.add(maze_walls[i][j]);
      } else if (maze[i][j] == 2) {
        maze_walls[i][j] = new THREE.Mesh(coin, coin_material);
        maze_walls[i][j].position.set(
          i - maze.length / 2 + 0.5,
          j - maze.length / 2 + 0.5,
          1
        );
        maze_walls[i][j].castShadow = true;
        maze_walls[i][j].receiveShadow = true;
        maze_walls[i][j].rotation.z = i * j;
        scene.add(maze_walls[i][j]);
      } else {
      }
    }
  }
  // Point light

  // Ambient light
  const l2 = new THREE.AmbientLight("yellow", 0.3);
  flashlight = new THREE.SpotLight("white", 5, 5, Math.PI/8, 1)
  flashlight.position.set( camera.position.x, camera.position.y, camera.position.z );
  flashlight.up.set(0, 0, 1)
  flashlight.rotation.x = Math.PI/2

  flashlight.castShadow = true;

  flashlight.lookAt(0, 9999, 5)

  const spotLightHelper = new THREE.SpotLightHelper( flashlight );
  scene.add( spotLightHelper );

  // Directional light

  // Add all objects to scene
  scene.add(l2, flashlight, ground);
}

function update() {
  // controls.update();
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  for (let x = 0; x < maze.length; x++) {
    for (let y = 0; y < maze[x].length; y++) {
      if (maze[x][y] == 2) {
        maze_walls[x][y].rotation.z += 0.05;
        maze_walls[x][y].position.z =
          1 + Math.sin(maze_walls[x][y].rotation.z) / 10;
      }
    }
  }

  flashlight.position.set(camera.position.x, camera.position.y, camera.position.z)
  flashlight.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z)

  updatePlayer();
}

function generateRandomMazeMap(w, h, wall_probability, spawnSize) {
  let result = [];
  for (let x = 0; x < w; x++) {
    result[x] = [];
    for (let y = 0; y < h; y++) {
      if(x > w/2-Math.round(spawnSize/2) && x > w/2+Math.round(spawnSize/2) &&
         y > h/2-Math.round(spawnSize/2) && y > h/2+Math.round(spawnSize/2)) {
          result[x][y] = 0;
      } else {
        if (Math.random() < wall_probability / 100) {
          result[x][y] = 1;
        } else {
          if (Math.random() < 0.5) {
            //spawn coin
            result[x][y] = 2;
          } else {
            //empty
            result[x][y] = 0;
          }
        }
      }
    }
  }
  console.log(result)
  return result;
}

function updatePlayer() {
  camera.up.set(0, 0, 1);

  //gravity
  if (camera.position.z > 1) {
    camera.position.z -= 0.098;
  }

  let phi = -((mouseX - window.innerWidth/2)/5) * Math.PI / 180
  let theta = clamp(((mouseY - window.innerHeight/5)/2) * Math.PI / 180, -Math.PI, Math.PI)
  let r = 1

  let lookat_x = r * Math.cos(phi) * Math.sin(theta);
  let lookat_y = r * Math.sin(phi) * Math.sin(theta);
  let lookat_z = r * Math.cos(theta);

  camera.lookAt(camera.position.x + lookat_x, camera.position.y + lookat_y, camera.position.z + lookat_z)


  //Movement
  if (keyDownArr[87] && player_move_f) {
    //W
    camera.position.y += Math.cos(phi - Math.PI / 2) * 0.05;
    camera.position.x -= Math.sin(phi - Math.PI / 2) * 0.05;
  }
  if (keyDownArr[83] && player_move_b) {
    //S
    camera.position.y += Math.cos(phi + Math.PI / 2) * 0.05;
    camera.position.x -= Math.sin(phi + Math.PI / 2) * 0.05;
  }
  if (keyDownArr[65] && player_move_l) {
    //A
    camera.position.y += Math.cos(phi) * 0.05;
    camera.position.x -= Math.sin(phi) * 0.05;
  }
  if (keyDownArr[68] && player_move_r) {
    //D
    camera.position.y += Math.cos(phi + Math.PI) * 0.05;
    camera.position.x -= Math.sin(phi + Math.PI) * 0.05;
  }

  if(keyDownArr[32]) {
    camera.position.set(0, 0, 5)
  }

  //bind movement to vars
  player_moving_f = keyDownArr[87];
  player_moving_b = keyDownArr[83];
  player_moving_l = keyDownArr[65];
  player_moving_r = keyDownArr[68];

  // console.log(camera.rotation.z)

  

  

  for (let i = 0; i < maze_walls.length; i++) {
    for (let j = 0; j < maze_walls[i].length; j++) {
      if(maze[i][j] != 0) {
        if(areColliding2D(i - maze.length / 2 + 0.5, j - maze.length / 2 + 0.5, 1, 1, camera.position.x, camera.position.y, 0.25, 0.25)) {
          if(maze[i][j] == 1) {

            //block movement based off direction
            if(player_moving_f) {

              //Move back
              camera.position.y -= Math.cos(camera.rotation.z) * 0.05;
              camera.position.x += Math.sin(camera.rotation.z) * 0.05;
            }
            if(player_moving_b) {

              //Move forward
              camera.position.y += Math.cos(camera.rotation.z) * 0.05;
              camera.position.x -= Math.sin(camera.rotation.z) * 0.05;
            }
            if(player_moving_l) {

              //Move right
              camera.position.y += Math.cos(camera.rotation.z - Math.PI / 2) * 0.05;
              camera.position.x -= Math.sin(camera.rotation.z - Math.PI / 2) * 0.05;
            }
            if(player_moving_r) {

              //Move Left
              camera.position.y += Math.cos(camera.rotation.z + Math.PI / 2) * 0.05;
              camera.position.x -= Math.sin(camera.rotation.z + Math.PI / 2) * 0.05;
            }

          } else if(maze[i][j] == 2) {
            maze[i][j] = 0;
            scene.remove(maze_walls[i][j])
            player_move_f = true;
            player_move_b = true;
            player_move_l = true;
            player_move_r = true;
          } else {
            player_move_f = true;
            player_move_b = true;
            player_move_l = true;
            player_move_r = true;
          }
        } 
      }
    }
  }
  
}

function setupInput() {
  window.addEventListener("keydown", ($event) => {
    keyDownArr[$event.keyCode] = 1;
  });
  window.addEventListener("keyup", ($event) => {
    keyDownArr[$event.keyCode] = 0;
  });
  window.addEventListener("mousemove", ($event) => {
    mouseX = $event.pageX;
    mouseY = $event.pageY;
  });
}

function areColliding2D(Ax, Ay, Awidth, Aheight, Bx, By, Bwidth, Bheight) {
    if (Bx - Bwidth/2 <= Ax + Awidth/2) {
        if (Ax - Awidth/2 <= Bx + Bwidth/2) {
            if (By - Bheight/2 <= Ay + Aheight/2) {
                if (Ay - Aheight/2 <= By + Bheight/2) {
                    return 1;
                }
            }
        }
    }
    return 0;
};

function clamp(x, min, max) {
  if(x < min) {
    return min;
  } else if(x > max) {
    return max;
  } else {
    return x;
  }
}