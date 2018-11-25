
let 
  drawLimit = 120,
  numThreads = 500
  threads = [],
  wind


function setup() {
 
  createCanvas(500, 500);
  colorMode(HSB, 100)
  background('#222')
  // background('#fff')
  // blendMode(DODGE)
  // blendMode(MULTIPLY)

  // hue = 20
  // fill(hue, 30, 40)
  wind = 0.3

  for (let i = 0; i < numThreads; i++) {
    let up = random() > 0.5 ? 1 : -1
    up = -1
    makeThread(random(width), null, up, null)
  }

}

function makeThread(x, y, up, args) {
  // let up = random() > 0.5 ? 1 : -1
  let startY = up == 1 ? 0 : height
  if (y != null) startY = y
  let vx = random(-6, 6),
    vy = up * random(8, 12),
    r = random(2, 8),
    xFriction = random(0.9, 0.95),
    yFriction = random(0.95, 0.97),
    hue = random(40, 50)

  if (args != null) {
    vx = args.vx
    vy = args.vy
    r = args.r
    xFriction = args.xFriction
    yFriction = args.yFriction
    hue = args.hue
  }
  
  threads.push ({
    x: random(width),
    y: startY,
    vx: vx,
    vy: vy,
    hue: hue,
    r: r,
    xFriction: xFriction,
    yFriction: yFriction,
    life: floor(random(50, 100)),
    branch: floor(random(30, 90))
  })
}

function draw() {

  wind += cos(frameCount) * 0.3

  threads.forEach(t => {
    // if(t.life <= 0) console.log(t.life); return
    t.r -= random(0.05, 0.1)
    if (t.r < 0.5) t.r = 0.5
    noStroke()
    fill(t.hue, 50, 90)
    ellipse(t.x, t.y, t.r, t.r)
    t.hue -= random(0.1, 0.2)
    t.r -= random(0.1, 0.2)
    t.x += t.vx + wind
    t.y += t.vy
    t.vx *= t.xFriction
    t.vy *= t.yFriction
    t.life--
    if (frameCount == t.branch) {
      let args = {
        vx: t.vx * 2,
        vy: t.vy * 1.5,
        xFriction: 0.95,
        yFriction: 0.9,
        r: t.r * 0.5,
        hue: 80
      }
      // console.log(t.branch, 'makeThread')
      makeThread(t.x, t.y, t.up, args)
    }
  })


  if (frameCount > drawLimit) noLoop()
}

