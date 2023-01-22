let ground;

let box, coin, cylinder;

let maze, maze_walls;

let keyDownArr = Array(256).fill(0); // Generates 256 long empty array for all keyboard buttons

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

  //setup default geometries
  box = new THREE.BoxGeometry(1, 1, 1);
  coin = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 12);

  maze = [];
  maze = generateRandomMazeMap(64, 64, 25);
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
        scene.add(maze_walls[i][j]);
      } else if (maze[i][j] == 2) {
        maze_walls[i][j] = new THREE.Mesh(coin, coin_material);
        maze_walls[i][j].position.set(
          i - maze.length / 2 + 0.5,
          j - maze.length / 2 + 0.5,
          1
        );
        maze_walls[i][j].rotation.z = i * j;
        scene.add(maze_walls[i][j]);
      } else {
      }
    }
  }
  // Point light
  const l1 = new THREE.PointLight("white", 0.4);
  l1.position.set(-1, -2, 4);

  // Ambient light
  const l2 = new THREE.AmbientLight("yellow", 0.3);

  // Directional light
  const l3 = new THREE.DirectionalLight("white", 0.7);
  l3.position.set(-4, -4, 5);
  l3.lookAt(0, 0, 0);

  // Add all objects to scene
  scene.add(l1, l2, l3, ground);
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
  updatePlayer();
}

function generateRandomMazeMap(w, h, wall_probability) {
  let result = [];
  for (let x = 0; x < w; x++) {
    result[x] = [];
    for (let y = 0; y < h; y++) {
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
  return result;
}

function updatePlayer() {
  camera.up.set(0, 0, 1);

  //gravity
  if (camera.position.z > 1) {
    camera.position.z -= 0.098;
  }

  //Movement
  if (keyDownArr[87]) {
    //W
    camera.position.y += Math.cos(camera.rotation.y) * 0.05;
    camera.position.x -= Math.sin(camera.rotation.y) * 0.05;
  }
  if (keyDownArr[83]) {
    //S
    camera.position.y -= Math.cos(camera.rotation.y) * 0.05;
    camera.position.x += Math.sin(camera.rotation.y) * 0.05;
  }
  if (keyDownArr[65]) {
    //A
    camera.position.y += Math.cos(camera.rotation.y + Math.PI / 2) * 0.05;
    camera.position.x -= Math.sin(camera.rotation.y + Math.PI / 2) * 0.05;
  }
  if (keyDownArr[68]) {
    //D
    camera.position.y += Math.cos(camera.rotation.y - Math.PI / 2) * 0.05;
    camera.position.x -= Math.sin(camera.rotation.y - Math.PI / 2) * 0.05;
  }

  if (keyDownArr[39]) {
    //Right arrow
    camera.rotation.y -= 0.05;
  }
  if (keyDownArr[37]) {
    //Left arrow
    camera.rotation.y += 0.05;
  }

  
}

function setupInput() {
  window.addEventListener("keydown", ($event) => {
    keyDownArr[$event.keyCode] = 1;
  });
  window.addEventListener("keyup", ($event) => {
    keyDownArr[$event.keyCode] = 0;
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