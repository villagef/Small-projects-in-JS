let imageLoader = document.querySelector('#imageLoader');
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let isDrawing;
let lastPoint;
let img = new Image();

//pobranie zdjęcia
function handleImage(x){
    let reader = new FileReader();
    reader.onload = function(event){ 
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(x.target.files[0]);     
}
imageLoader.addEventListener('change', handleImage, false);

//rysowanie
canvas.onmousedown = function(e) {
  isDrawing = true;
  lastPoint = getMousePosition(canvas,e);
};
let strokeSize = 1;
let strokeColor = "black";
canvas.onmousemove = function(e) {
  let position = getMousePosition(canvas,e);
  console.log(position)
  if (!isDrawing) return;

  ctx.beginPath();

  ctx.lineWidth = strokeSize;
  ctx.strokeStyle = strokeColor;
  
  ctx.moveTo(lastPoint.x, lastPoint.y);
  ctx.lineTo(position.x, position.y);
  ctx.stroke();
    
  lastPoint = position;
};

canvas.onmouseup = function() {
  isDrawing = false;
};

function  getMousePosition(canvas, evt) {
  let rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,    
      scaleY = canvas.height / rect.height;  

  return {
    x: (evt.clientX - rect.left) * scaleX,   
    y: (evt.clientY - rect.top) * scaleY    
  }
}
document.querySelector("#paintColor").addEventListener("change",function(e){
  strokeColor = e.target.value;
})


//filtry
const brightness = document.querySelector('#brightness');
const contrast = document.querySelector('#contrast');
const saturation = document.querySelector('#saturation');

contrast.onkeyup = contrast.onchange = function()
{
    let contrast = document.querySelector('#canvas'),
      value = parseInt(this.value);

        if (value > 100 || value < 0)
    return false;

   // Wybór filtru
    contrast.style.filter = "contrast("+ value +"%)";
}


brightness.onkeyup = brightness.onchange = function()
{
    let brightness = document.querySelector('#canvas'),
        value = parseInt(this.value);

        if (value > 100 || value < 0)
    return false;

    // wybór filtru
    brightness.style.filter = "brightness("+ value +"%)";
}

sepia.onkeyup = sepia.onchange = function()
{
    let sepia = document.querySelector('#canvas'),
        value = parseInt(this.value);

        if (value > 100 || value < 0)
    return false;

    // wybór filtru
    sepia.style.filter = "sepia("+ value +"%)";
}

