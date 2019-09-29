/*
* Author: M. Can Kandemir
* Contact: cnkndmr@gmail.com
* Date: 14/09/2019
*/
var particles = [];

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

var button1;
var button2;
var button3;
var button4;
var button5;
var button6;
var buttonposx = 10;
var buttonposy = 335;

var rows = [];
var row_count;

function setup() {
	createCanvas(600, 400);
	// Row count
	row_count = height / 4;
	for (var i = 0; i < row_count; i++) {
		rows[i] = 0;
	}
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
	for (var i = 0; i < par_count; i++) {
		var p = new Particle();
		particles.push(p);
	}
	for (var i = particles.length - 1; i >= 0; i--) {
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
	for (var i = 0; i < row_count; i++) {
		rect(width - 5, i * height / row_count, rows[i], height / row_count);
	}
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
		this.alpha = 150;
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
		for (var i = 0; i < row_count; i++) {
			if ((this.y > i * height / row_count && this.y <= (i + 1) * height / row_count && this.x >= width - 5)) {
				rows[i] -= 0.5;
				this.alpha = 0;
			}
		}
	}

	show() {
		circle(this.x, this.y, 1);
	}
}