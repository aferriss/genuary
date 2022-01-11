/// <reference path="../global.d.ts" />

let renderer;

let rows = [];
let nRows = 10;

function preload() {
  shader1 = loadShader('base.vert', 'base.frag');
}

function setup() {
  renderer = createCanvas(windowWidth, windowHeight, WEBGL);

  createRows();

  setInterval(() => {
    createRows();
    loop();
  }, 1000);
}

function createRows() {
  nRows = floor(random(5, 25));
  rows = [];
  for (let i = 0; i < nRows - 1; i++) {
    rows.push(floor(random(1, 7)));
  }
  rows.push(1);

}

function drawRow(n, y, sz, lastRow) {
  const spacing = width / (n - 0);

  const data = [];
  for (let i = 0; i < n; i++) {
    const x = i * spacing + spacing / 2;
    data.push({ x, y });

    circle(x, y, sz);

    if (lastRow) {
      for (let ii = 0; ii < lastRow.length; ii++) {
        line(x, y, lastRow[ii].x, lastRow[ii].y);
      }
    }
  }
  return data;
}

function draw() {
  push();
  translate(-width / 2, -height / 2);

  fill(20);
  stroke(0);
  background(240);
  const gap = height / (nRows + 3.0);
  let y = gap;
  let d = drawRow(3, y, width / 50);
  for (let i = 0; i < nRows; i++) {
    y += gap;
    d = drawRow(rows[i], y, width / 50, d);
  }
  pop();

  noLoop();
}

