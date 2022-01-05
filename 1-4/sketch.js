let m1;
let shader1;
let noiseShader;
let accShader;
let renderer;
let gl;

// How many planes to make
const nPlanes = 10000;

// Base particle size in pixels
const sz = 2.5;


let noiseFbo;
let fboA;
let fboB;
let geoFbo;


function preload() {
  shader1 = loadShader("particle.vert", "base.frag");
  noiseShader = loadShader("base.vert", "noise.frag");
  accShader = loadShader("base.vert", "acc.frag");
}

function setup() {
  renderer = createCanvas(windowWidth, windowHeight, WEBGL);

  gl = renderer.GL;

  noiseFbo = new p5Fbo({ width, height, renderer });
  geoFbo = new p5Fbo({ width, height, renderer });
  fboA = new p5Fbo({ width, height, renderer });
  fboB = new p5Fbo({ width, height, renderer });

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
    // const ii = i * 0.001;
    // const amt = 0.1;
    // m1.vertexColors.push(
    //   noise(ii), noise(ii + 1 * amt), noise(ii + 2 * amt), noise(ii + 3 * amt),
    //   noise(ii + 4 * amt), noise(ii + 5 * amt), noise(ii + 6 * amt), noise(ii + 7 * amt),
    //   noise(ii + 8 * amt), noise(ii + 9 * amt), noise(ii + 10 * amt), noise(ii + 11 * amt),
    //   noise(ii + 12 * amt), noise(ii + 13 * amt), noise(ii + 14 * amt), noise(ii + 15 * amt)
    // );


    // Ad the uvs
    m1.uvs.push(
      0, 0,
      1, 0,
      0, 1,
      1, 1
    );

    // Add the id for our custom buffer. This just gives each plane a unique number
    m1.id.push(i, i, i, i);
  }

  // Then add the new render buffer to the renderer for our custom attribute
  renderer.retainedMode.buffers.fill.push(

    new p5.RenderBuffer(
      1, // number of components per vertex
      'id', // src - what we called our buffer in the for loop
      'idBuffer', // dst - this one doesn't really matter I think
      'aId', // attribute name - what we want the attribute in the shader to be called
      renderer // renderer
    )

  );

  noStroke();
}

function draw() {
  // Use a custom shader

  noiseFbo.begin();
  shader(noiseShader);
  noiseShader.setUniform("res", [width, height]);
  noiseShader.setUniform("time", millis() / 1000);
  plane(width, height);
  noiseFbo.end();

  // texture(noiseFbo.getTexture());
  // plane(width, height);
  // Draw our mesh n times with different seeds
  geoFbo.begin();
  geoFbo.clear(0, 0, 0, 0);
  for (let i = 0; i < 3; i++) {
    shader(shader1);
    shader1.setUniform("time", frameCount * 0.5);
    shader1.setUniform("res", [width, height]);
    shader1.setUniform("nPlanes", nPlanes);
    shader1.setUniform("seed", i);
    shader1.setUniform("noiseTex", noiseFbo.getTexture());
    model(m1);
  }
  geoFbo.end();

  fboA.begin();
  fboA.clear();
  shader(accShader);
  accShader.setUniform("res", [width, height]);
  accShader.setUniform("curTex", geoFbo.getTexture());
  accShader.setUniform("lastTex", fboB.getTexture());
  plane(width, height);
  fboA.end();

  fboA.copyTo(fboB);

  texture(fboA.getTexture());
  plane(width, height);
  //   // Draw the mesh
  // }


}