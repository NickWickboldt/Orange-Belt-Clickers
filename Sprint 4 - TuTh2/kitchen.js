const stove = document.querySelector(".stove");

let threshold = {
    initial: 100
}
let clickCounter = 0;

stove.addEventListener("click",()=>{
    clickCounter++;
    console.log(clickCounter);  //testing
    resetClickerOnThreshold();  //checking for reset
});

function resetClickerOnThreshold(){
    if(clickCounter===threshold.initial){   //if threshold, reset
        clickCounter = 0;
        console.log("reset");
    }
}