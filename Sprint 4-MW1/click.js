import {blockArray, pickaxeArray, dimensionList,
        fortuneList, efficiencyList, rarityList} from "./lists.js";

const block = document.querySelector(".block");
let blockAmountLabel = document.querySelector(".blocks");
let pickaxe = document.querySelector(".pickaxe");
const blockUpgradeButton = document.querySelector(".block-upgrade");

let blockAmount = 0;
let blockUpgradeCost = 20;
let blockUpgradeCounter = 0;
let multipliers = {
    blockUpgradeValue: 20,
    blockUpgradeTriplet: 3,
    pickaxeUpgradeValue: 200,
    pickaxeUpgradeMultiplier: 2
};
let clickAmount = 0;

blockAmountLabel.innerHTML = "Blocks: " + blockAmount;

block.addEventListener("click", ()=>{
    if(clickAmount===0){
        blockAmount++;
    }else{
        blockAmount = blockAmount + clickAmount;
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
        blockAmount -= dimensionArray[currentDimension+1];
        currentDimension++;
        dimensionButton.innerHTML = 
        "Dimension Hop: " + dimensionArray[currentDimension+1];
        blockAmountLabel.innerHTML = "Blocks: " + blockAmount;
        document.body.style.backgroundImage = 
        "url(" + dimensionList[currentDimension] + ")";
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