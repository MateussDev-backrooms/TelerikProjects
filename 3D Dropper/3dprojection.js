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
var camera_position = new Vector3(0, 0, 1);

function projectVector(realPos) {
  return new Vector2(realPos.x/realPos.z + subtractionPoint.x, realPos.y/realPos.z + subtractionPoint.y);
}

function projectSize(realSize, realPos) {
  return new Vector2(realSize.x/realPos.z, realSize.y/realPos.z);
}

function drawBlock(color, transparency, position, size) {
  for (let i=size.z*0.001; i>0; i-=0.025) {
    let _projectedPosition = projectVector(new Vector3(position.x, position.y, position.z+i));
    let _projectedSize = projectSize(new Vector2(size.x, size.y), new Vector3(position.x, position.y, position.z+i));
    DrawRectangle(color, transparency, _projectedPosition.x, _projectedPosition.y, _projectedSize.x, _projectedSize.y, 0);
  }
}

function drawSpriteBlock(image, position, size) {
  for (let i=size.z*0.001; i>0; i-=0.025) {
    let _projectedPosition = projectVector(new Vector3(position.x, position.y, position.z+i));
    let _projectedSize = projectSize(new Vector2(size.x, size.y), new Vector3(position.x, position.y, position.z+i));
    drawImage(image, _projectedPosition.x, _projectedPosition.y, _projectedSize.x, _projectedSize.y, 0);
  }
}

function collision3D(pos1, size1, pos2, size2) {
  if(areColliding(pos1.x, pos1.y, size1.x, size1.y, pos2.x, pos2.y, size2.x, size2.y)) {
    //are colliding on x and y
    if(pos1.z+size1.z > pos2.z && pos1.z < pos2.z+size2.z) {
      return true;
    }
  }
  return false;
}
