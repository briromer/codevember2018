
let numBarbs = 3,
  barbCount = 0,
  rachisPoints = [],
  vanePoints = [],
  hue,
  period


function setup() {
 
  createCanvas(500, 500);
  colorMode(HSB, 100)
  background('#fff')
  // background('#fff')
  // blendMode(DODGE)
  // blendMode(MULTIPLY)

  noFill()
  hue = 20
  strokeWeight(3)
  stroke(hue, 30, 40)

  // draw rachis
  let curveStrength = 270,
    padding = 20
  let p =  [
    [width - padding + random(20), padding+ random(20)],
    [width - (padding + curveStrength)+ random(20), padding+ random(20)],
    [padding+ random(20), height - (padding + curveStrength)+ random(20)],
    [padding+ random(20), height - padding+ random(20)]
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

  var steps = 450,
    dist = 15,
    offset = 1,
    offsetInc = 1.5

  let p = rachisPoints

  period += 20
  hue = 75
  
  for (var i = 0; i <= steps; i++) {
    // hue = 10 * (i/steps) * 0.3

    hue += 0.1
    // console.log(i, hue)
    stroke(hue, 50, 80)
    var t = i / steps;
    var x = bezierPoint(p[0][0], p[1][0], p[2][0], p[3][0], t);
    var y = bezierPoint(p[0][1], p[1][1], p[2][1], p[3][1], t);
    var tx = bezierTangent(p[0][0], p[1][0], p[2][0], p[3][0], t);
    var ty = bezierTangent(p[0][1], p[1][1], p[2][1], p[3][1], t);
    var a = atan2(ty, tx);
    offset += cos(i/20) * offsetInc
    // console.log(i,offset)
    // one side
    a -= HALF_PI;
    line(x, y, sin(a) * dist + x + offset, sin(a) * dist + y + offset);
    // the other
    a += PI
    offset -= cos(i/period) * offsetInc
    line(x, y, sin(a) * dist + x + offset, sin(a) * dist + y + offset);
    let r = 10 + random(40)
    stroke('#fff')
    if (random() > 0.8) ellipse(random(width), random(height), r, r)
  }

 

  if (barbCount++ > numBarbs) noLoop()
}

