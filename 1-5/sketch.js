let renderer;
let gl;

let preFbo;
let fboA;
let fboB;

let sliceShader;
let preShader;

let randVals = [];

function preload() {
  preShader = loadShader("baseGeo.vert", "pre.frag");
  sliceShader = loadShader("base.vert", "slice.frag");

}

function setup() {
  renderer = createCanvas(windowWidth, windowHeight, WEBGL);

  gl = renderer.GL;

  preFbo = new p5Fbo({ width: 1024, height: 1024, renderer, interpolationMode: NEAREST, wrapMode: REPEAT });
  fboA = new p5Fbo({ width: 1024, height: 1024, renderer, interpolationMode: NEAREST, wrapMode: REPEAT });
  fboB = new p5Fbo({ width: 1024, height: 1024, renderer, interpolationMode: NEAREST, wrapMode: REPEAT });

  noStroke();

  randVals[0] = map(random(), 0, 1, 0.25, 0.75);
  randVals[1] = map(random(), 0, 1, 0.25, 0.75);
  randVals[2] = random() < 0.5 ? 0 : 1;
  randVals[3] = random() < 0.5 ? 0 : 1;
}

function draw() {

  preFbo.begin();
  preFbo.clear(1, 1, 1, 1);
  shader(preShader);
  plane(512, 512);
  preFbo.end();

  fboA.begin();
  fboA.clear();
  shader(sliceShader);
  sliceShader.setUniform("lastTex", fboB.getTexture());
  sliceShader.setUniform("preTex", preFbo.getTexture());
  sliceShader.setUniform("res", [fboA.width, fboA.height]);
  sliceShader.setUniform("time", millis() / 1000);
  sliceShader.setUniform("random", randVals);
  sliceShader.setUniform("sliceAmount", random() * 0.05);
  plane(width, height);
  fboA.end();

  fboA.copyTo(fboB);

  texture(fboB.getTexture());
  plane(width, height);

  if (frameCount % 30 == 0) {
    randVals[0] = random();
    randVals[1] = random();
    randVals[2] = random() < 0.5 ? 0 : 1;
    randVals[3] = random() < 0.5 ? 0 : 1;
  } else {
    // randVals[2] = -1.0;
    // randVals[3] = -1.0;
  }


}
