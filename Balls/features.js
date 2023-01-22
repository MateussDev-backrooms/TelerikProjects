//Features.js
//Here are all of the features, internally coded in Mateuss Engine
//This works the same as game.js, but I don't reccomend putting here update() or other similar functions. Their place is in game.js

//FuncIo
let deltaFuncTime = 0;
//Newtonus
let gravity = 1.9,
    bodyID = 0,
    bodyOtherID = 0,
    bodyAmount = 0,
    bodyType = [],
    bodyX = [],
    bodyY = [],
    bodyW = [],
    bodyH = [],
    bodyVX = [],
    bodyVY = [],
    bodyName = [],
    bodyMass = [],
    bodyBounciness = [],
    bodyFriction = [],
    bodyImpactRes = [],
    bodyBorderCollision = [];
//FX Maestro
let CamX = 0,
    CamY = 0,
    OldCamX = 0,
    OldCamY = 0,
    SaveOldCamPos = true,
    FXShakeDeltaTime = 0,
    FXFlareDeltaTime = 0,
    FlareTransparency = 1;

//Internal Builders:

//FuncIo
function GetOneRelativePos(x, rel_x) {
    //x is the object a, that is relative to rel_x
    return x - rel_x;
}

function SmoothFloatVar(needed_value, smooth_factor) {
    //This MUST be called in update/function that will be in update/draw or the whole smoothing is broken
    let target_value = 0;
    return target_value + (needed_value - target_value) / smooth_factor;
}

function IsHittingLeftWall(myX, myY, width, height) {
    if (myX < 0) {
        return 1;
    } else {
        return 0;
    }
}

function IsHittingRightWall(myX, myY, width, height) {
    if (myX > 1280 - width) {
        return 1;
    } else {
        return 0;
    }
}

function IsHittingUpperWall(myX, myY, width, height) {
    if (myY < 0) {
        return 1;
    } else {
        return 0;
    }
}

function IsHittingLowerWall(myX, myY, width, height) {
    if (myY > 720 - height) {
        return 1;
    } else {
        return 0;
    }
}

function IsHittingAnyWall(myX, myY, width, height) {
    if (IsHittingLeftWall(myX, myY, width, height) || IsHittingRightWall(myX, myY, width, height) || IsHittingUpperWall(myX, myY, width, height) || IsHittingLowerWall(myX, myY, width, height)) {
        return 1;
    } else {
        return 0;
    }
}

function IsClicked(buttonx, buttony, width, height) {
    if (areColliding(buttonx, buttony, width, height, mouseX, mouseY, 1, 1) && Mouse) {
        return 1;
    }
}

function IsHoveringAbove(buttonx, buttony, width, height) {
    if (areColliding(buttonx, buttony, width, height, mouseX, mouseY, 1, 1)) {
        return 1;
    }
}

function IsHeld(buttonx, buttony, width, height, time) {
    //this might break your timed functions, so make deltaTime2
    deltaFuncTime = 0;
    if (areColliding(buttonx, buttony, width, height, mouseX, mouseY, 1, 1) && Mouse) {
        if (deltaFuncTime >= time) {
            return 1;
        }
    }
}


