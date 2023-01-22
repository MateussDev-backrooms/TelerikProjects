var verletTime = 1;
var verletGravity = new Vector2(0, 0);

class VerletObject {
  constructor(position, radius) {
    this.position = position;
    this.old_position = position;
    this.acceleration = new Vector2(0, 0);
    this.radius = radius;
  }
  updatePosition() {
    const velocity = new Vector2(this.position.x - this.old_position.x, this.position.y - this.old_position.y);
    this.old_position = this.position;
    //verlet formula
    this.position.x = this.position.x + velocity.x + this.acceleration.x * Math.pow(verletTime, 2);
    this.position.y = this.position.y + velocity.y + this.acceleration.y * Math.pow(verletTime, 2);

    this.acceleration = new Vector2(0, 0);
  }
  accelerate(acc) {
    this.acceleration.x += acc.x;
    this.acceleration.y += acc.y
  }
  fixCollision(other) {
    const _ang = angleFrom2Pos(this.position, other.position);
    const _acc = new Vector2(-Math.cos(_ang), -Math.sin(_ang))
    other.accelerate(_acc);
  }
}

var verlectObjectArray = [];

function CreateVerletObject(object) {
  verlectObjectArray.push(object);
}
class Solver {
  constructor(quality) {
    this.quality_ss = quality;
  }
  update() {
    //verletTime = deltaTime/deltaTime;

    for(let i=0; i<this.quality_ss; i++) {
      this.SolveGravity();
      this.SolveCollisions();
      this.SolveBounds();
      verlectObjectArray.forEach((obj, i) => {
        obj.updatePosition();
      });
    }
  }

  SolveCollisions() {
    verlectObjectArray.forEach((obj, i) => {

      //solve collisions
      verlectObjectArray.forEach((other_obj, i) => {
        if(obj != other_obj) {
          if(SphereCollision(obj.position, obj.radius, other_obj.position, other_obj.radius)) {
            //other_obj.fixCollision(obj);
            obj.fixCollision(other_obj);
          }
        }
      });
    });
  }

  SolveGravity() {
    verlectObjectArray.forEach((obj, i) => {
      obj.accelerate(verletGravity);
    });
  }

  SolveBounds() {
    verlectObjectArray.forEach((obj, i) => {
      if(obj.position.x + obj.radius > 1280) {
        obj.acceleration.x = -obj.radius;
      }
      if(obj.position.x - obj.radius < 0) {
        obj.acceleration.x = obj.radius;
      }
      if(obj.position.y + obj.radius > 1280) {
        obj.acceleration.y = -obj.radius;
      }
      if(obj.position.y - obj.radius < 0) {
        obj.acceleration.y = obj.radius;
      }
    });
  }
  RenderVerlet(color) {
    verlectObjectArray.forEach((obj, i) => {
      DrawNGon(obj.position, 16, obj.radius, color);
    });

  }
  StrokeVerlet(color, thk) {
    verlectObjectArray.forEach((obj, i) => {
      StrokeNGon(obj.position, 16, obj.radius, color, thk);
    });

  }
}
