const nick = document.querySelector(".nick");
const berryLabel = document.querySelector(".berries");
const autoClickerButton = document.querySelector(".auto-upgrade");

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

let autoClickerPrice = 5000;
autoClickerButton.addEventListener("click",()=>{
    if(strawberries>=autoClickerPrice){
        strawberries-=autoClickerPrice;
        berryLabel.innerHTML = "Strawberries: " + strawberries;
        autoClickerActivate();
    }
});

function autoClickerActivate(){
    setInterval(() => {
        strawberries++;
        berryLabel.innerHTML = "Strawberries: " + strawberries;
    }, 1000);
}