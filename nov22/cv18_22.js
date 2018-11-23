
let numBarbs = 10,
  barbCount = 0,
  rachisPoints = [],
  vanePoints = [],
  hue,
  period


function setup() {
 
  createCanvas(500, 500);
  colorMode(HSB, 100)
  background('#222')
  // background('#fff')
  // blendMode(DODGE)
  // blendMode(MULTIPLY)

  noFill()
  hue = 80
  strokeWeight(3)
  stroke(hue, 30, 40)

  // draw rachis
  let curveStrength = 170,
    padding = 70
  let p =  [
    [width - padding, padding],
    [width - (padding + curveStrength), padding],
    [padding, height - (padding + curveStrength)],
    [padding, height - padding]
  ]
  // p.forEach(d => {
  //   ellipse(d[0], d[1], 3, 3)
  // })
  beginShape()
  vertex(p[0][0], p[0][1])
  bezierVertex(p[1][0], p[1][1], p[2][0], p[2][1], p[3][0], p[3][1])
  endShape()

  rachisPoints = p

  period = 20
}

function draw() {
  hue = 100
  strokeWeight(1)

  var steps = 300,
    dist = 5,
    offset = 0,
    offsetInc = 2

  let p = rachisPoints

  period += 2
  
  for (var i = 0; i <= steps; i++) {
    hue = 100 * (i/steps) * 0.3

    console.log(i, hue)
    stroke(hue, 30, 80)
    var t = i / steps;
    var x = bezierPoint(p[0][0], p[1][0], p[2][0], p[3][0], t);
    var y = bezierPoint(p[0][1], p[1][1], p[2][1], p[3][1], t);
    var tx = bezierTangent(p[0][0], p[1][0], p[2][0], p[3][0], t);
    var ty = bezierTangent(p[0][1], p[1][1], p[2][1], p[3][1], t);
    var a = atan2(ty, tx);
    offset += sin(i/period - random(5)) * offsetInc
    // console.log(i,offset)
    // one side
    a -= HALF_PI;
    line(x, y, cos(a) * dist + x + offset, sin(a) * dist + y + offset);
    // the other
    a += PI
    offset -= cos(i/period) * offsetInc
    line(x, y, cos(a) * dist + x + offset, sin(a) * dist + y + offset);
  }
 

  if (barbCount++ > numBarbs) noLoop()
}

