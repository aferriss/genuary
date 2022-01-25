/// <reference path="../global.d.ts" />

let fb;
let mapSh;

let fbo;
let rt;
let rand;

function preload() {
  fb = loadShader("base.vert", "fb.frag");
  mapSh = loadShader("base.vert", "map.frag");
  rand = loadImage("rand.png");
}

function setup() {
  const renderer = createCanvas(windowWidth, windowHeight, WEBGL);

  fbo = new p5Fbo({ width: 1024, height: 1024, renderer, interpolationMode: LINEAR, wrapMode: REPEAT });
  rt = new p5Fbo({ width: 1024, height: 1024, renderer, interpolationMode: LINEAR, wrapMode: REPEAT });
}


function draw() {
  noStroke();

  fbo.begin();
  clear(1, 0, 0, 1);
  shader(fb);
  fb.setUniform("res", [fbo.width * pixelDensity(), fbo.height * pixelDensity()]);
  fb.setUniform("time", millis() / 1500);
  fb.setUniform("tex0", rt.getTexture());
  fb.setUniform("tex1", rand);
  // sh.setUniform("mouse", [mouseX * 0.05, mouseY * 0.05]);
  plane(fbo.width, fbo.height);

  fbo.end();

  fbo.copyTo(rt);

  // shader(mapSh);
  // mapSh.setUniform("res", [width * pixelDensity(), height * pixelDensity()]);
  // mapSh.setUniform("time", millis() / 1500);
  // mapSh.setUniform("tex0", fbo.getTexture());
  texture(fbo.getTexture());
  plane(width, height);


}
