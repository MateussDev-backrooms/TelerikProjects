function DrawNGon(position, sideNum, sideLength, color) {
  let a = 2 * Math.PI / sideNum;
  context.fillStyle = color;
  context.beginPath();
  for(let i=0; i<sideNum; i++) {
    context.lineTo(position.x + sideLength * Math.cos(a * i), position.y + sideLength * Math.sin(a * i));
  }
  context.closePath();
  context.fill();
}

function StrokeNGon(position, sideNum, sideLength, color, thickness) {
  let a = 2 * Math.PI / sideNum;
  context.strokeStyle = color;
  context.lineWidth = thickness;
  context.beginPath();
  for(let i=0; i<sideNum; i++) {
    context.lineTo(position.x + sideLength * Math.cos(a * i), position.y + sideLength * Math.sin(a * i));
  }
  context.closePath();
  context.stroke();
}

function getV(r) {
  let s = r/2;
  return Math.sqrt(r*r-s*s)
}
