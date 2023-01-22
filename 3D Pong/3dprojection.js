//Package for functions related to 3d to 2d projection and 3d basics
class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

var screenSize = new Vector2(1280, 720);
var subtractionPoint = new Vector2(screenSize.x/2, screenSize.y/2);

function draw3DObject(img, position, size, angle, transparency) {
  let SS_pos = new Vector2(position.x / position.z + subtractionPoint.x, position.y / position.z + subtractionPoint.y);
  let SS_size = new Vector2(size.x / position.z, size.y / position.z);
  drawImage(img, SS_pos.x, SS_pos.y, SS_size.x, SS_size.y, angle, transparency);
}

function projectVector(realPos) {
  return new Vector2(realPos.x/realPos.z + subtractionPoint.x, realPos.y/realPos.z + subtractionPoint.y);
}

function projectSize(realSize, realPos) {
  return new Vector2(realSize.x/realPos.z, realSize.y/realPos.z);
}
