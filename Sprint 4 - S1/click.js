const nick = document.querySelector(".nick");
const berryLabel = document.querySelector(".berries");

let strawberries = 0;

export let powerUps = {
    x2: false,
    x4: false,
    flashSale: false,
    temporaryTotemUpgrade: false,
    percent10: 1.1
};

nick.addEventListener("click",()=>{
    strawberries = strawberries + 1;
    berryLabel.innerHTML = "Strawberries: " + strawberries;
});