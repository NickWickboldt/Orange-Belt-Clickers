import { snackList } from "./lists.js";
const presents = document.querySelector(".presents");
const coinLabel = document.querySelector(".coins");
const snackStand = document.querySelector(".stand2");
const entertainer = document.querySelector(".ent-pic");
const tree2 = document.querySelector(".tree2");

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
        currentSnack++;
        clickAmount = clickAmount * prices.snackPriceMultiplier;
    }
});

setInterval(() => {
    entertainer.style.visibility = "visible";
    randomReward();
}, 60000); //entertainer every 4 minutes

function randomReward(){
    let reward = Math.floor(Math.random()*3); // random num 0-2
    switch(reward){
        case 0:
            entertainer.src = "./images/clown.png";
            break;
        case 1:
            entertainer.src = "./images/magician.png"
            break;
        case 2:
            entertainer.src = "./images/jester.png"
            break;
    }
    entertainer.addEventListener("click",()=>{
        switch (reward) {
            case 0: //bad case
                coins = Math.round(coins/2);
                coinLabel.innerHTML = "Chameleon Coins: " + coins;
                break;
            case 1: //neutral case
                coins = Math.round(coins*1.11); //11% addition
                coinLabel.innerHTML = "Chameleon Coins: " + coins;
                break;
            case 2: //good case
                coins = Math.round(coins*1.5); //50% addition
                coinLabel.innerHTML = "Chameleon Coins: " + coins;
                break;
        }
        entertainer.style.visibility = "hidden";
    });
}
let currentDisplay
snackStand.addEventListener("mouseover",()=>{
    currentDisplay =  displayPrice("Snacks: ",prices.snackPrice);
});
snackStand.addEventListener("mouseleave",()=>{
    removeDisplayPrice(currentDisplay);
});

function displayPrice(text,price){
    const textPopup = document.createElement("h1");
    textPopup.innerHTML = `${text}$${price}`;
    textPopup.classList.add("display-text");
    tree2.appendChild(textPopup);
    return textPopup;
}
function removeDisplayPrice(item){
    tree2.removeChild(item);
}