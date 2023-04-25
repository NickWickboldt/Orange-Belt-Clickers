import { dimensions, dimensionPriceList } from "./lists.js";
//Crystal clicking
const crystal = document.querySelector(".crystal");
const crystalLabel = document.querySelector(".crystals");
const autoClickerButton = document.querySelector(".auto-clicker");

let crystals = 50000;
let clickAmount = 1;
crystalLabel.innerHTML = "Crystals: 0";

crystal.addEventListener("click",()=>{
    crystals = crystals + clickAmount;
    crystalLabel.innerHTML = "Crystals: "+ crystals;
});
//Shop pop-up
const shopButton = document.querySelector(".shop");
const shopPopup = document.querySelector(".shop-popup");
const close = document.querySelector(".x-out");
//open shop
shopButton.addEventListener("click",()=>{
    shopPopup.style.visibility = "visible";
});
//close shop
close.addEventListener("click",()=>{
    shopPopup.style.visibility = "hidden"; 
});

let autoClickID = 0;
let autoCost = 5000;
autoClickerButton.innerHTML = "Auto-Clicker: 5000";
autoClickerButton.addEventListener("click",()=>{
    if(crystals>=autoCost){
        crystals = crystals - autoCost;
        autoClickerButton.innerHTML = "PURCHASED";
        crystalLabel.innerHTML = "Crystals: " + crystals;
        autoClickID = autoClickerStart();
    }
});

let autoClickInterval = 1000;
function autoClickerStart(){
    return setInterval(() => {
        crystals += clickAmount;
        crystalLabel.innerHTML = "Crystals: " + crystals;
    }, autoClickInterval);
}

const trader = document.querySelector(".trader");
let chance = 0;
const hundred = 100;
trader.style.visibility = "hidden";

setInterval(() => {
    trader.style.visibility = "visible";
    
    setTimeout(() => {
        trader.style.visibility = "hidden";
    }, 5000);
}, 180000);

trader.addEventListener("click",()=>{
    if(trader.style.visibility === "visible"){
        chance = Math.round(Math.random() * 100);
        if(chance===1){
            crystals = 0;
        }else if(chance<50){
            crystals*=2;
        }else{
            crystals+=1;
        }
        trader.style.visibility = "hidden";
    }
    crystalLabel.innerHTML = "Crystals: " + crystals;
});

const spinner = document.querySelector(".spinner");
spinner.style.transition = "5s ease";

spinner.addEventListener("click",()=>{
    let result = Math.round(Math.random()*360); //random 0deg - 360deg
    let spinDegrees = result + 3000; 
    spinner.style.transform = "rotateZ(" + spinDegrees + "deg)";
});

let armorButton = document.querySelector(".armor");
let armor = {
    price: 500,
    multiplier: 2
}
armorButton.addEventListener("mouseover",()=>{
    armorButton.style.backgroundImage = "url()"; //remove bg
    armorButton.style.backgroundColor = "darkslategrey"; //bg color
    armorButton.style.color = "white"; //text color
    armorButton.innerHTML = armor.price; //set text to price
});
armorButton.addEventListener("mouseleave",()=>{
    armorButton.style.backgroundImage = "url(./armor.png)"; //add bg
    armorButton.style.backgroundColor = "burlywood"; //reset bg color
    armorButton.innerHTML = ""; //remove text
});

armorButton.addEventListener("click",()=>{
    if(crystals>=armor.price){
        crystals = crystals - armor.price;
        armor.price = armor.price * armor.multiplier;
        armorButton.innerHTML = armor.price;
        crystalLabel.innerHTML = "Crystals: " + crystals;
        clickAmount = clickAmount *2;
    }
});

let enchantButton = document.querySelector(".enchantments");
let enchant = {
    price: 1000,
    multiplier: 3
}
enchantButton.addEventListener("mouseover",()=>{
    enchantButton.style.backgroundImage = "url()"; //remove bg
    enchantButton.style.backgroundColor = "darkslategrey"; //bg color
    enchantButton.style.color = "white"; //text color
    enchantButton.innerHTML = enchant.price; //set text to price
});
enchantButton.addEventListener("mouseleave",()=>{
    enchantButton.style.backgroundImage = "url(./enchantments.png)"; //add bg
    enchantButton.style.backgroundColor = "burlywood"; //reset bg color
    enchantButton.innerHTML = ""; //remove text
});

const multiverseTeleporter = document.querySelector(".teleporter");
let currentDimension = 0;
document.body.style.backgroundImage = 
        "url(" + dimensions[currentDimension] + ")"; //start in space
multiverseTeleporter.style.color = "white";
multiverseTeleporter.innerHTML = dimensionPriceList[currentDimension];

multiverseTeleporter.addEventListener("click",()=>{
    if(crystals>dimensionPriceList[currentDimension]){
        crystals = crystals - dimensionPriceList[currentDimension];
        currentDimension++; //go to new dimension
        crystalLabel.innerHTML = "Crystals: " + crystals; //update text
        document.body.style.backgroundImage = 
        "url(" + dimensions[currentDimension] + ")"; //set new background
        multiverseTeleporter.innerHTML = dimensionPriceList[currentDimension];
    }
});