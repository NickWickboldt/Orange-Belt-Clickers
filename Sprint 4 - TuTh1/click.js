const bananaAmount = document.querySelector(".banana-amount");
const tree = document.querySelector(".tree");
const attackMonkeyBox = document.querySelector(".attack-monkeys");
let monkeyArray = [];
let monkeyHP = 5;
let currentHP = 0;
let upgradeCosts = {
    defense: 500,
    defenseMultiplier: 3,
    autoClicker: 10000,
    speed: 15000,
    speedMultiplier: 2,
    weapons: 200,
    weaponsMultiplier: 2
}

let bananas = 0;

tree.addEventListener("click",()=>{
    bananas++;
    bananaAmount.innerHTML = "Bananas: " + bananas;
});
createMonkey();
function createMonkey(){
    let monkey = document.createElement("div");
    monkeyArray.push(monkey);
    monkey.classList.add("monkey");
    attackMonkeyBox.appendChild(monkey);
}
let timeoutID = attack();
function attack(){
    return monkeyArray.forEach(monkey => {
        return id = setTimeout(() => {
            monkey.style.transition = "10s ease";
            monkey.style.top = "60%";
        }, 10000);
    });
}

monkeyArray.forEach(monkey => {
    monkey.addEventListener("click",()=>{
        currentHP++;
        if(currentHP===monkeyHP){
            currentHP = 0;
            clearInterval(timeoutID);
            monkey.style.transition = "0s";
            monkey.style.top = "-10%";
            timeoutID = attack();  
        }
        
    });
});

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
    const weaponIMG = document.createElement("img");
    weaponIMG.alt = "w"; // --> change to src & create list
    weaponIMG.classList.add("weapon-img");
    weaponButton.appendChild(weaponIMG);
});
weaponButton.addEventListener("mouseleave",()=>{
    weaponButton.innerHTML = "Weapon Upgrade";
});

