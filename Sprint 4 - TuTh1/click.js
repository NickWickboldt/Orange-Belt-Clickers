const bananaAmount = document.querySelector(".banana-amount");
const tree = document.querySelector(".tree");
const attackMonkeyBox = document.querySelector(".attack-monkeys");
let monkeyArray = [];

let bananas = 0;

tree.addEventListener("click",()=>{
    bananas++;
    bananaAmount.innerHTML = "Bananas: " + bananas;
});
createMonkey();
function createMonkey(){
    let monkey = document.createElement("div");
    monkeyArray.push(monkey);
    monkey.classList.add("monkey");
    attackMonkeyBox.appendChild(monkey);
}
let timeoutID = attack();
function attack(){
    return monkeyArray.forEach(monkey => {
        return id = setTimeout(() => {
            monkey.style.transition = "10s ease";
            monkey.style.top = "60%";
        }, 10000);
    });
}

monkeyArray.forEach(monkey => {
    monkey.addEventListener("click",()=>{
        clearInterval(timeoutID);
        monkey.style.transition = "0s";
        monkey.style.top = "-10%";
        timeoutID = attack();
    });
});