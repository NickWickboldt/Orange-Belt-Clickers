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

let plotCounter = 0;    //maintains current plot to plant at
let plotList = [plot1, plot2, plot3, plot4, plot5, 
                plot6, plot7, plot8, plot9, plot10, 
                plot11, plot12];


let intervalIDList = []; //used to clear crops

gameLoop(0);
gameLoop(1);
gameLoop(2);
gameLoop(3);
gameLoop(4);
gameLoop(5);
gameLoop(6);
gameLoop(7);
gameLoop(8);
function gameLoop(cropID){
    let plotNumber = plotCounter;
    intervalIDList.push(setInterval(() => { //growth interval
        createCrop(plotList[plotNumber], cropID); // 0->cropID
        cropStorage[cropID]++;
        cropStorageLabels[cropID].innerHTML = cropStorage[cropID];
    }, 5500));
    plotCounter++;
}

function createCrop(plot, imgIndex){ //one iteration of growth
    const crop = document.createElement("img");
    crop.src =  cropArray[imgIndex];
    crop.classList.add("crop");
    plot.appendChild(crop);
    setTimeout(() => {
        grow(crop,plot);
    }, 50); 
}

function grow(crop,plot){
    crop.style.transform = "scale(2000%)";
    setTimeout(() => {
        plot.removeChild(crop);
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
    cropIMG.src = crop;
    cropIMG.classList.add("shop-item");
    cropShop.appendChild(cropIMG);
});

soilArray.forEach(soil => {
    const soilColor = document.createElement("div");
    soilColor.style.backgroundColor = soil;
    soilColor.classList.add("shop-item");
    soilShop.appendChild(soilColor);
});

const kitchenButton = document.querySelector(".index-link");

kitchenButton.addEventListener("click",()=>{
    let cropSender = [];
    for(let i = 0; i<cropStorage.length; i++){
        cropSender.push(cropStorage[i]);
    }
    window.localStorage.setItem("crop_storage",cropSender);
    window.location.href = "./index.html";
});