//Crystal clicking
const crystal = document.querySelector(".crystal");
const crystalLabel = document.querySelector(".crystals");
const autoClickerButton = document.querySelector(".auto-clicker");

export let crystals = 5000;
let clickAmount = 1;
crystalLabel.innerHTML = "Crystals: 0";

crystal.addEventListener("click",()=>{
    crystals++;
    crystalLabel.innerHTML = "Crystals: "+ crystals;
});
//Shop pop-up
const shopButton = document.querySelector(".shop");
const shopPopup = document.querySelector(".shop-popup");
const close = document.querySelector(".x-out");
//open shop
shopButton.addEventListener("click",()=>{
    shopPopup.style.visibility = "visible";
});
//close shop
close.addEventListener("click",()=>{
    shopPopup.style.visibility = "hidden"; 
});

let autoClickID = 0;
let autoCost = 5000;
autoClickerButton.innerHTML = "Auto-Clicker: 5000";
autoClickerButton.addEventListener("click",()=>{
    if(crystals>=autoCost){
        crystals = crystals - autoCost;
        autoClickerButton.innerHTML = "PURCHASED";
        crystalLabel.innerHTML = "Crystals: " + crystals;
        autoClickID = autoClickerStart();
    }
});

let autoClickInterval = 1000;
function autoClickerStart(){
    return setInterval(() => {
        crystals += clickAmount;
        crystalLabel.innerHTML = "Crystals: " + crystals;
    }, autoClickInterval);
}