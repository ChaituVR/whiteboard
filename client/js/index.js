"use strict";
const allOperationTypes = ["source-over", "lighter", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
const operation = document.getElementById('operation-types');
allOperationTypes.forEach((a) => {
  var option = document.createElement("option");
  option.text = a;
  operation.add(option);
});

const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 55;
canvas.height = window.innerHeight - 105;

ctx.lineJoin = "round";
ctx.lineCap = "round";

var brush = {
    strokeStyle: "#BADA55",
    lineWidth: 20
  };

var drawing = false;
var lastX = 0;
var lastY = 0;
var hue = 0;
var colortype = "color";
var Operationtype = "source-over";

ctx.strokeStyle = brush.strokeStyle;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const brushcontrols = document.querySelector('#brush-sizeinput');
const brushColorcontrols = document.querySelector('#brush-color');
const hueColorcontrols = document.querySelector('#brush-hsl');
const backgControls = document.querySelector('#background-color');
const cursor = document.getElementById("cursor");
const all_settings = document.querySelector("#all-settings");
const downloadBtn = document.querySelector("#download");


downloadBtn.addEventListener('click',downloadImage);
brushcontrols.addEventListener('change', lineWidthChange);
brushcontrols.addEventListener('mousemove', lineWidthChange);
hueColorcontrols.addEventListener('change', colorTypeChange);
operation.addEventListener('change', operationTypeChange);
backgControls.addEventListener('change', bgcolorChange);
brushColorcontrols.addEventListener('change', colorChange);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  drawing = true;

  [lastX, lastY] = [e.offsetX, e.offsetY];
  if (all_settings.classList.value == "active") {
    all_settings.classList.remove('active');
    all_settings.classList.add('hidden');
  }
  draw(e);
});
canvas.addEventListener("mouseup", () => {
  drawing = false;
});
canvas.addEventListener("mouseout", () => {
  drawing = false;
  cursor.style.display = "none";
});
canvas.addEventListener('mouseover', function(e) {
  this.style.cursor = 'none';
  cursor.style.display = "block";
});

function bgcolorChange() {
  var remove = confirm("This will remove your previous drawing");
  if (remove) {
    ctx.fillStyle = this.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function lineWidthChange() {
  brush.lineWidth = parseInt(this.value,10);
  [cursor.style.width, cursor.style.height] = [(brush.lineWidth) + "px", (brush.lineWidth) + "px"];
}

function colorChange() {
  brush.strokeStyle = this.value;
  cursor.style.background = brush.strokeStyle;
}

function colorTypeChange() {
  colortype = this.checked ? "hue" : "color";
}

function downloadImage(){
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because
  window.location.href=image;
}

function operationTypeChange() {
  Operationtype = allOperationTypes[this.selectedIndex];

}

document.querySelector(".btn").addEventListener("click", () => {
  all_settings.classList.toggle('active');
  all_settings.classList.toggle('hidden');
});

[cursor.style.background, cursor.style.width, cursor.style.height] = [brush.strokeStyle, brush.lineWidth + "px", brush.lineWidth + "px"];

function draw(e) {
  cursor.style.left = (e.clientX - (cursor.offsetWidth / 2)) + "px";
  cursor.style.top = (e.clientY - (cursor.offsetHeight / 2)) + "px";
  if (drawing === false) return;
  // ctx.lineWidth = brush.lineWidth
  ctx.globalCompositeOperation = Operationtype;
  cursor.style.background = colortype == "hue" ? `hsl(${hue % 360},100%,50%)` : brush.strokeStyle;
  ctx.strokeStyle = colortype == "hue" ? `hsl(${hue % 360},100%,50%)` : brush.strokeStyle;
  DrawLine (ctx ,lastX ,lastY , e.offsetX , e.offsetY );
  socket.emit("drawing",lastX ,lastY , e.offsetX, e.offsetY);
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
}

function DrawLine (ctx ,lastX ,lastY , newPostionX , newPostionY ){
  ctx.lineWidth = brush.lineWidth;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(newPostionX, newPostionY);
  ctx.stroke();
  return ctx;
}
