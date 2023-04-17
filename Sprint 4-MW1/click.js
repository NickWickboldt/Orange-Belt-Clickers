import {blockArray, pickaxeArray, dimensionList} from "./lists.js";

const block = document.querySelector(".block");
let blockAmountLabel = document.querySelector(".blocks");
let pickaxe = document.querySelector(".pickaxe");
const blockUpgradeButton = document.querySelector(".block-upgrade");

let blockAmount = 1000000000000;
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
        block.src = blockArray[blockUpgradeCounter];
        blockAmount = blockAmount - blockUpgradeCost;
        clickAmount++;
        blockUpgradeCounter++;
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
        pickaxe.src = pickaxeArray[pickaxeUpgradeCounter];
        blockAmount = blockAmount - pickaxeUpgradeCost; ///////

        pickaxeUpgradeCounter++;
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