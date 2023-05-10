import { cropStorageLabels,recipes,recipeStorageLabels,recipeStorage } from "./lists.js";
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
    if(farmSourcedCrops === ''){
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
    recipeIMG.addEventListener("click",()=>{
        let item = recipeIMG.outerHTML;
        let itemToSend = item.substring(10,item.length-2);
        makeRecipe(itemToSend);
    });
    recipeIMG.alt = recipe;
    recipeGrid.appendChild(recipeIMG);
}

function intoRecipeStorage(id){ //recipe - id
    recipeStorage[id]++; //increases recipe in recipe storage numerically
    recipeStorageLabels[id].innerHTML = recipeStorage[id]; //updates text on storage
}

let battlefieldSourcedRecipes= [];
let tempB = [];
window.addEventListener("load",()=>{
    battlefieldSourcedRecipes = window.sessionStorage.getItem("recipe_storage");
    console.log(battlefieldSourcedRecipes);
    if(battlefieldSourcedRecipes === ''){
        for(let i =0; i<8; i++){
            recipeStorageLabels[i].innerHTML = 0;
        }
    }else{
        
        let tempS = '';
        for(let i = 0; i<battlefieldSourcedRecipes.length; i++){
            if(battlefieldSourcedRecipes[i] === ','){
                tempB.push(parseInt(tempS));
                tempS = '';
            }else{
                tempS += battlefieldSourcedRecipes[i];
            }
        }tempB.push(parseInt(tempS));
        for(let i = 0; i<tempB.length; i++){
            recipeStorageLabels[i].innerHTML = tempB[i];
        }
    }
});

const battlefieldButton = document.querySelector(".battlefield-link");
battlefieldButton.addEventListener("click",()=>{
    let recipeSender = [];
    if(battlefieldSourcedRecipes === null){ //if no recipes yet
        window.location.href = "./battlefield.html";
    }else{ //if recipes, fill recipeSender
        for(let i = 0; i<tempB.length; i++){
            recipeSender.push(tempB[i]);
        }
    }
    window.sessionStorage.setItem("recipe_storage",recipeSender); //send sender
    window.location.href = "./battlefield.html";
});

function makeRecipe(recipeToMake){ //string recipe
    let ingredientArray = [];
    for (const recipeTest in recipes) { //finding match
        if(recipeTest===recipeToMake){// if match
            let recIng = recipes[recipeTest];
            for (const ingredient in recIng) {
                ingredientArray.push(recIng[ingredient]); //list of ingrdts
            }
        }
    }
    console.log(ingredientArray);
}