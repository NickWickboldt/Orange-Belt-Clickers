import { crystals } from "./click.js";
const trader = document.querySelector(".trader");
let chance = 0;
const hundred = 100;
trader.style.visibility = "hidden";

setInterval(() => {
    trader.style.visibility = "visible";
    chance = Math.round(Math.random() * 100);
    setTimeout(() => {
        trader.style.visibility = "hidden";
    }, 30000);
}, 1);

trader.addEventListener("click",()=>{
    if(trader.style.visibility === "visible"){
        if(chance===1){
            crystals = 0;
        }else if(chance<50){
            crystals*=2;
        }else{
            crystals+=1;
        }
    }
});