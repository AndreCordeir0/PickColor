
const img = new Image();
img.crossOrigin = "anonymous";
img.src = "./ddnsizh.jpg";

let control = 0;

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
    console.log(bounding);
    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;
    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    destination.style.background = rgba;
    destination.textContent = rgba;
    return rgba;
}
function drawCopyImage(){
    let xImagemOriginal = 0;
    let yImagemOriginal = 0;
    let yImagemCopiada = 355;
    const controlCopy = control;
    if(controlCopy == 0){
        control = 255;
    }else{
        control = 0;
    } 
    const interval = setInterval(()=>{
        if(yImagemOriginal == (355 + IMG_HEIGTH + 1)){
            clearInterval(interval);
        }
        if(xImagemOriginal < IMG_WIDTH){
            let pixel = ctx.getImageData(xImagemOriginal, yImagemOriginal, 1, 1);
            const data = pixel.data;
            let rgba;
            if(controlCopy == 255){
                rgba = rgb(controlCopy,data);
            }else{
                rgba =  `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
            }
            ctx.fillStyle = rgba;
            ctx.fillRect(xImagemOriginal, yImagemCopiada, 1, 1);
            xImagemOriginal++;
        }else{
            xImagemOriginal = 0;
            yImagemCopiada++;
            yImagemOriginal++;
        }
    },0)
}

function rgb(param, data){
    return `rgba(${param - data[0]}, ${param - data[1]}, ${param - data[2]}, ${data[3] / 255})`;
}
canvas.addEventListener("mousemove", (event) => pick(event, hoveredColor));
canvas.addEventListener("click", () => drawCopyImage());