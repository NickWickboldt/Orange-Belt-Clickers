import { weaponList } from "./lists.js";
const bananaAmount = document.querySelector(".banana-amount");
const tree = document.querySelector(".tree");
const attackMonkeyBox = document.querySelector(".attack-monkeys");
const gameoverScreen  = document.querySelector(".gameover");
const gameoverButton = document.querySelector(".play-again");
let monkeyArray = [];
let attackingMonkeyArray = [];
export let damageAmount = 1;
export let clickAmount = 1;
export let monkeyHP = 23;
export let autoClickerDuration = 1000;
let upgradeCosts = {
    defense: 500,
    defenseMultiplier: 3,
    autoClicker: 10000,
    speed: 15000,
    speedMultiplier: 2,
    weapons: 200,
    weaponsMultiplier: 2
}
export let currentWeaponIMG = 0;
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
            setTimeout(() => {
                if(monkey.style.top = "60%"){
                    attackingMonkeyArray.push(stealBananas());
                }
            }, 10000);
        }, 10000);
    });
}
function stealBananas(){
    return (
        setInterval(() => {
            bananas--;
            bananaAmount.innerHTML = "Bananas: " + bananas;
            if(bananas<0){
                gameoverScreen.style.visibility = "visible";
            }
        }, 500)
    );
}
gameoverButton.addEventListener("click",()=>{
    window.location.reload();
});

function monkeyHealth(health){
    monkeyArray.forEach(monkey => {
        let currentHP = 0;
        monkey.addEventListener("click",()=>{
            currentHP= currentHP + damageAmount;
            if(currentHP>=health){
                clearInterval(attackingMonkeyArray.pop());
                bananas+=25;
                bananaAmount.innerHTML = "Bananas: " + bananas;
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
        damageAmount+=2;
        createMonkey();
    }
});

function updateWeaponIMG(){
    const weaponIMG = document.createElement("img");
    weaponIMG.src = weaponList[currentWeaponIMG];
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
let autoClickerID;
function autoClicker(){
    autoClickerID = setInterval(() => {
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
        monkeyHP++;
    }
});

speedButton.addEventListener("click",()=>{
    if(bananas >= upgradeCosts.speed){
        createMonkey();
        bananas = bananas - upgradeCosts.speed;
        upgradeCosts.speed = upgradeCosts.speed * upgradeCosts.speedMultiplier;
        bananaAmount.innerHTML = "Bananas: " + bananas;
        speedButton.innerHTML = upgradeCosts.speed;
        clearInterval(autoClickerID);
        autoClickerDuration = Math.round(autoClickerDuration * .9);
        autoClicker();
    }
});

const bossBox = document.querySelector(".bossfight-box");
const healthbar = document.querySelector(".healthbar");
const boss = document.querySelector(".boss");

function spawnBoss(){
    setTimeout(() => {
        bossBox.style.visibility = "visible";
        bossfight();
    }, 1000);
}

function bossfight(){
    //creating health
    let bossHealth = document.createElement("div");
    bossHealth.classList.add("health");
    healthbar.appendChild(bossHealth);
    //starting theft
    let bossID = setInterval(() => {
        bananas--;
        bananaAmount.innerHTML = "Bananas: " + bananas;
    }, 300);
    //defeat boss mechanic
    let health = 100;
    boss.addEventListener("click",()=>{
        health--;
        bossHealth.style.width = health + "%";
        if(health===0){
            bananas+= Math.round((.05 * bananas));
            bananaAmount.innerHTML = "Bananas: " + bananas;
            clearInterval(bossID);
            bossBox.style.visibility = "hidden";
            healthbar.removeChild(bossHealth);
            spawnBoss();
        }
    });
}
spawnBoss();