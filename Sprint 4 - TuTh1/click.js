import { weaponList } from "./lists.js";
const bananaAmount = document.querySelector(".banana-amount");
const tree = document.querySelector(".tree");
const attackMonkeyBox = document.querySelector(".attack-monkeys");
let monkeyArray = [];
let clickAmount = 1;
let monkeyHP = 5;
let autoClickerDuration = 1000;
let upgradeCosts = {
    defense: 500,
    defenseMultiplier: 3,
    autoClicker: 10000,
    speed: 15000,
    speedMultiplier: 2,
    weapons: 200,
    weaponsMultiplier: 2
}
let currentWeaponIMG = 0;
let bananas = 100000;

tree.addEventListener("click",()=>{
    bananas = bananas + clickAmount;
    bananaAmount.innerHTML = "Bananas: " + bananas;
});
createMonkey();
function createMonkey(){
    let monkey = document.createElement("div");
    monkeyArray.push(monkey);
    monkey.classList.add("monkey");
    attackMonkeyBox.appendChild(monkey);
    monkeyHealth(monkeyHP);
}
let timeoutID = attack();
function attack(){
    let id;
    return monkeyArray.forEach(monkey => {
        return id = setTimeout(() => {
            monkey.style.transition = "10s ease";
            monkey.style.top = "60%";
        }, 10000);
    });
}

function monkeyHealth(health){
    monkeyArray.forEach(monkey => {
        let currentHP = 0;
        monkey.addEventListener("click",()=>{
            currentHP++;
            if(currentHP===health){
                currentHP = 0;
                clearInterval(timeoutID);
                monkey.style.transition = "0s";
                monkey.style.top = "-10%";
                timeoutID = attack();  
            }
            
        });
    });
}

const defenseButton = document.querySelector(".defense");
const autoClickerButton = document.querySelector(".auto-clicker");
const speedButton = document.querySelector(".speed");
const weaponButton = document.querySelector(".weapons");

defenseButton.addEventListener("mouseover",()=>{
    defenseButton.innerHTML = upgradeCosts.defense;
});
defenseButton.addEventListener("mouseleave",()=>{
    defenseButton.innerHTML = "Defense Upgrade";
});

autoClickerButton.addEventListener("mouseover",()=>{
    autoClickerButton.innerHTML = upgradeCosts.autoClicker;
});
autoClickerButton.addEventListener("mouseleave",()=>{
    autoClickerButton.innerHTML = "Auto Clicker Upgrade";
});

speedButton.addEventListener("mouseover",()=>{
    speedButton.innerHTML = upgradeCosts.speed;
});
speedButton.addEventListener("mouseleave",()=>{
    speedButton.innerHTML = "Speed Upgrade";
});

weaponButton.addEventListener("mouseover",()=>{
    weaponButton.innerHTML = upgradeCosts.weapons;
    updateWeaponIMG();
});
weaponButton.addEventListener("mouseleave",()=>{
    weaponButton.innerHTML = "Weapon Upgrade";
    
});

weaponButton.addEventListener("click",()=>{
    if(bananas>=upgradeCosts.weapons){
        bananas = bananas - upgradeCosts.weapons;
        upgradeCosts.weapons = upgradeCosts.weapons * upgradeCosts.weaponsMultiplier;
        bananaAmount.innerHTML = "Bananas: " + bananas;
        weaponButton.innerHTML = upgradeCosts.weapons;
        currentWeaponIMG++;
        createMonkey();
    }
});

function updateWeaponIMG(){
    const weaponIMG = document.createElement("img");
    weaponIMG.src = weaponList[currentWeaponIMG];
    weaponIMG.classList.add("weapon-img");
    weaponButton.appendChild(weaponIMG);
}

autoClickerButton.addEventListener("click",()=>{
    if(upgradeCosts.autoClicker === "PURCHASED"){
        return;
    }
    else if(bananas> upgradeCosts.autoClicker){
        bananas = bananas - upgradeCosts.autoClicker;
        bananaAmount.innerHTML = "Bananas: " + bananas;
        autoClickerButton.innerHTML = "PURCHASED";
        upgradeCosts.autoClicker = "PURCHASED";
        autoClicker();
    }
});

function autoClicker(){
    setInterval(() => {
        bananas = bananas + clickAmount;
        bananaAmount.innerHTML = "Bananas: " + bananas;
    }, autoClickerDuration);
}

defenseButton.addEventListener("click",()=>{
    if(bananas >= upgradeCosts.defense){
        createMonkey();
        bananas = bananas - upgradeCosts.defense;
        upgradeCosts.defense = upgradeCosts.defense * upgradeCosts.defenseMultiplier;
        bananaAmount.innerHTML = "Bananas: " + bananas;
        defenseButton.innerHTML = upgradeCosts.defense;
        clickAmount = clickAmount * upgradeCosts.defenseMultiplier;
    }
});