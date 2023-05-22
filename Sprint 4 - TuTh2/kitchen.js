import { cropStorageLabels,recipes,recipeStorageLabels,cropArray} from "./lists.js";
const stove = document.querySelector(".stove");
const ovenWindow = document.querySelector(".oven-window");

let threshold = {
    initial: 10
}
let clickCounter = 0;
let cooking = false;

stove.addEventListener("click",()=>{
    if(cooking){
        clickCounter++;
        resetClickerOnThreshold();
    }
});

function resetClickerOnThreshold(){
    if(clickCounter===threshold.initial){   //if threshold, reset
        let i;
        let child = ovenWindow.childNodes[3];
        child = child.outerHTML.substring(10,child.outerHTML.length-25);
        for(i =0; i<recipeStorageLabels.length; i++){
            if(child===recipeStorageLabels[i].outerHTML.substring(8,recipeStorageLabels[i].outerHTML.length-8)){
                intoRecipeStorage(i);
            }
        }
        ovenWindow.removeChild(ovenWindow.childNodes[3]);
        clickCounter = 0;
        cooking = false;
    }
}
let farmSourcedCrops= [];
let tempA = [];
let battlefieldSourcedRecipes= [];
let tempB = [];

window.addEventListener("load",()=>{
    farmSourcedCrops = window.sessionStorage.getItem("crop_storage");
    if(farmSourcedCrops === null){
        for(let i =0; i<9; i++){
            cropStorageLabels[i].innerHTML = 0;
            tempA.push(0);
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
    console.log(tempA)
});

window.addEventListener("load",()=>{
    battlefieldSourcedRecipes = window.sessionStorage.getItem("recipe_storage");
    if(battlefieldSourcedRecipes === null){
        for(let i =0; i<8; i++){
            recipeStorageLabels[i].innerHTML = 0;
            tempB.push(0);
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
    console.log(tempB);
});

const battlefieldButton = document.querySelector(".battlefield-link");
battlefieldButton.addEventListener("click",()=>{
    let recipeSender = tempB;
    let cropSender = tempA;
    window.sessionStorage.setItem("recipe_storage",recipeSender); //send sender
    window.sessionStorage.setItem("crop_storage",cropSender);
    window.location.href = "./battlefield.html";
});
const farmButton = document.querySelector(".farm-link");
farmButton.addEventListener("click",()=>{
    let cropSender = tempA;
    let recipeSender = tempB;
    window.sessionStorage.setItem("recipe_storage",recipeSender); //send sender
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
    const ingPopUp = document.createElement("ul");
    ingPopUp.classList.add("ing-popup");
    document.body.appendChild(ingPopUp);
    let tempList = [];
    recipeIMG.addEventListener("mouseover",(e)=>{
        let item = recipeIMG.outerHTML;
        let itemToSend = item.substring(10,item.length-2);
        let ingList = getIngredients(itemToSend);
        ingPopUp.style.left = e.pageX+40 + "px";
        ingPopUp.style.top = e.pageY+40 + "px";
        ingPopUp.style.visibility = "visible";
        for(let i =0; i<ingList.length; i++){
            const listItem = document.createElement("li");
            listItem.innerHTML = cropArray[i].img.substring(9,cropArray[i].img.length-4) + ": " + ingList[i];
            tempList.push(listItem);
            ingPopUp.appendChild(listItem);
        }
    });
    recipeIMG.addEventListener("mouseleave",()=>{
        tempList.forEach(child => {
            ingPopUp.removeChild(child);
        });
        tempList = [];
        ingPopUp.style.visibility = "hidden";
    });
    recipeIMG.addEventListener("click",()=>{
        let item = recipeIMG.outerHTML;
        let itemToSend = item.substring(10,item.length-2);
        let ingList = getIngredients(itemToSend);
        let canPurchase = testBuy(ingList); // true/false if have enough 
        if(canPurchase){
            buyRecipe(recipeIMG,ingList);
        }else{
            console.log("Not enough crops!");
        }
    });
    recipeIMG.alt = recipe;
    recipeGrid.appendChild(recipeIMG);
}

function intoRecipeStorage(id){ //recipe - id
    tempB[id]++;
    recipeStorageLabels[id].innerHTML = tempB[id]; //updates text on storage
}

function getIngredients(recipeToMake){ //string recipe
    let ingredientArray = [];
    for (const recipeTest in recipes) { //finding match
        if(recipeTest===recipeToMake){// if match
            let recIng = recipes[recipeTest];
            for (const ingredient in recIng) {
                ingredientArray.push(recIng[ingredient]); //list of ingrdts
            }
        }
    }
    return ingredientArray;
}

function testBuy(iList){ //test if have enough to purchase the recipe
    let b = true;
    for(let i =0; i<iList.length; i++){
        if(tempA[i] < iList[i]){
            b = false;
        }
    }
    return b;
}

function buyRecipe(recipeName, ingredientList){
    for(let i =0; i<ingredientList.length; i++){
        tempA[i] -= ingredientList[i];
        cropStorageLabels[i].innerHTML = tempA[i];
    }
    recipeIntoStove(recipeName);
}

function recipeIntoStove(name){
    const cookingIMG = document.createElement("img");
    // cookingIMG.src = name.src;
    cookingIMG.alt = name.alt;
    cookingIMG.classList.add("cooking-recipe");
    ovenWindow.appendChild(cookingIMG);
    cooking = true;
}