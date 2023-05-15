import {blockArray, pickaxeArray, dimensionList,
        fortuneList, efficiencyList, rarityList,
        blacksmithList, farmerList, librarianList} from "./lists.js";

let vSound1 = new Audio("./sounds/villagerSound1.mp3");
let vSound2 = new Audio("./sounds/villagerSound2.mp3");
let vSound3 = new Audio("./sounds/villagerSound3.mp3");
let blockSound = new Audio("./sounds/blockHit.mp3");
let enchantSound = new Audio("./sounds/enchant.mp3");
let vSoundList = [vSound1, vSound2, vSound3];

const block = document.querySelector(".block");
let gameTitle = document.querySelector(".title");
let blockAmountLabel = document.querySelector(".blocks");
let pickaxe = document.querySelector(".pickaxe");
const blockUpgradeButton = document.querySelector(".block-upgrade");

let blockAmount = 9999990;
let blockUpgradeCost = 20;
let blockUpgradeCounter = 0;
let multipliers = {
    blockUpgradeValue: 20,
    blockUpgradeTriplet: 3,
    pickaxeUpgradeValue: 200,
    pickaxeUpgradeMultiplier: 2
};
let clickAmount = 0;
let blacksmithID, farmerID, librarianID;
let aDuration = 1000;

blockAmountLabel.innerHTML = "Blocks: " + blockAmount;

block.addEventListener("click", ()=>{
    blockSound.play();
    if(clickAmount===0){
        blockAmount++;
    }else{
        let enchantAccess = enchantValuesOnClick();
        blockAmount += (
            clickAmount + (clickAmount * enchantAccess[1])
            + enchantAccess[0]
        );
    }
    blockAmountLabel.innerHTML = "Blocks: " + blockAmount;
    pickaxe.style.transform = "rotateZ(60deg)";
    setTimeout(()=>{
        pickaxe.style.transform = "rotateZ(0deg)";
    },.1);
});
blockUpgradeButton.innerHTML = "Block Upgrade: " + blockUpgradeCost;
blockUpgradeButton.addEventListener("click",()=>{
    if(blockAmount>=blockUpgradeCost){
        blockUpgradeCounter++;
        block.src = blockArray[blockUpgradeCounter];
        blockAmount = blockAmount - blockUpgradeCost;
        clickAmount++;
        
        if(blockUpgradeCounter % multipliers.blockUpgradeTriplet === 0){
            blockUpgradeCost*=10;
        }
        blockUpgradeCost+=20;
        blockUpgradeButton.innerHTML = "Block Upgrade: " + blockUpgradeCost;
        blockAmountLabel.innerHTML = "Blocks: " + blockAmount;
    }
});

const pickaxeUpgradeButton = document.querySelector(".pickaxe-upgrade");
let pickaxeUpgradeCounter = 0;
let pickaxeUpgradeCost = 200;

pickaxeUpgradeButton.innerHTML = "Pickaxe Upgrade: " + multipliers.pickaxeUpgradeValue;
pickaxeUpgradeButton.addEventListener("click",()=>{
    if(blockAmount>=pickaxeUpgradeCost){
        pickaxeUpgradeCounter++;
        pickaxe.src = pickaxeArray[pickaxeUpgradeCounter];
        blockAmount = blockAmount - pickaxeUpgradeCost; ///////

        
        clickAmount*=multipliers.pickaxeUpgradeMultiplier;
        pickaxeUpgradeCost*=3;
        pickaxeUpgradeButton.innerHTML = "Pickaxe Upgrade: " + pickaxeUpgradeCost;
        blockAmountLabel.innerHTML = "Block: " + blockAmount;/////
    }
});

const dimensionButton = document.querySelector(".dimension");
let currentDimension = 0;
let dimensionArray = [0, 1000000, 1000000000];

document.body.style.backgroundImage = "url(" + dimensionList[0] + ")";
dimensionButton.innerHTML = "Dimension Hop: " + dimensionArray[1];
dimensionButton.addEventListener("click",()=>{
    if(blockAmount>= dimensionArray[currentDimension+1]){
        if((currentDimension===0) && (blockUpgradeCounter>=10) && (pickaxeUpgradeCounter>=8) ){
            updateDimension();
            gameTitle.style.color = "white";
            blockAmountLabel.style.color = "white";
        }
        if((currentDimension===1) && (blockUpgradeCounter>=15) && (pickaxeUpgradeCounter>=14) ){
            updateDimension();
            dimensionButton.innerHTML = "MAX LEVEL";
        }
    }
});

const enchantPopup = document.querySelector(".enchantment-popup");
const enchantX = document.querySelector(".enchant-x");
const enchantIMG = document.querySelector(".enchantments");

enchantIMG.addEventListener("click",()=>{
    enchantPopup.style.visibility = "visible";
});
enchantX.addEventListener("click",()=>{
    enchantPopup.style.visibility = "hidden";
});

const fortuneLabel = document.getElementById("fortune-label");
const efficiencyLabel = document.getElementById("efficiency-label");
const rarityLabel = document.getElementById("rarity-label");

const fortuneButton = document.querySelector(".fortune");
const efficiencyButton = document.querySelector(".efficiency");
const rarityButton = document.querySelector(".rarity");

let enchantTracker = [0,0,0]; //[f,e,r]

fortuneButton.addEventListener("mouseover",()=>{
    fortuneLabel.innerHTML = fortuneList[enchantTracker[0]];
});
fortuneButton.addEventListener("mouseleave",()=>{
    fortuneLabel.innerHTML = "Fortune";
}); 

efficiencyButton.addEventListener("mouseover",()=>{
    efficiencyLabel.innerHTML = efficiencyList[enchantTracker[1]];
});
efficiencyButton.addEventListener("mouseleave",()=>{
    efficiencyLabel.innerHTML = "Efficiency";
}); 

