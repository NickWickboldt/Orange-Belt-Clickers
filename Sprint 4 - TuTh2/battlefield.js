import { recipeStorageLabels, recipeStorage } from "./lists";

let kitchenSourcedRecipes= [];
let tempC = [];
window.addEventListener("load",()=>{
    kitchenSourcedRecipes = window.sessionStorage.getItem("recipe_storage");
    if(kitchenSourcedRecipes === ''){
        for(let i =0; i<8; i++){
            recipeStorageLabels[i].innerHTML = 0;
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
});

const kitchenButton = document.querySelector(".kitchen-link");
kitchenButton.addEventListener("click",()=>{
    let recipeSender = [];
    if(kitchenSourcedRecipes === null){ //if no recipes yet
        window.location.href = "./index.html";
    }else{ //if recipes, fill recipeSender
        for(let i = 0; i<tempC.length; i++){
            recipeSender.push(tempC[i]);
        }
    }
    window.sessionStorage.setItem("recipe_storage",recipeSender); //send sender
    window.location.href = "./index.html";
});