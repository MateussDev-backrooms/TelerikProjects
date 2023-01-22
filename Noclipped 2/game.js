//Three.js boilerplate
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const camHelper = new THREE.CameraHelper(camera)

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMapx
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Base game
const g_cube = new THREE.BoxGeometry(1, 1, 1);
const g_floor = new THREE.BoxGeometry(64, 64, 0.1);

//Define base materials
const m_cube = new THREE.MeshStandardMaterial({ color: "yellow" });
const m_floor = new THREE.MeshStandardMaterial({ color: 0xffffff });

const cube = new THREE.Mesh(g_cube, m_cube);
const floor = new THREE.Mesh(g_floor, m_floor);
floor.position.z = -0.5;
floor.receiveShadow = true;

const light_1 = new THREE.PointLight( 0xffffff, 1, 100 );
light_1.position.z = 20;
light_1.castShadow = true;

const light_amb = new THREE.AmbientLight( "yellow", 0.5);



generateRandomMaze(64, 64, 5);

//add all objects to scene
scene.add(light_1);
scene.add(light_amb);
scene.add(floor);

//spawn camera
camera.position.x = 1;
camera.position.y = 0;
camera.position.z = 0;


camera.lookAt(0, 0, 0)
camera.rotation.z = 0
camera.rotation.x = Math.PI/2
camera.up.set(0, 0, 1)

function update() {
    
    if(I_keypress[87]) {
        camera.position.x -= 0.033
    }
    if(I_keypress[83]) {
        camera.position.x += 0.033
    }
    if(I_keypress[65]) {
        camera.position.y -= 0.033
    }
    if(I_keypress[68]) {
        camera.position.y += 0.033
    }
}

function redraw() {
  requestAnimationFrame(redraw);
  renderer.render(scene, camera);
}

redraw();
setInterval(update, 10);


function generateRandomMaze(w, h, centerRad) {
    let map = [];
    for(let x=-w/2; x<w/2; x++) {
        map[x] = []
        for(let y=-h/2; y<h/2; y++) {
            map[x][y] = Math.round(Math.random())
        }
    }

    for(let x=-w/2; x<w/2; x++) {
        for(let y=-h/2; y<h/2; y++) {
            if(map[x][y] != 1 
                || x <= centerRad/2 && x >= -centerRad/2
                && y <= centerRad/2 && y >= -centerRad/2
                || x == 0 && y == 0) {
            } else {
                let i_wall = new THREE.Mesh(g_cube, m_cube);
                i_wall.position.set(x, y, 0);
                i_wall.receiveShadow = true;
                i_wall.castShadow = true;
                scene.add(i_wall);

            }
        }
    }
}