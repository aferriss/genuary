let renderer;
let gl;

let preFbo;
let fboA;
let fboB;
let noiseFbo;

let sliceShader;
let preShader;
let noiseShader;

let randVals = [];
let palette;

function preload() {
  preShader = loadShader("baseGeo.vert", "pre.frag");
  sliceShader = loadShader("base.vert", "slice.frag");
  noiseShader = loadShader("base.vert", "noise.frag");
  palette = loadImage("palette.png");
}

function setup() {
  renderer = createCanvas(windowWidth, windowHeight, WEBGL);

  gl = renderer.GL;

  preFbo = new p5Fbo({ width: 1024, height: 1024, renderer, interpolationMode: NEAREST, wrapMode: REPEAT });
  fboA = new p5Fbo({ width: 1024, height: 1024, renderer, interpolationMode: NEAREST, wrapMode: REPEAT });
  fboB = new p5Fbo({ width: 1024, height: 1024, renderer, interpolationMode: NEAREST, wrapMode: REPEAT });
  noiseFbo = new p5Fbo({ width: width, height: height, renderer, interpolationMode: LINEAR, wrapMode: CLAMP });

  noStroke();

  randVals[0] = map(random(), 0, 1, 0.25, 0.75);
  randVals[1] = map(random(), 0, 1, 0.25, 0.75);
  randVals[2] = random() < 0.5 ? 0 : 1;
  randVals[3] = random() < 0.5 ? 0 : 1;
}

function draw() {

  // noiseFbo.begin();
  // noiseFbo.clear();
  shader(noiseShader);
  noiseShader.setUniform("res", [width, height]);
  noiseShader.setUniform("time", frameCount * 0.1);
  noiseShader.setUniform("tex0", palette);
  noiseShader.setUniform("mouse", [mouseX / width, mouseY / height]);
  plane(width, height);


  // noiseFbo.end();

  // texture(noiseFbo.getTexture());
  // plane(width, height);



}