function TimeDelay(ms) {
    //When using in a function write async before the function and write await before TimeDelay()
    //If you want to understand this more: https://www.sitepoint.com/delay-sleep-pause-wait/ (Also source of knoledge)
    //Honestly I don't understand a half of the code, but it works ¯\_(ツ)_/¯
    //When using this function without await the whole code stops
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function DrawRectangle(rgb, transparency, x, y, width, height, angle) {
    //Color must be in RGBA (https://htmlcolorcodes.com/color-picker/ - link to online hex color picker)
    //To properly colour the rectangle type this: 'rgb(amount_of_red_here, amount_of_green_here, amount_of_blue_here)'
    //The '' are important
    //This basically tells the Java Script to render a rectangle shape and paint it
    context.fillStyle = rgb;
    context.globalAlpha = transparency;
    context.save();
    context.translate(x + width / 2, y + height / 2);
    context.rotate(angle * Math.PI / 180);
    context.translate(- x - width / 2, - y - height / 2);
    context.restore();
    context.fillRect(x, y, width, height);
}

//Newtonus
function Newtonus_PhysicsTick() {
    //Go through each physics obj
    //debug dragging

    for (bodyID = 0; bodyID < bodyAmount; bodyID++) {
        Newtonus_Collision();
        //If the body is a normal Rigidbody
        if (bodyType[bodyID] == 0) {
            //Change position with velocity
            bodyX[bodyID] += bodyVX[bodyID];
            bodyY[bodyID] += bodyVY[bodyID];

            //Assign gravity
            bodyVY[bodyID] += gravity / bodyMass[bodyID];

            //Check if the body can hit the borders
            if (bodyBorderCollision[bodyID]) {
                //Check the actual collision with any border

                //Left border:
                if (IsHittingLeftWall(bodyX[bodyID], bodyY[bodyID], bodyW[bodyID], bodyH[bodyID])) {
                    //console.log("hits left wall")
                    if (bodyVX[bodyID] < -0.2 || bodyVX[bodyID] > 0.1) {
                        //bounce from the wall
                        bodyVX[bodyID] = -bodyVX[bodyID] * bodyBounciness[bodyID] * (bodyImpactRes[bodyID] * 2);
                    } else {
                        //if too slow, then remove all unneded velocity
                        bodyX[bodyID] = 0;
                        bodyVX[bodyID] = 0.1;

                    }
                }

                //Right border
                if (IsHittingRightWall(bodyX[bodyID], bodyY[bodyID], bodyW[bodyID], bodyH[bodyID])) {
                    //console.log("hits right wall")
                    if (bodyVX[bodyID] > 0.2) {
                        //bounce from the wall
                        bodyVX[bodyID] = -bodyVX[bodyID] * bodyBounciness[bodyID] * (bodyImpactRes[bodyID] * 2);
                    } else {
                        //if too slow, then remove all unneded velocity
                        bodyX[bodyID] = 1280 - bodyW[bodyID];
                        bodyVX[bodyID] = -0.1;
                    }
                }

                //Upper border:
                if (IsHittingUpperWall(bodyX[bodyID], bodyY[bodyID], bodyW[bodyID], bodyH[bodyID])) {
                    //console.log("hits top wall")
                    if (bodyVY[bodyID] < -0.2) {
                        //bounce from the wall
                        bodyVY[bodyID] = -bodyVY[bodyID] * bodyBounciness[bodyID] * (bodyImpactRes[bodyID] * 2);
                    } else {
                        //if too slow, then remove all unneded velocity
                        bodyY[bodyID] = 0;
                        bodyVY[bodyID] = 0.1;
                    }
                }

                //Lower border:
                if (IsHittingLowerWall(bodyX[bodyID], bodyY[bodyID], bodyW[bodyID], bodyH[bodyID])) {
                    //console.log("hits bottom wall")
                    bodyVX[bodyID] *= bodyFriction[bodyID];
                    if (bodyVY[bodyID] < -0.2) {
                        //bounce from the wall
                        bodyVY[bodyID] = -bodyVY[bodyID] * bodyBounciness[bodyID] * (bodyImpactRes[bodyID] * 2);

                    } else {
                        //if too slow, then remove all unneded velocity
                        bodyY[bodyID] = 720 - bodyH[bodyID];
                        bodyVY[bodyID] = 0.1;
                    }
                }
            }
        }
        if (bodyType[bodyID] == 1) {
            //When the object is just a platform/unmovable solid

            //Literally do nothing lol
        }
    }
}

function Newtonus_RenderBodies() {
    for (bodyID = 0; bodyID < bodyAmount; bodyID++) {
        if (bodyName[bodyID] == "Box") {
            drawImage(box, bodyX[bodyID], bodyY[bodyID], bodyW[bodyID], bodyH[bodyID], 0);
        } else {
            DrawRectangle('magenta', 100, bodyX[bodyID], bodyY[bodyID], bodyW[bodyID], bodyH[bodyID]);
        }
    }
}

function Newtonus_Collision() {
    for (bodyOtherID = 0; bodyOtherID < bodyAmount; bodyOtherID++) {
        if (areColliding(bodyX[bodyID], bodyY[bodyID], bodyW[bodyID], bodyH[bodyID], bodyX[bodyOtherID], bodyY[bodyOtherID], bodyW[bodyOtherID], bodyH[bodyOtherID]) && bodyOtherID != bodyID) {
            //Behavour like bouncing from walls
            bodyVY[bodyID] = bodyVY[bodyID] = -bodyVY[bodyID] * bodyBounciness[bodyID] * (bodyImpactRes[bodyID] * 2);
            bodyVY[bodyOtherID] = bodyVY[bodyID]
            bodyVX[bodyID] = bodyVX[bodyID] = -bodyVX[bodyID] * bodyBounciness[bodyID] * (bodyImpactRes[bodyID] * 2);
            bodyVX[bodyOtherID] = bodyVX[bodyID]
            //FRICTION
            bodyVX[bodyID] *= bodyFriction[bodyID];
        }
    }
}

function FindDeepness(x, width, otherX, otherWidth) {
    return (x - (width / 2)) - (otherX - (otherWidth / 2));
}

function Newtonus_Add_Body(name, type, x, y, width, height, mass, friction, velX, velY, bounciness, impact_resistance, border_collision) {
    /*
      name is the name of your object
      type is what type of physical body your object is
      x and y are starting coordinates
      width and height are the size of your object
      mass is how heavy your object is
      friction is how much the velocity of your object is remuved, when colliding with something (0 - will stop right away, 1 - will not slow down)
      velX and velY are the starting speed
      bounciness is how much much the object should bounce (0 - will not bounce at all, 1 - will bounce away with the same force or bounce forever)
      impact_resistance is how much your object will absorb the force from impacting with another object (0 - will absorb any force put on it, 1 - will not absorb any force)
      border_collision is a bool, that will determine will the object bounce off the screen
    */
    //Assign these values to an ID
    bodyName[bodyAmount] = name;
    bodyType[bodyAmount] = type;
    bodyX[bodyAmount] = x;
    bodyY[bodyAmount] = y;
    bodyW[bodyAmount] = width;
    bodyH[bodyAmount] = height;
    bodyMass[bodyAmount] = mass;
    bodyFriction[bodyAmount] = friction;
    bodyVX[bodyAmount] = velX;
    bodyVY[bodyAmount] = velY;
    bodyBounciness[bodyAmount] = bounciness;
    bodyImpactRes[bodyAmount] = impact_resistance;
    bodyBorderCollision[bodyAmount] = border_collision;
    bodyAmount++;
}

//FX Maestro
//Tutorial:
//Use the functions, like ScreenShake() at any point
//To use ScreenShake() properly add CamX and CamY from all of the objects rendered on screen
//NOTE: On update() any effect repeats

async function ScreenShake(power, duration) {
    //Power is how much pixels the camera moves
    //Duration is how long the screen will shake in milliseconds
    SaveOldCamPos = false;
    FXShakeDeltaTime = 0;
    while (FXShakeDeltaTime <= duration) {
        FXShakeDeltaTime++;
        if (randomInteger(2) != 1) {
            CamX = randomInteger(power + 1);
            CamY = randomInteger(power + 1);
        } else {
            CamX = -randomInteger(power + 1);
            CamY = -randomInteger(power + 1);
        }
        await TimeDelay(1);

    }
    CamX = OldCamX;
    CamY = OldCamY;
    SaveOldCamPos = true;
}

async function ScreenFlare(duration, color) {
    //Duration is how long the screen will stay the color you picked
    //color must be in rgb format (see FuncIo's guide to DrawRectangle())
    //Must be in either render, a function directly linked to render or draw
    //Most reccomended duration is 100 milliseconds
    FXFlareDeltaTime = 0;
    FlareTransparency = 1;

    while (FXFlareDeltaTime <= duration) {
        FXFlareDeltaTime++;
        FlareTransparency -= 0.01;
        DrawRectangle(color, FlareTransparency, 0, 0, 1280, 720);
        await TimeDelay(1);
    }
    FlareTransparency = 0;
}



function Save_old_cam_pos() {
    if (SaveOldCamPos) {
        OldCamX = CamX;
        OldCamY = CamY;
    }
}
