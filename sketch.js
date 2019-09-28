/*
* Author: M. Can Kandemir
* Contact: cnkndmr@gmail.com
* Date: 14/09/2019
*/
// TODO: Find efficient way to draw and evaluate rows.
let particles = [];

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
var coef;

let button1;
let button2;
let button3;
let button4;
let button5;
let button6;

let buttonposx = 10;
let buttonposy = 335;

var row1 = 0;
var row2 = 0;
var row3 = 0;
var row4 = 0;
var row5 = 0;
var row6 = 0;
var row7 = 0;
var row8 = 0;
var row9 = 0;
var row10 = 0;
var row11 = 0;
var row12 = 0;
var row13 = 0;
var row14 = 0;
var row15 = 0;
var row16 = 0;
var row17 = 0;
var row18 = 0;
var row19 = 0;
var row20 = 0;
var row21 = 0;
var row22 = 0;
var row23 = 0;
var row24 = 0;
var row25 = 0;

function setup() {
	createCanvas(600, 400);
	createDiv('<p><h1>Single-slit diffraction and the uncertainty principle.</h1><h3>Controls:</h3><b>W Key</b>: Increase the slit width.<br><b>S Key</b>: Decrease the slit width.<br><b>D Key</b>: Increase the particle count.<br>(<b>CAUTION</b>: Increasing particle count may cause slow downs on computer!)<br><b>A Key</b>: Decrease the particle count.<br><b>1 Key</b>: Increase the particle gun range.<br><b>2 Key</b>: Decrease the particle gun range.<br></p>');
	button1 = createButton("w");
	button1.mousePressed(addslit);
	button1.position(buttonposx + 30, buttonposy + 10);
	button1.size(30, 30);
	button2 = createButton("s");
	button2.mousePressed(remslit);
	button2.position(buttonposx + 30, buttonposy + 40);
	button2.size(30, 30);
	button3 = createButton("a");
	button3.mousePressed(rempar);
	button3.position(buttonposx, buttonposy + 40);
	button3.size(30, 30);
	button4 = createButton("d");
	button4.mousePressed(addpar);
	button4.position(buttonposx + 60, buttonposy + 40);
	button4.size(30, 30);
	button5 = createButton("1");
	button5.mousePressed(addvel);
	button5.position(buttonposx, buttonposy + 10);
	button5.size(30, 30);
	button6 = createButton("2");
	button6.mousePressed(remvel);
	button6.position(buttonposx + 60, buttonposy + 10);
	button6.size(30, 30);
}

function draw() {
	background(0);
	stroke(255);
	fill(255);
	rx = width / 2;
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
	if (keyIsDown(50)) {
		remvel();
	}
	if (keyIsDown(49)) {
		addvel();
	}
	if (keyIsDown(68)) {
		addpar();
	}
	if (keyIsDown(65)) {
		rempar();
	}
	if (keyIsDown(87)) {
		addslit();
	}
	if (keyIsDown(83)) {
		remslit();
	}
	rect(rx, ry, rw, rh);
	rect(rx, r2y, rw, rh - 2);
	line(width / 20, height / 2, width / 3 * cos(atan(vert_v / minvx)) + width / 20, width / 3 * sin(atan(vert_v / minvx)) + height / 2);
	line(width / 20, height / 2, width / 3 * cos(atan(vert_v / minvx)) + width / 20, -1 * width / 3 * sin(atan(vert_v / minvx)) + height / 2);
	noFill();
	rect(width - 5, 0 * height / 25, row1, height / 25);
	rect(width - 5, 1 * height / 25, row2, height / 25);
	rect(width - 5, 2 * height / 25, row3, height / 25);
	rect(width - 5, 3 * height / 25, row4, height / 25);
	rect(width - 5, 4 * height / 25, row5, height / 25);
	rect(width - 5, 5 * height / 25, row6, height / 25);
	rect(width - 5, 6 * height / 25, row7, height / 25);
	rect(width - 5, 7 * height / 25, row8, height / 25);
	rect(width - 5, 8 * height / 25, row9, height / 25);
	rect(width - 5, 9 * height / 25, row10, height / 25);
	rect(width - 5, 10 * height / 25, row11, height / 25);
	rect(width - 5, 11 * height / 25, row12, height / 25);
	rect(width - 5, 12 * height / 25, row13, height / 25);
	rect(width - 5, 13 * height / 25, row14, height / 25);
	rect(width - 5, 14 * height / 25, row15, height / 25);
	rect(width - 5, 15 * height / 25, row16, height / 25);
	rect(width - 5, 16 * height / 25, row17, height / 25);
	rect(width - 5, 17 * height / 25, row18, height / 25);
	rect(width - 5, 18 * height / 25, row19, height / 25);
	rect(width - 5, 19 * height / 25, row20, height / 25);
	rect(width - 5, 20 * height / 25, row21, height / 25);
	rect(width - 5, 21 * height / 25, row22, height / 25);
	rect(width - 5, 22 * height / 25, row23, height / 25);
	rect(width - 5, 23 * height / 25, row24, height / 25);
	rect(width - 5, 24 * height / 25, row25, height / 25);
	text('Particle count: ' + particles.length, 0, 12);
	text('Particle per frame: ' + par_count, 0, 24);
	text('Slit length: ' + (D * 2), 0, 36);
	if (coef >= 1) {
		text('Multiplier: ' + (coef), 0, 48);
	} else {
		text('Multiplier: ' + 1, 0, 48);
	}
}

