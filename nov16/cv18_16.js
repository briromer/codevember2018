
var imgFile = '500x500.jpg',
  img,
  scribble,
    drawLimit = 7000,
    drawCount = 0;

function preload() {
  img =  loadImage(imgFile)
}

function setup() {
 
  createCanvas(500, 500);
  // colorMode(HSB, 100)
  background('#fff')
  // blendMode(DODGE)
  // blendMode(MULTIPLY)
  scribble = new Scribble()
 
    img.loadPixels();

}

function draw() {
    
  // pick random point, draw circle with img bg col
  let x = random(width), 
    y = random(height),
    r = random(15)
    if (random(100) < 1) r = random(60)
  //   c = img.get(x, y, 128)

  //   // let col = 'rgb(' + c[0] + ',' + c[1] + ', ' + c[2]+ ')'
  //  if (drawCount < 100) console.log(c)

  // noStroke()
  // fill(c)
  // ellipse(x, y, r, r)
  function drawAroundPoint(px, py) {
    let iterations = 20 + random(60)
    let range = 10 + random(40)
    if (random(100) < 10) {
      iterations += random(80)
      range += random(50)
    }
    for (let i = 0; i < iterations; i++) {
      let thisx = px + (random(range) - range/2),
        thisy = py + (random(range) - range/2),
        r = random(3)
        if (random(100) < 1) r = random(10)
        ellipse(thisx, thisy, r, r)
    }
  }

  noStroke()
  fill(img.get(x, y), 200);
  // scribble.scribbleFilling(x, y, 3, 50)
  scribble.scribbleEllipse(x, y, r, r)
  drawAroundPoint(x, y)
  // ellipse(x, y, r, r);


  if (drawCount++ > drawLimit) noLoop()
}

