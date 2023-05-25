import { cropArray,soilArray,cropStorage,cropStorageLabels } from "./lists.js";
const plot1 = document.getElementById("crop1");
const plot2 = document.getElementById("crop2");
const plot3 = document.getElementById("crop3");
const plot4 = document.getElementById("crop4");
const plot5 = document.getElementById("crop5");
const plot6 = document.getElementById("crop6");
const plot7 = document.getElementById("crop7");
const plot8 = document.getElementById("crop8");
const plot9 = document.getElementById("crop9");
const plot10 = document.getElementById("crop10");
const plot11 = document.getElementById("crop11");
const plot12 = document.getElementById("crop12");
const monsterCoinsLabel = document.querySelector(".monster-coins");
let monsterCoins = 0;
monsterCoinsLabel.innerHTML = "Monster Coins: " + monsterCoins;
let pop = new Audio("./sounds/pop.mp3");

let growTime = 5500;
let plotCounter = 0;    //maintains current plot to plant at
let plotList = [plot1, plot2, plot3, plot4, plot5, 
                plot6, plot7, plot8, plot9, plot10, 
                plot11, plot12];
let activePlotList = [];
let intervalResetList = [];
let gameloopList = [];

function gameLoop(cropID){
    // console.log(activePlotList)
    gameloopList.push(cropID);
    let tempBool = true;
    let i =0;
    let plotNumber = 0;
    let intervalID;
    while(tempBool){
        if(!activePlotList[i]){
            plotNumber = i;
            tempBool = !tempBool;
        }else{
            i++;
        }
    }
    activePlotList[i] = !activePlotList[i];
    intervalID = setInterval(() => { //growth interval
        createCrop(plotList[plotNumber], cropID,intervalID, plotNumber); // 0->cropID
        cropStorage[cropID]++;
        cropStorageLabels[cropID].innerHTML = cropStorage[cropID];
    }, growTime);
    intervalResetList.push(intervalID);
}

function createCrop(plot, imgIndex,intervalNumber, plotNum){ //one iteration of growth
    const crop = document.createElement("img");
    crop.src =  cropArray[imgIndex].img;
    crop.classList.add("crop");
    plot.appendChild(crop);
    const sellText = document.createElement("p");
    sellText.classList.add("sell-text");
    plot.addEventListener("mouseover",(e)=>{
        if(plot.hasChildNodes()){
            plot.style.border = "solid red 2px";
            sellText.innerHTML = "Destroy?";
            sellText.style.top = e.pageY - 50 + 'px';
            sellText.style.left = e.pageX + 'px';
            plot.appendChild(sellText);
        }
        
    });
    plot.addEventListener("mouseleave",()=>{
        if(plot.hasChildNodes()){
            plot.style.border = "none";
            for(let i =0; i<plot.childNodes.length; i++){
                if(plot.childNodes[i].outerHTML.substring(0,2) === "<p"){
                    plot.removeChild(plot.childNodes[i])
                }
            }
        }
    });
    
    plot.addEventListener("click",()=>{
        if(plot.hasChildNodes()){
            plot.style.border = "none";
            clearInterval(intervalNumber);
            intervalNumber = null;
            activePlotList[plotNum] = false;
        }
        updatePlotCounter();
    });

    if(!(intervalNumber===null)){
        
        setTimeout(() => {
            grow(crop,plot);
        }, 50); 
    }
}

function grow(crop,plot){
    crop.style.transform = "scale(2000%)";
    setTimeout(() => {
        if(plot.hasChildNodes()){
            plot.removeChild(crop);
        }
        pop.play();
    }, growTime + 50);
}

//pop-ups
const cropShop = document.querySelector(".crop-shop");
const soilShop = document.querySelector(".soil-shop");
const cropShopX = document.querySelector(".x-out-crop-shop");
const soilShopX = document.querySelector(".x-out-soil-shop");
const cropShopButton = document.querySelector(".crop-button");
const soilShopButton = document.querySelector(".soil-button");
let openSound = new Audio("./sounds/open.mp3");

cropShopButton.addEventListener("click",()=>{
    openSound.play();
    cropShop.style.visibility = "visible";
});
cropShopX.addEventListener("click",()=>{
    openSound.play();
    cropShop.style.visibility = "hidden";
});

soilShopButton.addEventListener("click",()=>{
    openSound.play();
    soilShop.style.visibility = "visible";
});
soilShopX.addEventListener("click",()=>{
    openSound.play();
    soilShop.style.visibility = "hidden";
});

