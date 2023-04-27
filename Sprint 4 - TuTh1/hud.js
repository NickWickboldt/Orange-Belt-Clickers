import { monkeyHP, clickAmount, currentWeaponIMG } from "./click.js";
import { weaponList } from "./lists.js";
const inventory = document.querySelector(".inventory");
const shop = document.querySelector(".shop");
const iHUD = document.querySelector(".inventory-hud");
const sHUD = document.querySelector(".shop-hud");
const x1 = document.querySelector(".x-out1");
const x2 = document.querySelector(".x-out2");
const hpLabel = document.querySelector(".hp-label");
const currentWeapon = document.querySelector(".weapon-img");
//damage here
const bpc = document.querySelector(".bpc");
//bps here

shop.addEventListener("click",()=>{
    sHUD.style.visibility = "visible";
});

inventory.addEventListener("click",()=>{
    hpLabel.innerHTML = "Monkey HP: " + monkeyHP;
    currentWeapon.src = weaponList[currentWeaponIMG];
    bpc.innerHTML = "BPC: " + clickAmount;
    iHUD.style.visibility = "visible";
});

x1.addEventListener("click",()=>{
    sHUD.style.visibility = "hidden";
});

x2.addEventListener("click",()=>{
    iHUD.style.visibility = "hidden";
});