/*
 * Author: M. Can Kandemir
 * Contact: cnkndmr@gmail.com
 * Date: 14/09/2019
 */
let particles = [];
let theta;

var rx;
var ry;
var rh;
var rw;
var r2y;
var r2h;
var D = 5;
var maxvx = 5;
var minvx = 2;
var vert_v = 0.5;
var par_count = 1;
var testvar = 0;


function setup() {
	createCanvas(600, 400);
	createDiv('<p><h1>Single-slit particle experiment.</h1><h3>Controls:</h3><b>W Key</b>: Increase the slit width.<br><b>S Key</b>: Decrease the slit width.<br><b>D Key</b>: Increase the particle count.<br>(<b>CAUTION</b>: Increasing particle count may cause slow downs on computer!)<br><b>A Key</b>: Decrease the particle count.<br></p>');
}

function draw() {
  background(0);
  stroke(255);
  fill(255);
  rx = width/2;
  ry = 0;
  rh = (height / 2) - D;
  rw = 5;
  r2y = rh + (height - 2 * rh);
  r2h = height - 10;
  // i is particle count per frame
  for (let i = 0; i < par_count; i++) {
    let p = new Particle();
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
  if (keyIsDown(68) && par_count < 100) {
    par_count += 1;
  }
  if (keyIsDown(65) && par_count > 0) {
    par_count -= 1;
  }
  if (keyIsDown(87) && D < height / 2) {
    D += 1;
  }
  if (keyIsDown(83) && D > 0) {
    D -= 1;
  }
  noFill();
  rect(rx, ry, rw, rh);
  rect(rx, r2y, rw, rh-2);
  rect(width - 5, 0, 5, height);
  // count = particles.length;
  text('Particle count: ' + particles.length, 0, 12);
  text('Particle per frame: ' + par_count, 0, 24);
  text('Slit length: ' + (D * 2), 0, 36);
  //text('Vertical multiplication factor after slit: ' + (((width / 3) / D)), 0, 48);
}

class Particle {
  constructor() {
    this.x = width / 20;
    this.y = height / 2;
    this.vx = random(minvx, maxvx);
    this.vy = random(-minvx, minvx);
    //this.vy = random(-minvx/5, minvx/5);
    // !!!!
    // this.vy = minvx * random(sin(atan((D*(3/2)) / (rx - (width / 20)))), -sin(atan((D*(3/2)) / (rx - (width / 20)))));
    this.alpha = 300;
  }

  finished() {
    return this.alpha <= 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1;
    if ((this.x >= rx && this.y <= rh && this.x <= rx + rw) || (this.x >= rx && this.y >= r2y && this.x <= rx + rw) || (this.x >= width - 5)) {
      this.vx *= -1;
    }
    if ((this.x > rx && this.x < rx + rw && this.y > rh && this.y < rh + 1) || (this.x > rx && this.x < rx + rw && this.y < r2y && this.y > r2y - 1)) {
      this.vy *= -1;
    }
    if (this.x > rx + rw - 5 && this.x < rx + rw && this.y > rh && this.y < r2y) {
		this.vy *= width / (D * 3);
    }
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > width) {
      this.alpha = 0;
    }
  }

  show() {
    circle(this.x, this.y, 1);
  }
} 
