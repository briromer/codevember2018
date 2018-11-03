// vars


let plotW = 500,
	plotH = 500,
	amp = 20,
	count = 0.1, 
	inc = 0.1,
	strokeMax = 4,
	maxDrawings = 300 + Math.random() * 900,
	drawingIteration = 0,
	hue = 0
	rectWalkers = []

// setup

setup = () => {
	createCanvas(plotW, plotH)
	background('#e1e1e1')
	strokeWeight(0.5)
	blendMode(MULTIPLY)
	hue = Math.random() * 255
	colorMode(HSB)
	stroke(hue, 40, 180)
	// stroke('#A9469B')
	rectWalkers.push(new RectWalker())
}

// draw

draw = () => {

	if (drawingIteration++ > maxDrawings) return
	// ellipse(50, 80, 100, 100)


	let w = Math.random() * strokeMax
	if (Math.random() * 100 < 2) w *= 0.5 + strokeMax * 3
	strokeWeight(w)
	// stroke('rgba(125, 88, 162, 0.1')
	// blendMode(MULTIPLY)

	if ( Math.random() < 0.20 ) {
		// blendMode(MULTIPLY)
		// r = Math.random() * 95
		// colorMode(RGB, 255, 255, 255, 1);
		// noFill()
		// stroke('255, 255, 255')
		// ellipse(Math.random() * plotW, Math.random() * plotH, r)
		// ellipse(random(width), random(height), r)
		// stroke('#ffffff')
		// line(0, random(height), width, random(height))
	}

	rectWalkers.forEach(rw => {
		rw.walk()
		rw.display()
	})
}

class RectWalker {
	constructor() {
		this.p1 = createVector(width / 2, height / 2)
		this.p2 = createVector(width / 2, height / 2)
		this.p3 = createVector(width / 2, height / 2)
		this.p4 = createVector(width / 2, height / 2)
		this.noff = createVector(random(1000), random(1000))
		this.w = random(5)
		this.h = 300 + random(400)
		this.hue = Math.floor(Math.random() * 255)
	}

	display() {
		if (Math.random() < 0.2) this.hue++
		// noFill()
		noStroke()
		fill(this.hue, 10, 230)
		rect(this.p1.x, this.p1.y, this.w, this.h)//, this.p4.x, this.p4.y)
		// triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y)
		// ellipse(this.position.x, this.position.y, r, r)
	}

	walk () {
		for (let i = 1; i <= 4; i++ ){
			this['p' + i].x = map(noise(this.noff.x), 0, 1, 0, width)
			this['p' + i].y = map(noise(this.noff.y), 0, 1, 0, width)
		}
		this.noff.add(0.01, 0.10, 0)
	}
}

