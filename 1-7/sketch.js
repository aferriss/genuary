let m1;
let shader1;
let renderer;
let gl;

// How many planes to make
const nPlanes = 30;

let fbo;
let textureShader;

const scl = 1.0;

function preload() {
  shader1 = loadShader('base.vert', 'base.frag');
}

function setup() {
  renderer = createCanvas(windowWidth, windowHeight, WEBGL);

  gl = renderer.GL;

  fbo = new p5Fbo({
    width: width / scl,
    height: height / scl,
    renderer,
    interpolationMode: NEAREST
  });

  // Create a new geometry instance
  m1 = new p5.Geometry();

  // Give it a unique id
  m1.gid = 'uniqueName1';

  // These are the default buffers we need to fill
  m1.vertices = [];
  m1.faces = [];
  m1.uvs = [];
  m1.vertexColors = [];

  // This buffer is custom
  m1.id = [];

  const pts = [];

  for (let i = 0; i < nPlanes; i++) {
    pts.push({
      x: random() * fbo.width - fbo.width / 2,
      y: random() * fbo.height - fbo.height / 2,
      z: random() * fbo.width - fbo.width / 2
    });
  }

  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    for (let j = 0; j < pts.length; j++) {
      const b = pts[j];
      m1.vertices.push(
        new p5.Vector(a.x, a.y, a.z),
        new p5.Vector(b.x, b.y, b.z)
      );

      m1.uvs.push(0, 0, 1, 1);

      const idx = i * nPlanes + j;
      m1.id.push(idx, idx);
    }
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

  // A custom function I added to the renderer
  renderer.setDrawMode(gl.LINES);
}
let inc = 0;
function draw() {
  fbo.begin();
  fbo.clear(0, 0, 0, 0);

  shader(shader1);
  translate(0, 0, -1000);
  push();
  rotateY(frameCount * 0.00125);
  shader1.setUniform('time', frameCount * 0.5);
  shader1.setUniform('res', [width, height]);
  shader1.setUniform('nPlanes', nPlanes * nPlanes + 1);
  model(m1);
  pop();
  fbo.end();

  clear(0, 0, 0, 1);
  texture(fbo.getTexture());
  scale(scl * 2, scl * 2);
  plane(width, height);
}
