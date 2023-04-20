import { cropStorageLabels,recipes } from "./lists.js";
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

window.addEventListener("load",()=>{
    let farmSourcedCrops= [];
    farmSourcedCrops = window.localStorage.getItem("crop_storage");
    if(farmSourcedCrops === null){
        return;
    }else{
        for(let i =0; i<18; i+=2){
            cropStorageLabels[i/2].innerHTML = farmSourcedCrops[i];
        }
    }
});
localStorage.clear();