cropArray.forEach(crop => {
    const cropIMG = document.createElement("img");
    cropIMG.src = crop.img;
    cropIMG.classList.add("shop-item");
    cropShop.appendChild(cropIMG);
    const priceText = document.createElement("p");
    priceText.classList.add("price-text");
    cropIMG.addEventListener("mouseover",(e)=>{
        cropIMG.style.border = "solid darkslategray 2px";
        priceText.innerHTML = "Monster Coins: " + crop.price;
        priceText.style.top = e.pageY - 200 + 'px';
        priceText.style.left = e.pageX - 300 + 'px';
        cropShop.appendChild(priceText);
    });
    cropIMG.addEventListener("mouseleave",()=>{
        cropIMG.style.border = "solid darkslategray 1px";
        cropShop.removeChild(priceText);
    });
    cropIMG.addEventListener("click",()=>{
        if(monsterCoins>=crop.price && plotCounter<12){
            openSound.play();
            monsterCoins-=crop.price;
            monsterCoinsLabel.innerHTML = "Monster Coins: " + monsterCoins;
            gameLoop(crop.id);
        }
    });
});

soilArray.forEach(soil => {
    const soilColor = document.createElement("div");
    soilColor.style.backgroundColor = soil.color;
    soilColor.classList.add("shop-item");
    soilShop.appendChild(soilColor);
    const priceText = document.createElement("p");
    priceText.classList.add("price-text");
    soilColor.addEventListener("mouseover",(e)=>{
        soilColor.style.border = "solid darkslategray 2px";
        priceText.innerHTML = "Monster Coins: " + soil.price;
        priceText.style.top = e.pageY - 200 + 'px';
        priceText.style.left = e.pageX - 300 + 'px';
        soilShop.appendChild(priceText);
    });
    soilColor.addEventListener("mouseleave",()=>{
        soilColor.style.border = "solid darkslategray 1px";
        soilShop.removeChild(priceText);
    });
    soilColor.addEventListener("click",()=>{
        if(monsterCoins>=soil.price){
            openSound.play();
            growTime-=1000;
            monsterCoins-=soil.price;
            monsterCoinsLabel.innerHTML = "Monster Coins: " + monsterCoins;
            activePlotList = [false,false,false,false,false,false,false,false,false,false,false,false];
            plotList.forEach(plot => {
                plot.style.backgroundColor = soil.color;
            });
            for(let i =0; i<intervalResetList.length; i++){ //clearing intervals
                clearInterval(intervalResetList[i]);
            }
            intervalResetList = []; //reset
            let tempGL = [];
            for(let i =0; i<gameloopList.length; i++){ //creating copy
                tempGL.push(gameloopList[i]);
            }
            gameloopList = []; //reset
            for(let i = 0; i<tempGL.length; i++){ //restarting gameloops
                gameLoop(tempGL[i]);
            }
            soilShop.removeChild(soilColor);
            soilShop.removeChild(priceText);
        }
    });
});

let kitchenSourcedCrops= [];
let tempA = [];
let buffRemainingTime = 0;
let killTime = 0;
let slaughterID;

