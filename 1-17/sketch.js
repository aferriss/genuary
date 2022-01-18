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
  sh.setUniform("time", millis() / 1000);
  sh.setUniform("mouse", [mouseX * 0.05, mouseY * 0.05]);
  plane(width, height);

}
