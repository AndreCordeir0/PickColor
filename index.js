
const img = new Image();
img.crossOrigin = "anonymous";
img.src = "./ddnsizh.jpg";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
const IMG_HEIGTH = 327;
const IMG_WIDTH = 400;
img.addEventListener("load", () => {
    ctx.drawImage(img, 0, 0,IMG_WIDTH,IMG_HEIGTH);
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
    let i = 0;
    let j = 0;
    let y =355
    const interval = setInterval(()=>{
        if(j == (355 + IMG_HEIGTH + 1)){
            clearInterval(interval);
        }
        if(i < IMG_WIDTH){
            let pixel = ctx.getImageData(i, j, 1, 1);
            const data = pixel.data;
            const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
            ctx.fillStyle = rgba;
            ctx.fillRect(i, y, 1, 1);
            i++;
        }else{
            i =0;
            y++;
            j++;
        }
    },0)
}
canvas.addEventListener("mousemove", (event) => pick(event, hoveredColor));
canvas.addEventListener("click", () => drawCopyImage());