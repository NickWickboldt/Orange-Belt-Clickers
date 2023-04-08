const nick = document.querySelector(".nick");
const berryLabel = document.querySelector(".berries");

let strawberries = 0;

nick.addEventListener("click",()=>{
    strawberries = strawberries + 1;
    berryLabel.innerHTML = "Strawberries: " + strawberries;
});