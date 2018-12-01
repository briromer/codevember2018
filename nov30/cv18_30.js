
let 
  numDrops = 160
  drops = [],
  drawLimit = 500


function setup() {
 
  createCanvas(500, 500) //, WEBGL);
  colorMode(HSB, 100)
  background('#222')
  // background('#fff')
  blendMode(DODGE)
  // blendMode(MULTIPLY)


  for (let i = 0; i < numDrops; i++) {


    let centerx = randomGaussian(width/2, 100),
      // y = randomGaussian(height),
      centery = random(height),
      innerRadius = random(7),
      gap = random(1, 4),
      life = random(300, 800),
      inc = random(0.05, 0.2),
      hue = random((centery/height) * 50, ((centery/height) * 50) + 20),
      // bright = random(60, 80)
      // bright = random((centerx / width) * 50, (centerx / width) * 50 + 30)
      bright = (centerx / width) * 80

    drops.push({
      id: i,
      centerx: centerx,
      centery: centery,
      innerRadius: innerRadius, 
      gap: gap,
      inc: inc,
      life: life,
      hue: hue,
      bright: bright,
      lastX: centerx,
      lastY: centery
    })

  }

}


function draw() {

  // orbitControl()
  // blendMode(DODGE)
  drops.forEach(d => {

    if (frameCount > d.life) return
    d.bright -= 0.1
    d.hue += 0.2
    stroke(d.hue, 40, d.bright)
    strokeWeight(0.7)

    let angle = d.inc * frameCount;
    d.x = d.centerx + (d.innerRadius + sin(frameCount/5) + d.gap * angle) * cos(angle);
    d.y = d.centery + (d.innerRadius + tan(frameCount/100) + d.gap  * angle) * sin(angle);

    line(d.lastX, d.lastY, d.x, d.y)

    d.lastX = d.x
    d.lastY = d.y

    let friction = 0.999
    d.gap *= friction
    

    // })

    // if (random() < 0.01) {
    //   let r = random(4, 40)
    //   if (random() < 0.1) r = random(50, 100)
    //   stroke('#666')
    //   strokeWeight(0.4)
    //   noFill()
    //   // blendMode(MULTIPLY)
    //   ellipse(randomGaussian(width/2, 50), randomGaussian(height/2, 50), r, r)
      
    // }

  })


  if (frameCount > drawLimit) noLoop()
}

