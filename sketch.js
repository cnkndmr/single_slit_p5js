/*
 * Author: M. Can Kandemir
 * Contact: cnkndmr@gmail.com
 * Date: 14/09/2019
 */
// TODO: Find efficient way to draw and evaluate walls.
let particles = [];
let theta;

var rx;
var ry;
var rh;
var rw;
var r2y;
var r2h;
var D = 20;
var maxvx = 5;
var minvx = 2;
var vert_v = 0.5;
var par_count = 1;
var testvar = 0;
var coef;

var wall1 = 0;
var wall2 = 0;
var wall3 = 0;
var wall4 = 0;
var wall5 = 0;
var wall6 = 0;
var wall7 = 0;
var wall8 = 0;
var wall9 = 0;
var wall10 = 0;
var wall11 = 0;
var wall12 = 0;
var wall13 = 0;
var wall14 = 0;
var wall15 = 0;
var wall16 = 0;
var wall17 = 0;
var wall18 = 0;
var wall19 = 0;
var wall20 = 0;
var wall21 = 0;
var wall22 = 0;
var wall23 = 0;
var wall24 = 0;
var wall25 = 0;

function setup() {
	createCanvas(600, 400);
	createDiv('<p><h1>Single-slit particle experiment.</h1><h3>Controls:</h3><b>W Key</b>: Increase the slit width.<br><b>S Key</b>: Decrease the slit width.<br><b>D Key</b>: Increase the particle count.<br>(<b>CAUTION</b>: Increasing particle count may cause slow downs on computer!)<br><b>A Key</b>: Decrease the particle count.<br><b>1 Key</b>: Increase the particle gun range.<br><b>2 Key</b>: Decrease the particle gun range.<br></p>');
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
	if (keyIsDown(50) && vert_v > 0.1) {
		vert_v -= 0.05;
	}
	if (keyIsDown(49) && vert_v < 5) {
		vert_v += 0.05;
	}
	if (keyIsDown(68) && par_count < 20) {
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
	// noFill();
	rect(rx, ry, rw, rh);
	rect(rx, r2y, rw, rh-2);
	// line(width - 5, 0, width - 5, height);
	line(width/20, height/2, width / 3 * cos(atan(vert_v / minvx)) + width / 20, width / 3 * sin(atan(vert_v / minvx)) + height / 2);
	line(width/20, height/2, width / 3 * cos(atan(vert_v / minvx)) + width / 20, -1 * width / 3 * sin(atan(vert_v / minvx)) + height / 2);
	noFill();
	rect(width - 5, 0*height/25, wall1, height/25);
	rect(width - 5, 1*height/25, wall2, height/25);
	rect(width - 5, 2*height/25, wall3, height/25);
	rect(width - 5, 3*height/25, wall4, height/25);
	rect(width - 5, 4*height/25, wall5, height/25);
	rect(width - 5, 5*height/25, wall6, height/25);
	rect(width - 5, 6*height/25, wall7, height/25);
	rect(width - 5, 7*height/25, wall8, height/25);
	rect(width - 5, 8*height/25, wall9, height/25);
	rect(width - 5, 9*height/25, wall10, height/25);
	rect(width - 5, 10*height/25, wall11, height/25);
	rect(width - 5, 11*height/25, wall12, height/25);
	rect(width - 5, 12*height/25, wall13, height/25);
	rect(width - 5, 13*height/25, wall14, height/25);
	rect(width - 5, 14*height/25, wall15, height/25);
	rect(width - 5, 15*height/25, wall16, height/25);
	rect(width - 5, 16*height/25, wall17, height/25);
	rect(width - 5, 17*height/25, wall18, height/25);
	rect(width - 5, 18*height/25, wall19, height/25);
	rect(width - 5, 19*height/25, wall20, height/25);
	rect(width - 5, 20*height/25, wall21, height/25);
	rect(width - 5, 21*height/25, wall22, height/25);
	rect(width - 5, 22*height/25, wall23, height/25);
	rect(width - 5, 23*height/25, wall24, height/25);
	rect(width - 5, 24*height/25, wall25, height/25);
	text('Particle count: ' + particles.length, 0, 12);
	text('Particle per frame: ' + par_count, 0, 24);
	text('Slit length: ' + (D * 2), 0, 36);
	if (coef >= 1) {
		text('Multiplier: ' + (coef), 0, 48);
	} else {
		text('Multiplier: ' + 1, 0, 48);
	}
}

class Particle {
	constructor() {
		this.x = width / 20;
		this.y = height / 2;
		this.vx = random(minvx, maxvx);
		this.vy = random(-vert_v, vert_v);
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
		if ((this.x >= rx && this.y <= rh && this.x <= rx + rw) || (this.x >= rx && this.y >= r2y && this.x <= rx + rw)) {
			this.alpha = 0;
			// this.vx *= -1;
		}
		if ((this.x > rx && this.x < rx + rw && this.y > rh && this.y < rh + 1) || (this.x > rx && this.x < rx + rw && this.y < r2y && this.y > r2y - 1)) {
			this.vy *= -1;
		}
		coef = (20 / (D));
		if (this.x > rx + rw - 5 && this.x < rx + rw && this.y > rh && this.y < r2y) {
			if ((coef) < 1) {
				this.vy *= 1;
			} else {
				this.vy *= coef;
			}
		}
		if (this.x > rx + 10 && this.x < width - 20) {
			this.alpha = 1000;
		}
		if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
			this.alpha = 0;
		}
		if ((this.y > 0*height/25 && this.y <= 1*height/25 && this.x >= width - 5)) {
			wall1 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 1*height/25 && this.y <= 2*height/25 && this.x >= width - 5)) {
			wall2 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 2*height/25 && this.y <= 3*height/25 && this.x >= width - 5)) {
			wall3 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 3*height/25 && this.y <= 4*height/25 && this.x >= width - 5)) {
			wall4 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 4*height/25 && this.y <= 5*height/25 && this.x >= width - 5)) {
			wall5 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 5*height/25 && this.y <= 6*height/25 && this.x >= width - 5)) {
			wall6 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 6*height/25 && this.y <= 7*height/25 && this.x >= width - 5)) {
			wall7 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 7*height/25 && this.y <= 8*height/25 && this.x >= width - 5)) {
			wall8 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 8*height/25 && this.y <= 9*height/25 && this.x >= width - 5)) {
			wall9 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 9*height/25 && this.y <= 10*height/25 && this.x >= width - 5)) {
			wall10 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 10*height/25 && this.y <= 11*height/25 && this.x >= width - 5)) {
			wall11 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 11*height/25 && this.y <= 12*height/25 && this.x >= width - 5)) {
			wall12 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 12*height/25 && this.y <= 13*height/25 && this.x >= width - 5)) {
			wall13 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 13*height/25 && this.y <= 14*height/25 && this.x >= width - 5)) {
			wall14 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 14*height/25 && this.y <= 15*height/25 && this.x >= width - 5)) {
			wall15 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 15*height/25 && this.y <= 16*height/25 && this.x >= width - 5)) {
			wall16 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 16*height/25 && this.y <= 17*height/25 && this.x >= width - 5)) {
			wall17 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 17*height/25 && this.y <= 18*height/25 && this.x >= width - 5)) {
			wall18 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 18*height/25 && this.y <= 19*height/25 && this.x >= width - 5)) {
			wall19 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 19*height/25 && this.y <= 20*height/25 && this.x >= width - 5)) {
			wall20 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 20*height/25 && this.y <= 21*height/25 && this.x >= width - 5)) {
			wall21 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 21*height/25 && this.y <= 22*height/25 && this.x >= width - 5)) {
			wall22 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 22*height/25 && this.y <= 23*height/25 && this.x >= width - 5)) {
			wall23 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 23*height/25 && this.y <= 24*height/25 && this.x >= width - 5)) {
			wall24 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 24*height/25 && this.y <= 25*height/25 && this.x >= width - 5)) {
			wall25 += -0.1;
			this.alpha = 0;
		}
	}
	show() {
		circle(this.x, this.y, 1);
	}
}