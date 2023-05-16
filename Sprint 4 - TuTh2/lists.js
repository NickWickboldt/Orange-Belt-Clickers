export let cropArray = [  //import in other file
    "./images/stinkweed.jpg",
    "./images/blowflower.png",
    "./images/toxicshrooms.png",
    "./images/zucchini.png",
    "./images/purplestalk.png",
    "./images/quantumonions.png",
    "./images/tristemmedcarrots.png",
    "./images/greenglobleaf.png",
    "./images/greentree.png"
]; 
export let soilArray = [
    "darkgrey",
    "black",
    "darkgreen",
    "greenyellow"
];

export let prices = {
    inorganic: 0,
    oiled: 250,
    bioOrganic: 50000,
    chemicallyEnriched: 1000000,
    stinkweed: 0,
    blowflower: 50,
    toxicShrooms: 500, 
    zucchini: 2500,
    purpleStalk: 7500, 
    quantumOnions: 10000,
    triStemmedCarrots: 25000, 
    greenGlobLeaf: 1000000,
    greenTree: 1000000000
}

export let recipes = {
    stinkweedStew: {
        stinkweed: 10,
        blowflower: 0,
        toxicShrooms: 0,
        zucchini: 0,
        purpleStalk: 0,
        quantumOnions: 0,
        triStemmedCarrots: 0,
        greenGlobLeaf: 0,
        greenTree: 0
    },
    blowflowerBread: {
        stinkweed: 5,
        blowflower: 20,
        toxicShrooms: 0,
        zucchini: 0,
        purpleStalk: 0,
        quantumOnions: 0,
        triStemmedCarrots: 0,
        greenGlobLeaf: 0,
        greenTree: 0
    },
    toxicPizza: {
        stinkweed: 10,
        blowflower: 15,
        toxicShrooms: 10,
        zucchini: 10,
        purpleStalk: 0,
        quantumOnions: 10,
        triStemmedCarrots: 0,
        greenGlobLeaf: 20,
        greenTree: 0
    },
    quantumBurrito: {
        stinkweed: 20,
        blowflower: 30,
        toxicShrooms: 0,
        zucchini: 10,
        purpleStalk: 15,
        quantumOnions: 20,
        triStemmedCarrots: 0,
        greenGlobLeaf: 0,
        greenTree: 10
    },
    quantumStew: {
        stinkweed: 5,
        blowflower: 0,
        toxicShrooms: 15,
        zucchini: 20,
        purpleStalk: 20,
        quantumOnions: 10,
        triStemmedCarrots: 0,
        greenGlobLeaf: 0,
        greenTree: 0
    },
    zucchiniRamen: {
        stinkweed: 10,
        blowflower: 0,
        toxicShrooms: 0,
        zucchini: 50,
        purpleStalk: 0,
        quantumOnions: 5,
        triStemmedCarrots: 20,
        greenGlobLeaf: 5,
        greenTree: 0
    },
    greenTreeSmoothie: {
        stinkweed: 5,
        blowflower: 0,
        toxicShrooms: 0,
        zucchini: 0,
        purpleStalk: 10,
        quantumOnions: 0,
        triStemmedCarrots: 20,
        greenGlobLeaf: 10,
        greenTree: 30
    },
    superSalad: {
        stinkweed: 0,
        blowflower: 5,
        toxicShrooms: 0,
        zucchini: 20,
        purpleStalk: 20,
        quantumOnions: 10,
        triStemmedCarrots: 20,
        greenGlobLeaf: 20,
        greenTree: 50
    }
}

export let cropStorage = [
    0, //stinkweed
    0, //blowflower
    0, //toxic shrooms
    0, //zucchini
    0, //purple stalk
    0, //quantum onions
    0, //tri stemmed carrots
    0, //green glob leaf
    0, //green tree
]

const stinkweed = document.getElementById("stinkweed");
const blowflower = document.getElementById("blowflower");
const toxicShrooms = document.getElementById("toxicshrooms");
const zucchini = document.getElementById("zucchini");
const purpleStalk = document.getElementById("purplestalk");
const quantumOnions = document.getElementById("quantumonions");
const triStemmedCarrots = document.getElementById("tristemmedcarrots");
const greenGlobLeaf = document.getElementById("greenglobleaf");
const greenTree = document.getElementById("greentree");

export let cropStorageLabels = [    //list of <li> tags displaying amount of crop
    stinkweed,
    blowflower,
    toxicShrooms,
    zucchini,
    purpleStalk,
    quantumOnions,
    triStemmedCarrots,
    greenGlobLeaf,
    greenTree
];

export let recipeImageList = [

];

const stinkWeedStew = document.getElementById("stinkweedStew");
const blowFlowerBread = document.getElementById("blowflowerBread");
const toxicPizza = document.getElementById("toxicPizza");
const quantumBurrito = document.getElementById("quantumBurrito");
const quantumStew = document.getElementById("quantumStew");
const zucchiniRamen = document.getElementById("zucchiniRamen");
const greenTreeSmoothie = document.getElementById("greentreeSmoothie");
const superSalad = document.getElementById("superSalad");

export let recipeStorageLabels = [
    stinkWeedStew,
    blowFlowerBread,
    toxicPizza,
    quantumBurrito,
    quantumStew,
    zucchiniRamen,
    greenTreeSmoothie,
    superSalad,
]

export let recipeStorage = [
    0, //stinkweed Stew
    0, //blowflower Bread
    0, //toxic pizza
    0, //quantum Burrito
    0, //quantum Stew
    0, //zucchini ramen
    0, //green tree smoothie
    0, //super salad
]