const plot1 = document.getElementById("crop1");
const plot2 = document.getElementById("crop2");
const plot3 = document.getElementById("crop3");
const plot4 = document.getElementById("crop4");
const plot5 = document.getElementById("crop5");
const plot6 = document.getElementById("crop6");
const plot7 = document.getElementById("crop7");
const plot8 = document.getElementById("crop8");
const plot9 = document.getElementById("crop9");
const plot10 = document.getElementById("crop10");
const plot11 = document.getElementById("crop11");
const plot12 = document.getElementById("crop12");

let plotCounter = 0;    //maintains current plot to plant at
let plotList = [plot1, plot2, plot3, plot4, plot5, 
                plot6, plot7, plot8, plot9, plot10, 
                plot11, plot12];

let cropArray = ["./stinkweed.jpg"]; //move to separate file
let intervalIDList = []; //used to clear crops
gameLoop();
gameLoop();
gameLoop();
function gameLoop(cropID){
    let plotNumber = plotCounter;
    intervalIDList.push(setInterval(() => { //growth interval
        createCrop(plotList[plotNumber], 0); // 0->cropID
    }, 5500));
    plotCounter++;
}


function createCrop(plot, imgIndex){ //one iteration of growth
    const crop = document.createElement("img");
    crop.src =  cropArray[imgIndex];
    crop.classList.add("crop");
    plot.appendChild(crop);
    setTimeout(() => {
        grow(crop,plot);
    }, 50); 
}

function grow(crop,plot){
    crop.style.transform = "scale(1000%)";
    setTimeout(() => {
        plot.removeChild(crop);
        //play harvest noise
    }, 5050);
}
