import { currentTotem,clickAmount,currentNick,aDuration } from "./click.js";
const totemsGUI  = document.querySelector(".totem-popup");
const upgradesGUI  = document.querySelector(".upgrades-popup");
const shopGUI  = document.querySelector(".shop-popup");
const totemsX  = document.querySelector(".totem-x");
const upgradesX  = document.querySelector(".upgrades-x");
const shopX  = document.querySelector(".shop-x");
const totemButton = document.querySelector(".totems");
const upgradesButton = document.querySelector(".upgrades");
const shopButton = document.querySelector(".shop");

let buttonArray = [totemButton, upgradesButton, shopButton];
let XArray = [totemsX, upgradesX, shopX];

buttonArray.forEach(button => {
    button.addEventListener("click",()=>{
        if(button === totemButton){
            totemsGUI.style.visibility = "visible";
            totemText.innerHTML = "Totem Level: " + currentTotem;
        }
        if(button === upgradesButton){
            upgradesGUI.style.visibility = "visible";
            nickText.innerHTML = "Nick Level: " + currentNick;
            speedText.innerHTML = "Current Speed: " + Math.round(aDuration);
        }
        if(button === shopButton){
            shopGUI.style.visibility = "visible";
        }
    });
});

XArray.forEach(X => {
    X.addEventListener("click",()=>{
        X.parentElement.style.visibility = "hidden";
    });
});

const totemText = document.createElement("p");

totemText.classList.add("level-text");
totemsGUI.appendChild(totemText);

const nickText = document.createElement("p");
const speedText = document.createElement("p");

nickText.classList.add("level-text");
speedText.classList.add("level-text");
upgradesGUI.appendChild(nickText);
upgradesGUI.appendChild(speedText);