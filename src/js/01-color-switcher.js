const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let changeBackground;
//let changeBackgroundColorInterval;



startBtn.addEventListener("click", () => {
    if(!startBtn.disable){
    startBtn.disabled = "true";
    stopBtn.disabled = "";

    changeBackground = setInterval(()=> {
        document.body.style.backgroundColor = getRandomHexColor()}, 
    1000)}
 });
   


stopBtn.addEventListener("click", () => {
    //document.body.style.backgroundColor = "";
    if(!stopBtn.disable) {
        stopBtn.disabled = "true";
        startBtn.disabled = "";
        clearInterval(changeBackground)
    }
    
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }