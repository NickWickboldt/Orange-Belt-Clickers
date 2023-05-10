import { dimensions, dimensionPriceList } from "./lists.js";
let crystalClickSound = new Audio("./crystal-click.mp3");
let teleportSound = new Audio("./teleport.mp3");
let spinnerSound = new Audio("./spinner.mp3");
//Crystal clicking
const crystal = document.querySelector(".crystal");
const crystalLabel = document.querySelector(".crystals");
const autoClickerButton = document.querySelector(".auto-clicker");
let spaceshipOriginal = document.querySelector(".spaceship");

let crystals = 500000000000000;
let clickAmount = 1;
crystalLabel.innerHTML = "Crystals: 0";
let armorLevel = 0;
const CPS = document.querySelector(".cps");
const armorILabel = document.querySelector(".armor-label");
const textBox = document.createElement("p");

crystal.addEventListener("click",()=>{
    crystalClickSound.play();
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
    spinnerSound.play();
    let result = Math.round(Math.random()*360); //random 0deg - 360deg
    let spinDegrees = result + 3000; 
    spinner.style.transform = "rotateZ(" + spinDegrees + "deg)";
    setTimeout(() => {
        spinnerSound.pause();
    }, 5000);
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
        clickAmount = clickAmount * 2;
        armorLevel++;
    }
});

let enchantButton = document.querySelector(".enchantments");
let enchant = {
    price: 10000,
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
        teleportSound.play();
        crystals = crystals - dimensionPriceList[currentDimension];
        currentDimension++; //go to new dimension
        crystalLabel.innerHTML = "Crystals: " + crystals; //update text
        document.body.style.backgroundImage = 
        "url(" + dimensions[currentDimension] + ")"; //set new background
        multiverseTeleporter.innerHTML = dimensionPriceList[currentDimension];
        spaceshipOriginal =  spaceshipAbsorb(spaceshipOriginal);
        textBox.innerHTML = "Teleport: " + dimensionPriceList[currentDimension];
    }
});

enchantButton.addEventListener("click",()=>{
    if(crystals>=enchant.price){
        crystals = crystals - enchant.price;
        enchant.price = enchant.price * enchant.multiplier;
        enchantButton.innerHTML = enchant.price;
        crystalLabel.innerHTML = "Crystals: " + crystals;
        autoClickInterval = autoClickInterval * .9;
        clearInterval(autoClickID);
        autoClickID = autoClickerStart();
    }
});

const spaceshipBox = document.querySelector(".spaceship-box");
function spaceshipAbsorb(spaceship){
    spaceship.classList.remove("spaceship");
    spaceship.classList.add("spaceship-transform");
    setTimeout(() => {
    spaceship.style.transform = "translateY(25vmin) scale(5%)";    
    }, 10);
    const ship = document.createElement("img");
    ship.src = "./spaceship.png";
    ship.classList.add("spaceship");
    setTimeout(() => {
        spaceship.remove();
        spaceshipBox.appendChild(ship);
        
    }, 500);
    return ship;
}
//inventory pop-up
const inventory = document.querySelector(".inventory");
const inventoryPopup = document.querySelector(".i-popup");
const iXOut = document.querySelector(".x-i-out");
//open inventory hop
inventory.addEventListener("click",()=>{
    inventoryPopup.style.visibility = "visible";
    updateInventory();
});
//close inventory
iXOut.addEventListener("click",()=>{
    inventoryPopup.style.visibility = "hidden"; 
});


function updateInventory() { //updates inventory text
    let clicksPerSecond;
    if(clickAmount===1){
        clicksPerSecond = 0;
    }else{
        clicksPerSecond = (autoClickInterval/1000) * clickAmount;
    }
    CPS.innerHTML = `CPS: ${clicksPerSecond}`;
    armorILabel.innerHTML = `Armor Level: ${armorLevel}`;
}


multiverseTeleporter.addEventListener("mouseover",(e)=>{
    textBox.innerHTML = "Teleport: " + dimensionPriceList[currentDimension];
    textBox.classList.add("textbox");
    textBox.style.top = e.pageY - 40 + 'px';
    textBox.style.left = e.pageX + 40 + 'px';
    document.body.appendChild(textBox);
});

multiverseTeleporter.addEventListener("mouseleave",()=>{
    document.body.removeChild(textBox);
});