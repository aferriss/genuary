/// <reference path="../global.d.ts" />

let sh;
let fbo;
let rt;
let testShader;
let planeShader;
let data;
let m1;
let sz = 2;

const nPerSide = 100;
const nPlanes = nPerSide * nPerSide;

let dataFbo;
let dataFboRt;
let dataShader;

let gl;

function preload() {
  sh = loadShader("base.vert", "base.frag");
  testShader = loadShader("base.vert", "test.frag");
  planeShader = loadShader("plane.vert", "plane.frag");
  dataShader = loadShader("base.vert", "data.frag");
}

function setup() {
  const renderer = createCanvas(windowWidth, windowHeight, WEBGL);

  gl = renderer.GL;
  // randomSeed(0);

  fbo = new p5Fbo({ width, height, renderer, interpolationMode: NEAREST });
  dataFbo = new p5Fbo({ width: nPerSide, height: nPerSide, renderer, interpolationMode: NEAREST, floatTexture: true });
  dataFboRt = new p5Fbo({ width: nPerSide, height: nPerSide, renderer, interpolationMode: NEAREST, floatTexture: true });


  data = createImage(nPerSide, nPerSide);
  data.loadPixels();
  for (let i = 0; i < data.pixels.length; i += 4) {
    data.pixels[i + 0] = random(0, 255);
    data.pixels[i + 1] = random(0, 255);
    data.pixels[i + 2] = 0;
    data.pixels[i + 3] = 255;

  }
  data.updatePixels();


  // Create a new geometry instance
  m1 = new p5.Geometry();

  // Give it a unique id
  m1.gid = "uniqueName1";

  // These are the default buffers we need to fill
  m1.vertices = [];
  m1.faces = [];
  m1.uvs = [];
  m1.vertexColors = [];

  // This buffer is custom
  m1.id = [];
  m1.dataCoord = [];

  // For as many planes as we want to make...
  for (let i = 0; i < nPlanes; i++) {

    // Add the vertices for a plane
    // 0 ---- 1
    // |      |
    // 2 ---- 3
    m1.vertices.push(
      new p5.Vector(-1 * sz, -1 * sz, 0),
      new p5.Vector(1 * sz, -1 * sz, 0),
      new p5.Vector(-1 * sz, 1 * sz, 0),
      new p5.Vector(1 * sz, 1 * sz, 0)
    );

    // Add the faces, we need to tell p5 how to make faces from the vertices in the last step
    // The order here is important
    m1.faces.push(
      [0 + i * 4, 1 + i * 4, 2 + i * 4],
      [2 + i * 4, 3 + i * 4, 1 + i * 4]
    );

    // Fill the color bufer. I'm using some noise just for fun
    const ii = i * 0.001;
    const amt = 0.1;
    m1.vertexColors.push(
      noise(ii), noise(ii + 1 * amt), noise(ii + 2 * amt), noise(ii + 3 * amt),
      noise(ii + 4 * amt), noise(ii + 5 * amt), noise(ii + 6 * amt), noise(ii + 7 * amt),
      noise(ii + 8 * amt), noise(ii + 9 * amt), noise(ii + 10 * amt), noise(ii + 11 * amt),
      noise(ii + 12 * amt), noise(ii + 13 * amt), noise(ii + 14 * amt), noise(ii + 15 * amt)
    );


    // Ad the uvs
    m1.uvs.push(
      0, 0,
      1, 0,
      0, 1,
      1, 1
    );

    const x = floor(i / nPerSide) / nPerSide;
    const y = (i % nPerSide) / nPerSide;
    // Add the id for our custom buffer. This just gives each plane a unique number
    m1.id.push(i, i, i, i);


    m1.dataCoord.push(x, y, x, y, x, y, x, y);

    mouseX = width / 2;
    mouseY = height / 2;
  }


  // Then add the new render buffer to the renderer for our custom attribute
  renderer.retainedMode.buffers.fill.push(

    new p5.RenderBuffer(
      1, // number of components per vertex
      'id', // src - what we called our buffer in the for loop
      'idBuffer', // dst - this one doesn't really matter I think
      'aId', // attribute name - what we want the attribute in the shader to be called
      renderer // renderer
    ),

    new p5.RenderBuffer(
      2,
      'dataCoord',
      'dataCoordBuffer',
      'aDataCoord',
      renderer
    )

  );

  // const dataTex = renderer.getTexture(data);
  // console.log(dataTex);
  this._renderer.getTexture(data).setInterpolation(NEAREST, NEAREST);
  // data.setInterpolation(NEAREST, NEAREST);
}

function draw() {


  gl.disable(gl.BLEND);
  noStroke();

  dataFbo.begin();
  shader(dataShader);
  dataShader.setUniform("initTex", data);
  dataShader.setUniform("tex0", dataFboRt.getTexture());
  dataShader.setUniform("res", [dataFbo.width, dataFbo.height]);
  dataShader.setUniform("windowRes", [width, height]);
  dataShader.setUniform("time", millis() / 1000);
  dataShader.setUniform("mouse", [mouseX, mouseY]);
  plane(dataFbo.width, dataFbo.height);

  dataFbo.end();

  dataFbo.copyTo(dataFboRt);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
  // fbo.begin();
  clear(0, 0, 0, 1);

  shader(planeShader);
  planeShader.setUniform("res", [width, height]);
  planeShader.setUniform("time", millis() / 1000);
  planeShader.setUniform("tex0", dataFbo.getTexture());
  planeShader.setUniform("nPlanes", nPlanes);
  // // plane(width, height);
  model(m1);
  // fbo.end();


  // dataFbo.draw();
  // fbo.draw();
  // image(data, 0, 0, 100, 100);
  // shader(testShader);
  // testShader.setUniform("tex0", fbo.getTexture());
  // // texture(fbo.getTexture());
  // plane(width, height);

}
