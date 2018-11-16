// riffed from @liabru - http://brm.io

var c = 33, 
    h = 0.005,
    t = -8,
    x0 = -4, 
    y0 = 4, 
    z0 = 8,
    x1,
    y1,
    z1,
    cx = 250,
    cy = 250,
    skale = 10,
    hue,
    drawLimit = 900,
    drawCount = 0;

function setup() {
 
  createCanvas(500, 500);
  colorMode(HSB, 100)
  background('#111')
  blendMode(DODGE)
  hue = 65 + random(10)
  console.log(hue)

}

function draw() {
  if (drawCount++ > drawLimit) noLoop()

  if (random(100) < 1) z0 += 1
  if (random(100) < 2) x0 += 1
  if (random(100) < 2) y0 += 1
  if (random(100) < 2) t += 0.3
  if (random(100) < 1) h -= 0.001
  if (random(100) < 1) c += 0.5

  if (random(100) < 1) {
    lineY = random(height)
    w = random(9)
    blendMode(MULTIPLY)
    stroke('#666')
    strokeWeight(w)
    line(0, lineY, width, lineY)
    blendMode(DODGE)
  }

  for (var k = 0; k < 20; k += 1) {
    x1 = x0 + h * t * (x0 - y0);
    y1 = y0 + h * (-x0 * z0 + c * x0 - y0);
    z1 = z0 + h * (x0 * y0 - z0);

    // context.strokeStyle = "hsl(" + Math.abs(x1)*10 + "," + Math.abs(y1)*10 + "%," + Math.abs(z1)*2 + "%)";
    if (random(100) < 0.1) hue--
    // 100 - Math.abs(x1) * 1.1
    strokeWeight(1)
    stroke(hue, Math.abs(y1) * 4, Math.abs(z1) * 2)
    
    // context.beginPath();
    // context.moveTo(cx + x0 * scale, cy + y0 * scale);
    // context.lineTo(cx + x1 * scale, cy + y1 * scale);
    // context.stroke();
      x_1 = cx + x0 * skale,
      y_1 = cy + y0 * skale,
      x_2 = cx + x1 * skale,
      y_2 = cy + y1 * skale

    let r = random(2)
    noFill()
    ellipse(x_2, y_2, r, r)

    line(x_1, y_1, x_2, y_2)


    x0 = x1;
    y0 = y1;
    z0 = z1;

    // console.log(cx, x0, skale)

    // i += 1;
  }


}

