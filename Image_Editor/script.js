let imageLoader = document.getElementById('imageLoader');
const uploadFile = document.querySelector("#upload_file");
imageLoader.addEventListener('change', handleImage, false);
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let isDrawing;
let lastPoint;
let img = new Image();

let pixels;
let original;

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
document.getElementById("paintColor").addEventListener("change",function(e){
  strokeColor = e.target.value;
})



