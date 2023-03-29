const block = document.querySelector(".block");
let blockAmountLabel = document.querySelector(".blocks");
let pickaxe = document.querySelector(".pickaxe");

let blockAmount = 0;

blockAmountLabel.innerHTML = "Blocks: " + blockAmount;

block.addEventListener("click", ()=>{
    blockAmount++;
    blockAmountLabel.innerHTML = "Blocks: " + blockAmount;
    pickaxe.style.transform = "rotateZ(60deg)";
    setTimeout(()=>{
        pickaxe.style.transform = "rotateZ(0deg)";
    },.1);
});