rarityButton.addEventListener("mouseover",()=>{
    rarityLabel.innerHTML = rarityList[enchantTracker[2]];
});
rarityButton.addEventListener("mouseleave",()=>{
    rarityLabel.innerHTML = "Rarity";
}); 

fortuneButton.addEventListener("click",()=>{
    if(blockAmount>fortuneList[enchantTracker[0]]){
        enchantSound.play();
        if(enchantTracker[0]===3){
            fortuneLabel.innerHTML = fortuneList[enchantTracker[0]];
            return;
        }
        blockAmount = blockAmount - fortuneList[enchantTracker[0]];
        blockAmountLabel.innerHTML = "Blocks: " + blockAmount;
        enchantTracker[0]++;
        fortuneLabel.innerHTML = fortuneList[enchantTracker[0]];
    }
});

efficiencyButton.addEventListener("click",()=>{
    if(blockAmount>efficiencyList[enchantTracker[1]]){
        enchantSound.play();
        if(enchantTracker[1]===5){
            efficiencyLabel.innerHTML = efficiencyList[enchantTracker[1]];
            return;
        }
        blockAmount = blockAmount - efficiencyList[enchantTracker[1]];
        blockAmountLabel.innerHTML = "Blocks: " + blockAmount;
        enchantTracker[1]++;
        efficiencyLabel.innerHTML = efficiencyList[enchantTracker[1]];
        aDuration-=100;
        if(!(blacksmithID===null)){
            clearInterval(blacksmithID);
            startAutoclicker("Blacksmith",aDuration);
        }
        if(!(farmerID===null)){
            clearInterval(farmerID);
            startAutoclicker("Farmer",aDuration)
        }
        if(!(librarianID===null)){
            clearInterval(librarianID);
            startAutoclicker("Librarian",aDuration);
        }
    }
});

rarityButton.addEventListener("click",()=>{
    if(blockAmount>rarityList[enchantTracker[2]]){
        enchantSound.play();
        if(enchantTracker[2]===3){
            rarityLabel.innerHTML = rarityList[enchantTracker[2]];
            return;
        }
        blockAmount = blockAmount - rarityList[enchantTracker[2]];
        blockAmountLabel.innerHTML = "Blocks: " + blockAmount;
        enchantTracker[2]++;
        rarityLabel.innerHTML = rarityList[enchantTracker[2]];
    }
});

function enchantValuesOnClick(){
    let fortune = Math.ceil(Math.random() * (enchantTracker[0]) * 10);
    let rarity = Math.ceil(Math.random() * (enchantTracker[2]) * 3);
    let tempArray;
    return (
        tempArray = [fortune,rarity]
    )
}

const blacksmith = { 
    object: document.querySelector(".villager1"),
    id: 0,
    name: "Blacksmith",
    level: 0,
    cost: 0
}
const farmer = {
    object: document.querySelector(".villager2"),
    id: 1,
    name: "Farmer",
    level: 0,
    cost: 0
}
const librarian = {
    object: document.querySelector(".villager3"),
    id: 2,
    name: "Librarian",
    level: 0,
    cost: 0
}
blacksmith.cost = blacksmithList[blacksmith.level];
farmer.cost = farmerList[farmer.level];
librarian.cost = librarianList[librarian.level];

let villagerArray = [blacksmith,farmer,librarian];
let villagerLevelList = [blacksmithList,farmerList,librarianList];

villagerArray.forEach(villager => {
    const textBox = document.createElement("p");
    textBox.innerHTML = `${villager.name} upgrade: ${villager.cost}`;
    textBox.classList.add("popup-textbox");
    villager.object.addEventListener("mouseover",(e)=>{
        let randomSound =  Math.floor(Math.random() * 3);
        vSoundList[randomSound].play(); 
        textBox.style.top = e.pageY - 40 + 'px';
        textBox.style.left = e.pageX + 40 + 'px';
        document.body.appendChild(textBox);
    });
    villager.object.addEventListener("mouseleave",()=>{
        document.body.removeChild(textBox);
    });
    villager.object.addEventListener("click",()=>{
        if(villager.cost === "Max Level"){
            return;
        }
        //check for money here
        startAutoclicker(villager.name,aDuration);
        blockAmount = blockAmount - villager.cost;
        blockAmountLabel.innerHTML = "Blocks: " + blockAmount;
        villager.level++;
        let update = villagerLevelList[villager.id];
        villager.cost = update[villager.level];
        textBox.innerHTML = `${villager.name} upgrade: ${villager.cost}`;
    });
});

function startAutoclicker(name,autoclickerDuration){
    switch(name){
        case "Blacksmith":
            blacksmithID = setInterval(() => {
                blockAmount = blockAmount + clickAmount;
                blockAmountLabel.innerHTML = "Blocks: " + blockAmount;
            }, autoclickerDuration);
            break;
        case "Farmer":
            farmerID = setInterval(() => {
                blockAmount = blockAmount + clickAmount;
                blockAmountLabel.innerHTML = "Blocks: " + blockAmount;
            }, autoclickerDuration/2);
            break;
        case "Librarian":
            librarianID = setInterval(() => {
                blockAmount = blockAmount + clickAmount;
                blockAmountLabel.innerHTML = "Blocks: " + blockAmount;
            }, autoclickerDuration/3);
            break;
    }
}

function updateDimension(){
    blockAmount -= dimensionArray[currentDimension+1];
    currentDimension++;
    dimensionButton.innerHTML = 
    "Dimension Hop: " + dimensionArray[currentDimension+1];
    blockAmountLabel.innerHTML = "Blocks: " + blockAmount;
    document.body.style.backgroundImage = 
    "url(" + dimensionList[currentDimension] + ")";
}