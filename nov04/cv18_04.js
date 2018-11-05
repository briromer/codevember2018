
let numPoints,
	numLayers,
	layerIndex = 0,
	points = [],
	hue,
	saturation = 20,
	brightness = 70

setup = () => {
	createCanvas(500, 500)
	background('#e1e1e1')
	colorMode(HSB)
	blendMode(MULTIPLY)
	hue = random(100)
	numPoints = 15 + random(55)
	numLayers = 5 + random(15)
	let runningX = random(20),
		xIncRange = random(50)
	for (let i = 0; i < numPoints; i++) {
		let v = createVector(runningX, random(height / 2))
		runningX += random(xIncRange)
		points.push(v)
	}
}

draw = () => {
	curveTightness(0.9)
	brightness += random(10)
	fill(hue, saturation, brightness)
	stroke(0, 0, 100)
	beginShape()
	curveVertex(0, height)
	for (let i = 0; i < numPoints; i++ ){
		curveVertex(points[i].x, points[i].y)
		points[i].y += random(40)
		points[i].x += -5 + random(10)
	}
	curveVertex(width, height)
	endShape()
	if (layerIndex++ > numLayers) noLoop()
}