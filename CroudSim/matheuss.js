class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  length(){
    return Math.abs(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)));
  }
  inv(){
    return new Vector2(-this.x, -this.y);
  }
}

function Lerp(a, b, t) {
  return (1 - t) * a + t * b;
}

function VLerp(va, vb, vt) {
  return new Vector2(Lerp(va.x, vb.x, vt), Lerp(va.y, vb.y, vt));
}

function ToRad(x) {
  return x * Math.PI/180;
}

function ToDeg(x) {
  return x * (180/Math.PI);
}

function angleFrom2Pos(pos1, pos2) {
  return Math.atan2(pos1.y - pos2.y, pos1.x - pos2.x);
}

function dist(pos1, pos2) {
  let _a = pos1.x - pos2.x, _b = pos1.y - pos2.y;
  return Math.sqrt(Math.pow(_a, 2) + Math.pow(_b, 2));
}