window.addEventListener("load",()=>{
    kitchenSourcedCrops = window.sessionStorage.getItem("crop_storage");
    if(window.sessionStorage.getItem("monster_coins")===null){
        monsterCoins = 0;
    }else{
        monsterCoins = parseInt(window.sessionStorage.getItem("monster_coins"));
        monsterCoinsLabel.innerHTML = "Monster Coins: " + monsterCoins;
    }
    if(kitchenSourcedCrops === ''){
        for(let i =0; i<9; i++){
            cropStorageLabels[i].innerHTML = 0;
        }
    }else{
        
        let tempS = '';
        for(let i = 0; i<kitchenSourcedCrops.length; i++){
            if(kitchenSourcedCrops[i] === ','){
                tempA.push(parseInt(tempS));
                tempS = '';
            }else{
                tempS += kitchenSourcedCrops[i];
            }
        }tempA.push(parseInt(tempS));
        for(let i = 0; i<tempA.length; i++){
            cropStorage[i] = cropStorage[i] + tempA[i];
            cropStorageLabels[i].innerHTML = tempA[i];
        }
    }
    let tempPL;
    let tempAC = [];
    let indexList = [];
    
    if(window.sessionStorage.getItem("active_plots")===null){
        activePlotList = [false,false,false,false,false,false,false,false,false,false,false,false];
    }else{
        tempPL = window.sessionStorage.getItem("active_plots");
        let tempP = '';
        for(let i =0; i<tempPL.length; i++){
            if(tempPL[i] === ','){
                activePlotList.push(!(tempP === 'true'));
                tempP = '';
            }else{
                tempP += tempPL[i];
            }
        }activePlotList.push(!(tempP === 'true'));
        for(let i = activePlotList.length; i<12; i++){
            activePlotList.push(false);
        }
        for(let i =0; i<activePlotList.length; i++){
            if(!activePlotList[i]){
                indexList.push(i);
            }
        }
    }
    if(!(window.sessionStorage.getItem("active_crops") === null)){
        tempAC = window.sessionStorage.getItem("active_crops");
        let tempG = '';
        for(let i =0; i<tempAC.length; i++){
            if(tempAC[i] === ','){
                plantOnPlot(tempG);
                tempG = '';
            }else{
                tempG += tempAC[i];
            }
        }plantOnPlot(tempG);
        for(let i =0; i<indexList.length; i++){
            activePlotList[indexList[i]] = !activePlotList[indexList[i]];
        }
        for(let i =0; i<activePlotList.length; i++){
            activePlotList[i] = !activePlotList[i];
        }
    }
    updatePlotCounter();
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
const kitchenButton = document.querySelector(".index-link");
kitchenButton.addEventListener("click",()=>{
    let cropSender = [];
    for(let i = 0; i<cropStorage.length; i++){
        cropSender.push(cropStorage[i]);
    }
    window.sessionStorage.setItem("active_plots",activePlotList);
    let senderPlots = getPlotData();
    window.sessionStorage.setItem("active_crops",senderPlots);
    window.sessionStorage.setItem("monster_coins",monsterCoins);
    window.sessionStorage.setItem("crop_storage",cropSender);
    window.sessionStorage.setItem("growth_time",growTime);
    window.sessionStorage.setItem("buff_remaining_time", buffRemainingTime);
    window.sessionStorage.setItem("kill_time",killTime);
    window.location.href = "./index.html";
});
const battlefieldButton = document.querySelector(".battlefield-link");
battlefieldButton.addEventListener("click",()=>{
    let cropSender = [];
    for(let i = 0; i<cropStorage.length; i++){
        cropSender.push(cropStorage[i]);
    }
    window.sessionStorage.setItem("monster_coins",monsterCoins);
    window.sessionStorage.setItem("active_plots",activePlotList);
    let senderPlots = getPlotData();
    window.sessionStorage.setItem("active_crops",senderPlots);
    window.sessionStorage.setItem("crop_storage",cropSender);
    window.sessionStorage.setItem("growth_time",growTime);
    window.sessionStorage.setItem("buff_remaining_time", buffRemainingTime);
    window.sessionStorage.setItem("kill_time",killTime);
    window.location.href = "./battlefield.html";
});

function updatePlotCounter(){
    if(activePlotList.length != 12){
        activePlotList.pop();
    }
    plotCounter = 0;
    for(let i =0; i<activePlotList.length; i++){
        if(activePlotList[i]){
            plotCounter++;
        }
    }
}

function getPlotData(){
    let outwardsPlotlist = [];
    plotList.forEach(plot => {
        if(plot.hasChildNodes()){
            outwardsPlotlist.push(plot.childNodes[0].outerHTML.substring(19,plot.childNodes[0].outerHTML.length-49));
        }else{
            outwardsPlotlist.push("none");
        }
    });
    return outwardsPlotlist;
}

function plantOnPlot(crop){
    switch(crop){
        case 'stinkweed': gameLoop(0); break;
        case 'blowflower': gameLoop(1); break;
        case 'toxicshrooms': gameLoop(2); break;
        case 'zucchini': gameLoop(3); break;
        case 'purplestalk': gameLoop(4); break;
        case 'quantumonions': gameLoop(5); break;
        case 'tristemmedcarrots': gameLoop(6); break;
        case 'greenglobleaf': gameLoop(7); break;
        case 'greentree': gameLoop(8); break;
        default: break;
    }
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
        monsterCoinsLabel.innerHTML = "Monster Coins: " + monsterCoins;
        if(buffRemainingTime>0){
            buffRemainingTime-=killTime;
        }
    }, killTime);
}