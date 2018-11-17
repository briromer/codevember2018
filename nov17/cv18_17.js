
var imgFile = '500x500.jpg',
  img,
  scribble,
  planes = [],
  numPlanes = 10000,
  drawLimit = 100,
  drawCount = 0

  // imgFile = 'spongebob.jpg'

function preload() {
  img =  loadImage(imgFile)
}

function setup() {
 
  createCanvas(500, 500, WEBGL);
  // colorMode(HSB, 100)
  background('#fff')
  // blendMode(DODGE)
  // blendMode(MULTIPLY)
  // scribble = new Scribble()
 
  img.loadPixels();
  // camera(-width / 2, width / 2, -height / 2);
  // camera (0, 0, 100)
  var fov = 60 / 180 * PI;
   var cameraZ = height / 2.0 / tan(fov / 2.0);
   perspective(60 / 180 * PI, width / height, cameraZ * 0.1, cameraZ * 100);

   for (let i = 0; i < numPlanes; i++) {
    let 
      x = random(width),
      y = random(height),
      col = img.get(x, y),
      z = -lightness(col) * 3
    planes.push({
      x: x,
      y: y,
      z: z,
      r: 3 + random(6),
      col: col
    })
   }
}

function draw() {
  





  noStroke()

  background('#fff')
  orbitControl()
  for (let i = 0; i < planes.length; i++) {
    let p = planes[i]
    push()
    fill(p.col)
    translate(p.x  - width/2 , p.y - height/2, p.z)
    plane(p.r, p.r)
    pop()
  }
 

  // if (drawCount++ > drawLimit) noLoop()
}

