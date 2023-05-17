import { recipeStorageLabels} from "./lists.js";

let kitchenSourcedRecipes= [];
let tempC = [];
window.addEventListener("load",()=>{
    kitchenSourcedRecipes = window.sessionStorage.getItem("recipe_storage");
    console.log(kitchenSourcedRecipes);
    if(kitchenSourcedRecipes === null){
        for(let i =0; i<8; i++){
            recipeStorageLabels[i].innerHTML = 0;
            tempC.push(0);
        }
    }else{
        let tempS = '';
        for(let i = 0; i<kitchenSourcedRecipes.length; i++){
            if(kitchenSourcedRecipes[i] === ','){
                tempC.push(parseInt(tempS));
                tempS = '';
            }else{
                tempS += kitchenSourcedRecipes[i];
            }
        }tempC.push(parseInt(tempS));
        for(let i = 0; i<tempC.length; i++){
            recipeStorageLabels[i].innerHTML = tempC[i];
        }
    }
    console.log(tempC);
});

const kitchenButton = document.querySelector(".index-link");
kitchenButton.addEventListener("click",()=>{
    let recipeSender = tempC;
    window.sessionStorage.setItem("recipe_storage",recipeSender); //send sender
    window.location.href = "./index.html";
});