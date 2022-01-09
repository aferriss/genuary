/// <reference path="../global.d.ts" />

let orbShader;
let gl;
let renderer;
const rands0 = [];
const rands1 = [];
const rands2 = [];

const n = 100;

function preload() {
  orbShader = loadShader("../shaders/base.vert", "orb.frag");
}

function setup() {
  renderer = createCanvas(windowWidth, windowHeight, WEBGL);

  gl = renderer.GL;

  noStroke();

  for (let i = 0; i < n; i++) {
    rands0.push(random());
    rands1.push(random());
    rands2.push(random());
  }
}



function draw() {

  const sins = [];
  const coss = [];
  let time = frameCount * 0.01;
  for (let i = 0; i < n; i++) {
    const s = sin(time * 1.125 + (i / n) * mouseX * 0.2) * 0.4;
    const c = cos(time * 1.025 + (i / n) * mouseY * 0.2) * 0.4;
    sins.push(s);
    coss.push(c);
  }

  shader(orbShader);
  orbShader.setUniform("time", frameCount * 0.01);
  orbShader.setUniform("res", [width * pixelDensity(), height * pixelDensity()]);
  orbShader.setUniform("rands0", rands0);
  orbShader.setUniform("rands1", rands1);
  orbShader.setUniform("rands2", rands2);
  orbShader.setUniform("sins", sins);
  orbShader.setUniform("coss", coss);
  orbShader.setUniform("mouse", [mouseX, mouseY]);
  plane(width, height);

}