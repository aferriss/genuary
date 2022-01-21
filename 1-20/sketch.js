/// <reference path="../global.d.ts" />

let sh;

function preload() {
  sh = loadShader("base.vert", "base.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}


function draw() {
  noStroke();


  shader(sh);
  sh.setUniform("res", [width, height]);
  sh.setUniform("time", millis() / 1500);
  // sh.setUniform("mouse", [mouseX * 0.05, mouseY * 0.05]);
  sh.setUniform("mouse", [10, 20]);
  plane(width, height);

}
