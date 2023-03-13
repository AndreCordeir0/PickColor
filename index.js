
const img = new Image();
img.crossOrigin = "anonymous";
img.src = "./ddnsizh.jpg";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

img.addEventListener("load", () => {
    ctx.drawImage(img, 0, 0,400,327);
    // img.style.width = "100%";
    // img.style.height = "100%";
});

const hoveredColor = document.getElementById("hovered-color");
const selectedColor = document.getElementById("selected-color");

function pick(event, destination) {
    const bounding = canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;
    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;
    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    destination.style.background = rgba;
    destination.textContent = rgba;
    return rgba;
}
function drawCopyImage(){
    const bounding = canvas.getBoundingClientRect();
    const pixel = ctx.getImageData(0, 0, 400, 327);
    // let data = canvas.toDataURL('./ddnsizh.jpg',1.0);
    // console.log(data);
    ctx.putImageData(pixel, 0, 327);
}
canvas.addEventListener("mousemove", (event) => pick(event, hoveredColor));
canvas.addEventListener("click", (event) => drawCopyImage());