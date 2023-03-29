//Crystal clicking
const crystal = document.querySelector(".crystal");
const crystalLabel = document.querySelector(".crystals");

let crystals = 0;

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