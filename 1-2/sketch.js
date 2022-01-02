
let shader1;
let renderer;
let gl;

let inputBuffer;
let inputShader;
let textureShader;
let ditherShader;
let displayShader;
let drawingShader;

let fboA;
let fboB;
let inputFbo;
let drawingFbo;
let drawingFboRt;


function preload() {
  inputShader = loadShader("base.vert", "input.frag");
  textureShader = loadShader("base.vert", "../shaders/texture.frag");
  ditherShader = loadShader("base.vert", "dither.frag");
  displayShader = loadShader("base.vert", "display.frag");
  drawingShader = loadShader("base.vert", "drawing.frag");
}


let w = 128 * 2;
let h = 128 * 2;
function setup() {

  renderer = createCanvas(1024, 1024, WEBGL);

  gl = renderer.GL;

  // Iput fbo is whatever we want to dither
  // We put noise in the g and b channels in the input shader, so only the red channel
  // will be dithered
  inputFbo = new p5Fbo({ width: w, height: h, renderer, interpolationMode: NEAREST });

  drawingFbo = new p5Fbo({ width: w, height: h, renderer, interpolationMode: NEAREST });
  drawingFboRt = new p5Fbo({ width: w, height: h, renderer, interpolationMode: NEAREST });

  // set up two buffers to ping pong the shaders
  // fboA will do the work
  // fboB will just copy fboA, so that fboA can read itself
  fboA = new p5Fbo({ width: w, height: h, renderer, interpolationMode: NEAREST });
  fboB = new p5Fbo({ width: w, height: h, renderer, interpolationMode: NEAREST });

  noStroke();

}

let loops = 1;
function draw() {

  drawingFbo.begin();
  drawingFbo.clear(0, 0, 0, 1);
  shader(drawingShader);
  drawingShader.setUniform("res", [w, h]);
  drawingShader.setUniform("mouse", [mouseX / width, 1.0 - mouseY / width]);
  drawingShader.setUniform("tex0", drawingFboRt.getTexture());
  plane(w, h);
  drawingFbo.end();

  drawingFbo.copyTo(drawingFboRt);

  // Draw some input
  inputFbo.begin();
  inputFbo.clear(1, 0, 0, 1);
  shader(inputShader);
  inputShader.setUniform("time", millis() / 1000);
  inputShader.setUniform("res", [w, h]);
  inputShader.setUniform("tex0", drawingFbo.getTexture());
  plane(w, h);
  inputFbo.end();

  // Copy to fboB
  inputFbo.copyTo(fboB);


  // We do our error diffusion for a limited amount of steps
  // Generally, more steps gives better results, at the expense of perf
  for (let i = 0; i < 12; i++) {
    fboA.begin();
    fboA.clear();
    shader(ditherShader);
    ditherShader.setUniform("tex0", fboB.getTexture());
    ditherShader.setUniform("res", [w, h]);

    // X goes 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2 ...
    // Y goes 0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 0 ...
    ditherShader.setUniform("p", [i % 2, Math.floor((i / 2) % 2)]);

    plane(w, h);

    fboA.end();


    // Just copy fboA to fboB
    fboA.copyTo(fboB);
  }

  // Draw to screen
  shader(displayShader);
  displayShader.setUniform("tex0", fboB.getTexture());

  // texture(drawingFbo.getTexture());
  plane(width, height);

}