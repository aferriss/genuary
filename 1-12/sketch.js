/// <reference path="../global.d.ts" />

let xStep = 0;
let yStep = 0;


let x = 0;
let y = 0;

const steps = 15.0;
let xSteps = steps;
let ySteps = steps;

let rounds = 1;
let colors = [0, 255];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  stroke(255);
  fill(255);
}

let doX = true;
let doY = false;

function moveLeft() {
  x += width / steps;
}

function moveRight() {
  x -= width / steps;
}

function moveUp() {
  y -= height / steps;
}

function moveDown() {
  y += height / steps;
}

let goLeft = true;
let goRight = false;
let goDown = false;
let goUp = false;
let bo = false;

function draw() {

  translate(-width / 2, -height / 2);

  const w = width / steps;
  const h = height / steps;

  rect(x, y, w, h);


  if (goLeft) {
    moveLeft();
    xStep++;
    if (xStep == xSteps) {
      goLeft = false;
      goDown = true;
      x -= w;
      if (bo) {
        xSteps--;
      }
      xStep = 0;
    }
  }

  if (goDown) {
    moveDown();
    yStep++;
    if (yStep == ySteps) {
      goDown = false;
      goRight = true;
      y -= h;
      ySteps--;
      yStep = 0;
    }
  }

  if (goRight) {
    moveRight();
    xStep++;
    if (xStep == xSteps) {
      console.log("right end");
      goRight = false;
      goUp = true;
      x += w;
      xSteps--;
      xStep = 0;
    }
  }

  if (goUp) {
    moveUp();
    yStep++;
    if (yStep == ySteps) {
      goUp = false;
      goLeft = true;
      y += h;
      ySteps--;
      yStep = 0;
      bo = true;
    }
  }

  if (frameCount % (steps * steps + 7) == 0) {
    x = 0;
    y = 0;

    bo = false;

    xSteps = steps;
    ySteps = steps;
    xStep = 0;
    yStep = 0;

    goRight = false;
    goLeft = true;
    goUp = false;
    goDown = false;

    rounds++;
    fill(colors[rounds % colors.length]);
    stroke(colors[rounds % colors.length]);
  }


}
