var myTextStyle = new TextStyle("bold arial 40px", "left", "top", "black");
let a = [];

function init() {
  //runs as soon as engine starts
  for (let i = 0; i < 15; i++) {
    a[i] = Math.trunc(n_randomRange(-850, 850));
  }

  console.log(a);
}

function update() {
  //runs every update tick configured in engine.js
}

function r_update() {
  //runs rendering
  r_drawText(`x: ${I_mouseX}; y: ${I_mouseY}`, I_mouseX, I_mouseY, myTextStyle);
}

function getSmallestElem(arr) {
  //Define variable that stores the largest possible number
  let _candidate = Infinity;

  //Loop through the entire array
  arr.forEach((e) => {
    //Compare the current looped element to the smallest element found yet
    if (e < _candidate) {
      //Save if successful
      _candidate = e;
    }
  });

  //Return the candidate after the array was entirely looped-through
  return _candidate;
}

function getLargestElem(arr) {
  //Define variable that stores the smallest possible number
  let _candidate = -Infinity;

  //Loop through the entire array
  arr.forEach((e) => {
    //Compare the current looped element to the largest element found yet
    if (e > _candidate) {
      //Save if successful
      _candidate = e;
    }
  });

  //Return the candidate after the array was entirely looped-through
  return _candidate;
}
