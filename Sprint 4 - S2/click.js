import { buffList } from "./lists.js";
const nick = document.querySelector(".nick");
const berryLabel = document.querySelector(".berries");
const autoClickerButton = document.querySelector(".auto-upgrade");
const powerUpBox = document.querySelector(".powerup-box");

let strawberries = 1000;
let clickAmount = 1;

export let powerUps = {
    x2: false,
    x2Duration: 30000, //30 seconds
    x4: false,
    x4Duration: 15000,//15 seconds
    flashSale: false,
    flashSaleDuration: 30000,//30 seconds
    temporaryTotemUpgrade: false,
    temporaryTotemUpgradeDuration: 25000,//25 seconds
    percent10: 1.1,
    percent10Duration: 5000,//5 seconds
};

nick.addEventListener("click",()=>{
    strawberries = strawberries + clickFunction(clickAmount);
    berryLabel.innerHTML = "Strawberries: " + strawberries;
});

let autoClickerPrice = 5000;
autoClickerButton.addEventListener("click",()=>{
    if(strawberries>=autoClickerPrice){
        strawberries-=autoClickerPrice;
        berryLabel.innerHTML = "Strawberries: " + strawberries;
        autoClickerActivate();
    }
});

function autoClickerActivate(){
    setInterval(() => {
        strawberries++;
        berryLabel.innerHTML = "Strawberries: " + strawberries;
    }, 1000);
}

autoClickerButton.addEventListener("mouseover",()=>{
    autoClickerButton.innerHTML = autoClickerPrice;
});
autoClickerButton.addEventListener("mouseleave",()=>{
    autoClickerButton.innerHTML = "Auto Clicker";
});

export function displayPowerUp(powerup, duration){
    const powerupIMG = document.createElement("img");
    powerupIMG.src = buffList[powerup];
    //maybe classList.add
    powerUpBox.appendChild(powerupIMG);
    setTimeout(() => {
        powerUpBox.removeChild(powerupIMG);
    }, duration);
}

const buyTotem = document.getElementById("buy-totem");
const buyNick = document.getElementById("buy-nick");
const buySpeed = document.getElementById("buy-speed");

let upgradePrices = {
    totem: 10000,
    totemM: 2,
    nick: 1000,
    nickM: 3,
    speed: 20000,
    speedM: 4,
}

buyTotem.addEventListener("click",()=>{
    if(strawberries>=upgradePrices.totem){
        strawberries = strawberries - upgradePrices.totem;
        berryLabel.innerHTML = "Strawberries: " + strawberries;
        upgradePrices.totem = upgradePrices.totem * upgradePrices.totemM;
        clickAmount = clickAmount * upgradePrices.totemM;
    }
});

buyNick.addEventListener("click",()=>{
    if(strawberries>=upgradePrices.nick){
        strawberries = strawberries - upgradePrices.nick;
        berryLabel.innerHTML = "Strawberries: " + strawberries;
        upgradePrices.nick = upgradePrices.nick * upgradePrices.nickM;
        clickAmount = clickAmount * upgradePrices.nickM;
    }
});

buySpeed.addEventListener("click",()=>{
    if(strawberries>=upgradePrices.speed){
        strawberries = strawberries - upgradePrices.speed;
        berryLabel.innerHTML = "Strawberries: " + strawberries;
        upgradePrices.speed = upgradePrices.speed * upgradePrices.speedM;
        clickAmount = clickAmount * upgradePrices.speedM;
    }
});

function clickFunction(amount){
    if(powerUps.x2===true){
        amount *= 2;
    }
    if(powerUps.x4===true){
        amount *= 4;
    }
    return amount;
}