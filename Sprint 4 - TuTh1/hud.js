const inventory = document.querySelector(".inventory");
const shop = document.querySelector(".shop");
const iHUD = document.querySelector(".inventory-hud");
const sHUD = document.querySelector(".shop-hud");
const x1 = document.querySelector(".x-out1");
const x2 = document.querySelector(".x-out2");

shop.addEventListener("click",()=>{
    sHUD.style.visibility = "visible";
});

inventory.addEventListener("click",()=>{
    iHUD.style.visibility = "visible";
});

x1.addEventListener("click",()=>{
    sHUD.style.visibility = "hidden";
});

x2.addEventListener("click",()=>{
    iHUD.style.visibility = "hidden";
});