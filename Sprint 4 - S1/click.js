const presents = document.querySelector(".presents");
const coinLabel = document.querySelector(".coins");

let coins = 0;

presents.addEventListener("click",()=>{
    coins = coins + 1;
    coinLabel.innerHTML = "Chameleon Coins: " + coins;
});