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
const farmland = document.querySelector(".farmland");
const monsterCoinsLabel = document.querySelector(".monster-coins");
let monsterCoins = window.sessionStorage.getItem("monster_coins");
monsterCoinsLabel.innerHTML = "Monster Coins: " + monsterCoins;

let plotCounter = 0;    //maintains current plot to plant at
let plotList = [plot1, plot2, plot3, plot4, plot5, 
                plot6, plot7, plot8, plot9, plot10, 
                plot11, plot12];


let intervalIDList = []; //used to clear crops

gameLoop(0);

function gameLoop(cropID){
    let plotNumber = plotCounter;
    let intervalID = setInterval(() => { //growth interval
        createCrop(plotList[plotNumber], cropID,intervalID); // 0->cropID
        cropStorage[cropID]++;
        cropStorageLabels[cropID].innerHTML = cropStorage[cropID];
        console.log(cropStorage);
    }, 5500);
    plotCounter++;
}

function createCrop(plot, imgIndex,intervalNumber){ //one iteration of growth
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
            farmland.appendChild(sellText);
        }
        
    });
    plot.addEventListener("mouseleave",()=>{
        if(plot.hasChildNodes()){
            plot.style.border = "none";
            farmland.removeChild(sellText);
        }
    });
    plot.addEventListener("click",()=>{
        if(plot.hasChildNodes()){
            plot.style.border = "none";
            clearInterval(intervalNumber);
            intervalNumber = null;
            plotCounter--;
        }
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
        //play harvest noise
    }, 5550);
}

//pop-ups
const cropShop = document.querySelector(".crop-shop");
const soilShop = document.querySelector(".soil-shop");
const cropShopX = document.querySelector(".x-out-crop-shop");
const soilShopX = document.querySelector(".x-out-soil-shop");
const cropShopButton = document.querySelector(".crop-button");
const soilShopButton = document.querySelector(".soil-button");

cropShopButton.addEventListener("click",()=>{
    cropShop.style.visibility = "visible";
});
cropShopX.addEventListener("click",()=>{
    cropShop.style.visibility = "hidden";
});

soilShopButton.addEventListener("click",()=>{
    soilShop.style.visibility = "visible";
});
soilShopX.addEventListener("click",()=>{
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
        if(monsterCoins>=crop.price){
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
});

let kitchenSourcedCrops= [];
let tempA = [];
window.addEventListener("load",()=>{
    kitchenSourcedCrops = window.sessionStorage.getItem("crop_storage");
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
    console.log(kitchenSourcedCrops);
});
const kitchenButton = document.querySelector(".index-link");
kitchenButton.addEventListener("click",()=>{
    let cropSender = [];
    for(let i = 0; i<cropStorage.length; i++){
        cropSender.push(cropStorage[i]);
    }
    window.sessionStorage.setItem("crop_storage",cropSender);
    window.location.href = "./index.html";
});