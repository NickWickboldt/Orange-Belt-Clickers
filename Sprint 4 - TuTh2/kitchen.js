import { cropStorageLabels,recipes,recipeStorageLabels,cropArray,recipeImageList} from "./lists.js";
const stove = document.querySelector(".stove");
const ovenWindow = document.querySelector(".oven-window");

let threshold = {
    initial: 10
}
let clickCounter = 0;
let cooking = false;
let sizzleSound = new Audio("./sounds/sizzle.mp3");
let openSound = new Audio("./sounds/open.mp3");

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
        child = child.outerHTML.substring(19,child.outerHTML.length-29);
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
let buffRemainingTime = 0;
let killTime = 0;
let slaughterID;
let monsterCoins = 0;

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
    startGrowthSimulation();
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
    if(window.sessionStorage.getItem("monster_coins")===null){
        monsterCoins = 0;
    }else{
        monsterCoins = parseInt(window.sessionStorage.getItem("monster_coins"));
    }
    buffRemainingTime = parseInt(window.sessionStorage.getItem("buff_remaining_time"));
    if(isNaN(buffRemainingTime)){
        buffRemainingTime = 0;
    }
    killTime = parseInt(window.sessionStorage.getItem("kill_time"));
    if(isNaN(killTime)){
        killTime=5000;
    }
    if(buffRemainingTime>0){
        buffTime();
        startSlaughter();
    }else{
        startSlaughter();
    }
});

const battlefieldButton = document.querySelector(".battlefield-link");
battlefieldButton.addEventListener("click",()=>{
    let recipeSender = tempB;
    let cropSender = tempA;
    window.sessionStorage.setItem("recipe_storage",recipeSender); //send sender
    window.sessionStorage.setItem("crop_storage",cropSender);
    window.sessionStorage.setItem("buff_remaining_time", buffRemainingTime);
    window.sessionStorage.setItem("kill_time",killTime);
    window.sessionStorage.setItem("monster_coins",monsterCoins);
    window.location.href = "./battlefield.html";
});
const farmButton = document.querySelector(".farm-link");
farmButton.addEventListener("click",()=>{
    let cropSender = tempA;
    let recipeSender = tempB;
    window.sessionStorage.setItem("recipe_storage",recipeSender); //send sender
    window.sessionStorage.setItem("crop_storage",cropSender);
    window.sessionStorage.setItem("buff_remaining_time", buffRemainingTime);
    window.sessionStorage.setItem("kill_time",killTime);
    window.sessionStorage.setItem("monster_coins",monsterCoins);
    window.location.href = "./farm.html";
});

const recipePopup = document.querySelector(".recipe-popup");
const recipeX = document.querySelector(".recipe-x");
const recipeGrid = document.querySelector(".recipe-grid");
const recipeButton = document.querySelector(".recipes");

recipeButton.addEventListener("click",()=>{
    openSound.play();
    recipePopup.style.visibility = "visible";
});
recipeX.addEventListener("click",()=>{
    openSound.play();
    recipePopup.style.visibility = "hidden";
});

for (const recipe in recipes) {
    const recipeIMG = document.createElement("img");
    const ingPopUp = document.createElement("ul");
    for(let i =0; i<recipeImageList.length; i++){
        if(recipeImageList[i].substring(9,recipeImageList[i].length-4) === recipe){
            recipeIMG.src = recipeImageList[i];
        }
    }
    ingPopUp.classList.add("ing-popup");
    document.body.appendChild(ingPopUp);
    let tempList = [];
    recipeIMG.addEventListener("mouseover",(e)=>{
        recipeIMG.style.border = "solid black 1px";
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
        recipeIMG.style.border = "none";
        tempList.forEach(child => {
            ingPopUp.removeChild(child);
        });
        tempList = [];
        ingPopUp.style.visibility = "hidden";
    });
    recipeIMG.addEventListener("click",()=>{
        if(!cooking){
            let item = recipeIMG.outerHTML;
            let itemToSend = item.substring(10,item.length-2);
            let ingList = getIngredients(itemToSend);
            let canPurchase = testBuy(ingList); // true/false if have enough 
            if(canPurchase){
                buyRecipe(recipeIMG,ingList);
            }else{
                console.log("Not enough crops!");
            }
        }
        
    });
    recipeGrid.appendChild(recipeIMG);
}

function intoRecipeStorage(id){ //recipe - id
    tempB[id]++;
    recipeStorageLabels[id].innerHTML = tempB[id]; //updates text on storage
}

function getIngredients(recipeToMake){ //string recipe
    recipeToMake = recipeToMake.substring(9, recipeToMake.length-37);
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
    sizzleSound.play();
    const cookingIMG = document.createElement("img");
    cookingIMG.src = name.outerHTML.substring(10,name.outerHTML.length-35);
    cookingIMG.classList.add("cooking-recipe");
    ovenWindow.appendChild(cookingIMG);
    cooking = true;
}

function buffTime(){
    setTimeout(() => {
        clearInterval(slaughterID);
        killTime = 5000;
        startSlaughter();
    }, buffRemainingTime);
}

function startSlaughter(){
    slaughterID = setInterval(() => {
        monsterCoins++;
        if(buffRemainingTime>0){
            buffRemainingTime-=killTime;
        }
    }, killTime);
}

function startGrowthSimulation(){
    let growTime = parseInt(window.sessionStorage.getItem("growth_time"));
    if(!(window.sessionStorage.getItem("active_crops") === null)){
        let tempAC = window.sessionStorage.getItem("active_crops");
        let tempG = '';
        for(let i =0; i<tempAC.length; i++){
            if(tempAC[i] === ','){
                pickCrop(tempG,growTime);
                tempG = '';
            }else{
                tempG += tempAC[i];
            }
        }pickCrop(tempG,growTime);
    }
}

function pickCrop(crop, time){
    switch(crop){
        case 'stinkweed': simulateGrowth(0, time); break;
        case 'blowflower': simulateGrowth(1, time); break;
        case 'toxicshrooms': simulateGrowth(2, time); break;
        case 'zucchini': simulateGrowth(3, time); break;
        case 'purplestalk': simulateGrowth(4, time); break;
        case 'quantumonions': simulateGrowth(5, time); break;
        case 'tristemmedcarrots': simulateGrowth(6, time); break;
        case 'greenglobleaf': simulateGrowth(7, time); break;
        case 'greentree': simulateGrowth(8, time); break;
        default: break;
    }
} 

function simulateGrowth(cropID, time){
    setInterval(() => {
        tempA[cropID]++;
        cropStorageLabels[cropID].innerHTML = tempA[cropID];
    }, time);
}