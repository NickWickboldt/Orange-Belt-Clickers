import { buffList } from "./lists.js";
const nick = document.querySelector(".nick");
const berryLabel = document.querySelector(".berries");
const autoClickerButton = document.querySelector(".auto-upgrade");
const powerUpBox = document.querySelector(".powerup-box");

let strawberries = 0;

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
    strawberries = strawberries + 1;
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