/// <reference path="../global.d.ts" />


let sh;
let fbo;
let rt;


function preload() {
  sh = loadShader("base.vert", "base.frag");
}

function setup() {
  const renderer = createCanvas(windowWidth, windowHeight, WEBGL);

  randomSeed(0);

  fbo = new p5Fbo({ width, height, renderer, interpolationMode: NEAREST });
  rt = new p5Fbo({ width, height, renderer, interpolationMode: NEAREST });
}


function draw() {
  noStroke();

  fbo.begin();
  fbo.clear(1, 0, 0, 1);

  shader(sh);
  sh.setUniform("tex0", rt.getTexture());
  sh.setUniform("res", [width, height]);
  sh.setUniform("time", millis() / 1000);
  plane(width, height);
  fbo.end();

  fbo.copyTo(rt);

  texture(fbo.getTexture());
  plane(width, height);

}
