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
let farmSourcedCrops= [];
let tempA = [];
window.addEventListener("load",()=>{
    farmSourcedCrops = window.sessionStorage.getItem("crop_storage");
    if(farmSourcedCrops === null){
        for(let i =0; i<9; i++){
            cropStorageLabels[i].innerHTML = 0;
        }
    }else{
        
        let tempS = '';
        for(let i = 0; i<farmSourcedCrops.length; i++){
            if(farmSourcedCrops[i] === ','){
                tempA.push(parseInt(tempS));
                tempS = '';
            }else{
                tempS += farmSourcedCrops[i];
            }
        }tempA.push(parseInt(tempS));
        for(let i = 0; i<tempA.length; i++){
            cropStorageLabels[i].innerHTML = tempA[i];
        }
    }
    console.log(farmSourcedCrops);
});
const farmButton = document.querySelector(".farm-link");
farmButton.addEventListener("click",()=>{
    let cropSender = [];
    if(farmSourcedCrops === null){
        window.location.href = "./farm.html";
    }else{
        for(let i = 0; i<tempA.length; i++){
            cropSender.push(tempA[i]);
        }
    }
    window.sessionStorage.setItem("crop_storage",cropSender);
    window.location.href = "./farm.html";
});

const recipePopup = document.querySelector(".recipe-popup");
const recipeX = document.querySelector(".recipe-x");
const recipeGrid = document.querySelector(".recipe-grid");
const recipeButton = document.querySelector(".recipes");

recipeButton.addEventListener("click",()=>{
    recipePopup.style.visibility = "visible";
});
recipeX.addEventListener("click",()=>{
    recipePopup.style.visibility = "hidden";
});

for (const recipe in recipes) {
    const recipeIMG = document.createElement("img");
    recipeIMG.alt = recipe;
    recipeGrid.appendChild(recipeIMG);
}