function addpar() {
	par_count += 1;
}

function rempar() {
	if (par_count > 0) {
		par_count -= 1;
	}
}

function addslit() {
	if (D < height / 2) {
		D += 1;
	}
}

function remslit() {
	if (D > 0) {
		D -= 1;
	}
}

function addvel() {
	if (vert_v < 5) {
		vert_v += 0.01;
	}
}

function remvel() {
	if (vert_v > 0.2) {
		vert_v -= 0.01;
	}
}

class Particle {
	constructor() {
		this.x = width / 20;
		this.y = height / 2;
		this.vx = random(minvx, maxvx);
		this.vy = random(-vert_v, vert_v);
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
		if ((this.y > 0 * height / 25 && this.y <= 1 * height / 25 && this.x >= width - 5)) {
			row1 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 1 * height / 25 && this.y <= 2 * height / 25 && this.x >= width - 5)) {
			row2 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 2 * height / 25 && this.y <= 3 * height / 25 && this.x >= width - 5)) {
			row3 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 3 * height / 25 && this.y <= 4 * height / 25 && this.x >= width - 5)) {
			row4 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 4 * height / 25 && this.y <= 5 * height / 25 && this.x >= width - 5)) {
			row5 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 5 * height / 25 && this.y <= 6 * height / 25 && this.x >= width - 5)) {
			row6 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 6 * height / 25 && this.y <= 7 * height / 25 && this.x >= width - 5)) {
			row7 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 7 * height / 25 && this.y <= 8 * height / 25 && this.x >= width - 5)) {
			row8 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 8 * height / 25 && this.y <= 9 * height / 25 && this.x >= width - 5)) {
			row9 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 9 * height / 25 && this.y <= 10 * height / 25 && this.x >= width - 5)) {
			row10 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 10 * height / 25 && this.y <= 11 * height / 25 && this.x >= width - 5)) {
			row11 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 11 * height / 25 && this.y <= 12 * height / 25 && this.x >= width - 5)) {
			row12 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 12 * height / 25 && this.y <= 13 * height / 25 && this.x >= width - 5)) {
			row13 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 13 * height / 25 && this.y <= 14 * height / 25 && this.x >= width - 5)) {
			row14 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 14 * height / 25 && this.y <= 15 * height / 25 && this.x >= width - 5)) {
			row15 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 15 * height / 25 && this.y <= 16 * height / 25 && this.x >= width - 5)) {
			row16 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 16 * height / 25 && this.y <= 17 * height / 25 && this.x >= width - 5)) {
			row17 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 17 * height / 25 && this.y <= 18 * height / 25 && this.x >= width - 5)) {
			row18 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 18 * height / 25 && this.y <= 19 * height / 25 && this.x >= width - 5)) {
			row19 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 19 * height / 25 && this.y <= 20 * height / 25 && this.x >= width - 5)) {
			row20 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 20 * height / 25 && this.y <= 21 * height / 25 && this.x >= width - 5)) {
			row21 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 21 * height / 25 && this.y <= 22 * height / 25 && this.x >= width - 5)) {
			row22 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 22 * height / 25 && this.y <= 23 * height / 25 && this.x >= width - 5)) {
			row23 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 23 * height / 25 && this.y <= 24 * height / 25 && this.x >= width - 5)) {
			row24 += -0.1;
			this.alpha = 0;
		}
		if ((this.y > 24 * height / 25 && this.y <= 25 * height / 25 && this.x >= width - 5)) {
			row25 += -0.1;
			this.alpha = 0;
		}
	}

	show() {
		circle(this.x, this.y, 1);
	}
}