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

function getPosIn1DArray(array, width) {
  let _arr = [];
  for(let i=0; i<array.length; i++) {
    _arr[i] = new Vector2(i%width, Math.floor(i/width));
  }
  return _arr;
}

function getPosIn1DArrayID(array, width, index) {
  return new Vector2(index%width, Math.floor(index/width));
}

function getIndexFromArrayPosition(array, width, x, y) {
  return (width * y + x) -1;
}

function avgArray(array) {
  let _val = 0;
  for(let i=0; i<array.length; i++) {
    if(array[i] != NaN) {
      if(i>0) {
        _val = (_val+array[i])/2
      } else if (i==0) {
        _val = array[i];
      }
    }
  }
  return _val;
}
