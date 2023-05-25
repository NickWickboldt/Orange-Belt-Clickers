import { recipeStorageLabels, buttonList, buffList, killTimeList} from "./lists.js";

let openSound = new Audio("./sounds/open.mp3");
let battle = new Audio("./sounds/battle.mp3");
battle.loop = true;
let kitchenSourcedRecipes= [];
let tempC = [];
let monsterCoins = 0;
let killTime = 5000;
let buffDuration = 0;
let buffActive = false;
let buffRemainingTime = 0;
let slaughterID;
let tempA = [];
const monsterCoinsLabel = document.querySelector(".monster-coins");

window.addEventListener("load",()=>{
    battle.play();
    kitchenSourcedRecipes = window.sessionStorage.getItem("recipe_storage");
    if(isNaN(window.sessionStorage.getItem("monster_coins"))){
        monsterCoins = 0;
    }else{
        monsterCoins = parseInt(window.sessionStorage.getItem("monster_coins"));
        monsterCoinsLabel.innerHTML = "Monster Coins: " + monsterCoins;
    }
    monsterCoinsLabel.innerHTML = "Monster Coins: " + monsterCoins;
    if(kitchenSourcedRecipes === null){
        for(let i =0; i<8; i++){
            recipeStorageLabels[i].innerHTML = 0;
            tempC.push(0);
        }
    }else{
        let tempS = '';
        for(let i = 0; i<kitchenSourcedRecipes.length; i++){
            if(kitchenSourcedRecipes[i] === ','){
                tempC.push(parseInt(tempS));
                tempS = '';
            }else{
                tempS += kitchenSourcedRecipes[i];
            }
        }tempC.push(parseInt(tempS));
        for(let i = 0; i<tempC.length; i++){
            recipeStorageLabels[i].innerHTML = tempC[i];
        }
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
        buffDuration = buffRemainingTime;
        buffTime();
        startSlaughter();
    }else{
        buffRemainingTime=0;
        startSlaughter();
    }
    if(!(window.sessionStorage.getItem("crop_storage") === null)){
        let farmSourcedCrops = window.sessionStorage.getItem("crop_storage");
        if(farmSourcedCrops === null){
            for(let i =0; i<9; i++){
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
        }
        startGrowthSimulation();
    }
});

const kitchenButton = document.querySelector(".index-link");
kitchenButton.addEventListener("click",()=>{
    let recipeSender = tempC;
    window.sessionStorage.setItem("recipe_storage",recipeSender); //send sender
    window.sessionStorage.setItem("crop_storage", tempA);
    window.sessionStorage.setItem("monster_coins",monsterCoins);
    window.sessionStorage.setItem("kill_time",killTime);
    window.sessionStorage.setItem("buff_remaining_time",buffRemainingTime);
    window.location.href = "./index.html";
});
const farmButton = document.querySelector(".farm-link");
farmButton.addEventListener("click",()=>{
    let recipeSender = tempC;
    window.sessionStorage.setItem("recipe_storage",recipeSender); //send sender
    window.sessionStorage.setItem("crop_storage", tempA);
    window.sessionStorage.setItem("monster_coins",monsterCoins);
    window.sessionStorage.setItem("kill_time",killTime);
    window.sessionStorage.setItem("buff_remaining_time",buffRemainingTime);
    window.location.href = "./farm.html";
});

function startSlaughter(){
    slaughterID = setInterval(() => {
        monsterCoins++;
        monsterCoinsLabel.innerHTML = "Monster Coins: " + monsterCoins;
        if(buffRemainingTime>0){
            buffRemainingTime-=killTime;
        }
    }, killTime);
}

buttonList.forEach(button => {
    let buttonIndex = 0;
    for(let i =0; i<buttonList.length; i++){
        if(button === buttonList[i]){
            buttonIndex = i;
        }
    }
    button.addEventListener("click",()=>{
        if(tempC[buttonIndex]>0 & buffActive === false){
            openSound.play();
            tempC[buttonIndex]--;
            recipeStorageLabels[buttonIndex].innerHTML = tempC[buttonIndex];
            clearInterval(slaughterID);
            buffDuration = buffList[buttonIndex];
            buffRemainingTime = buffDuration;
            killTime = killTimeList[buttonIndex];
            startSlaughter();
            buffTime();
        }
    });
});

function buffTime(){
    setTimeout(() => {
        clearInterval(slaughterID);
        killTime = 5000;
        startSlaughter();
    }, buffDuration);
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
    }, time);
}


