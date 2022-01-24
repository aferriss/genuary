/// <reference path="../global.d.ts" />

let fb;
let mapSh;

let fbo;
let rt;

function preload() {
  fb = loadShader("base.vert", "fb.frag");
  mapSh = loadShader("base.vert", "map.frag");
}

function setup() {
  const renderer = createCanvas(windowWidth, windowHeight, WEBGL);

  fbo = new p5Fbo({ width: 1024, height: 1024, renderer, interpolationMode: LINEAR });
  rt = new p5Fbo({ width: 1024, height: 1024, renderer, interpolationMode: LINEAR });
}


function draw() {
  noStroke();

  fbo.begin();
  clear(0, 0, 0, 1);
  shader(fb);
  fb.setUniform("res", [fbo.width, fbo.height]);
  fb.setUniform("time", millis() / 1500);
  fb.setUniform("tex0", rt.getTexture());
  // sh.setUniform("mouse", [mouseX * 0.05, mouseY * 0.05]);
  plane(fbo.width, fbo.height);

  fbo.end();

  fbo.copyTo(rt);

  shader(mapSh);
  mapSh.setUniform("res", [width * pixelDensity(), height * pixelDensity()]);
  mapSh.setUniform("time", millis() / 1500);
  mapSh.setUniform("tex0", fbo.getTexture());
  plane(width, height);


}
