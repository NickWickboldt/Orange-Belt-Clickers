import { snackList,decorationList } from "./lists.js";
const presents = document.querySelector(".presents");
const coinLabel = document.querySelector(".coins");
const snackStand = document.querySelector(".stand2");
const entertainer = document.querySelector(".ent-pic");
const tree2 = document.querySelector(".tree2");
const snackIMG = document.createElement("img");
const grid3 = document.querySelector(".grid-3");
const decorationStand = document.querySelector(".stand1");


let prices = {
    snackPrice: 100,
    snackPriceMultiplier: 2,
    decorationPrice: 1000,
    decorationMultiplier: 5,
}
let currentSnack = 0;
let currentDecoration = 0;
let clickAmount = 1;
let coins = 1000;

presents.addEventListener("click",()=>{
    coins = coins + clickAmount;
    coinLabel.innerHTML = "Chameleon Coins: " + coins;
});
setSnackImage(currentSnack);
snackStand.addEventListener("click",()=>{
    if(coins>=prices.snackPrice){
        coins-=prices.snackPrice;
        coinLabel.innerHTML = "Chameleon Coins: " + coins;
        prices.snackPrice = prices.snackPrice * prices.snackPriceMultiplier;
        currentSnack++;
        clickAmount = clickAmount * prices.snackPriceMultiplier;
        setSnackImage(currentSnack);
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


function setSnackImage(snackIdentifier){
    
    snackIMG.src = snackList[snackIdentifier];
    snackIMG.classList.add("snack-img");
    grid3.appendChild(snackIMG);
}

decorationStand.addEventListener("click",()=>{
    if(coins>=prices.decorationPrice){
        coins-=prices.decorationPrice;
        coinLabel.innerHTML = "Chameleon Coins: " + coins;
        prices.decorationPrice = 
        prices.decorationPrice * prices.decorationMultiplier;
        currentDecoration++;
        clickAmount = clickAmount * prices.decorationMultiplier;

    }
});
decorationStand.addEventListener("mouseover",()=>{
    currentDisplay =  displayPrice("Decoration: ",prices.decorationPrice);
});
decorationStand.addEventListener("mouseleave",()=>{
    removeDisplayPrice(currentDisplay);
});