function preload(){img=loadImage(imgFile)}function setup(){createCanvas(500,500),background("#111"),img.loadPixels()}function draw(){fill(img.get(mouseX,mouseY),128),rect(mouseX,mouseY,40,10),drawCount++>drawLimit&&noLoop()}var imgFile="500x500.jpg",img,hue,drawLimit=900,drawCount=0;