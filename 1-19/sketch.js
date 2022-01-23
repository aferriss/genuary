/// <reference path="../global.d.ts" />

let sh;
let font;
let points;
let bounds;

let points2;
let points3;

function preload() {
  sh = loadShader("base.vert", "base.frag");
  font = loadFont("Luminari.otf");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  points = font.textToPoints('Luminari', 0, 0, width * 0.15, {
    sampleFactor: 3,
    simplifyThreshold: 0.05
  });

  points2 = font.textToPoints('Luminari', 0, 0, width * 0.15, {
    sampleFactor: 3,
    simplifyThreshold: 0.05
  });

  points3 = font.textToPoints('Luminari', 0, 0, width * 0.15, {
    sampleFactor: 3,
    simplifyThreshold: 0.05
  });
  bounds = font.textBounds('Luminari', 0, 0, width * 0.15);
  textFont(font);
}


function draw() {
  noStroke();
  fill((128 + frameCount * 1.0) % 255);

  translate(width / 2, height / 2);
  translate(-bounds.w / 2, 0);

  for (let i = 0; i < points.length; i++) {

    points[i].x += (noise(i / 100, frameCount * 0.1) * 2 - 0.98) * 3;// + sin(radians(points[i].alpha)) * 0.2;
    points[i].y += (noise(i / 100 + 2, frameCount * 0.1) * 2 - 0.95) * 3;// + cos(radians(points[i].alpha)) * 0.2;
    fill((i + 128 + frameCount * 1.0) % 255);
    ellipse(points[i].x, points[i].y, 2);

    points2[i].x += (noise(i / 10, frameCount * 0.1) * 2 - 0.98) * 3;// + sin(radians(points[i].alpha)) * 0.2;
    points2[i].y += (noise(i / 10 + 2, frameCount * 0.1) * 2 - 0.95) * 3;// + cos(radians(points[i].alpha)) * 0.2;
    ellipse(points2[i].x, points2[i].y + 300, 2);

    points3[i].x += (noise(i / 100, frameCount * 0.01) * 2 - 0.98) * 1;// + sin(radians(points[i].alpha)) * 0.2;
    points3[i].y += (noise(i / 100 + 2, frameCount * 0.01) * 2 - 0.95) * 1;// + cos(radians(points[i].alpha)) * 0.2;
    ellipse(points3[i].x, points3[i].y - 300, 2);
  }

  fill(255);
  textSize(width * 0.15);
  text("Luminari", 0, 0);
  text("Luminari", 0, 300);
  text("Luminari", 0, -300);
}
