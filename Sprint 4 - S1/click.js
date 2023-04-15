import { snackList } from "./lists.js";
const presents = document.querySelector(".presents");
const coinLabel = document.querySelector(".coins");
const snackStand = document.querySelector(".stand2");

let prices = {
    snackPrice: 100,
    snackPriceMultiplier: 2,
}
let currentSnack = 0;
let clickAmount = 1;
let coins = 1000;

presents.addEventListener("click",()=>{
    coins = coins + clickAmount;
    coinLabel.innerHTML = "Chameleon Coins: " + coins;
});

snackStand.addEventListener("click",()=>{
    if(coins>=prices.snackPrice){
        coins-=prices.snackPrice;
        coinLabel.innerHTML = "Chameleon Coins: " + coins;
        prices.snackPrice = prices.snackPrice * prices.snackPriceMultiplier;
        snackStand.innerHTML = 
        // snackList[currentSnack].substring(8,snackList[currentSnack].length-4)
        // + ": " + prices.snackPrice;
        currentSnack++;
        clickAmount = clickAmount * prices.snackPriceMultiplier;
    }
});