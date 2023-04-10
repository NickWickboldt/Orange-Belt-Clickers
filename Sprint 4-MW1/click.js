import {blockArray, pickaxeArray} from "./lists.js";

const block = document.querySelector(".block");
let blockAmountLabel = document.querySelector(".blocks");
let pickaxe = document.querySelector(".pickaxe");
const blockUpgradeButton = document.querySelector(".block-upgrade");

let blockAmount = 1000;
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