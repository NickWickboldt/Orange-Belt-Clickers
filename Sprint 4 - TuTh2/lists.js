let stinkWeed, blowFlower, toxicShrooms, zucchini, purpleStalk, quantumOnions, triStemmedCarrots, greenGlobLeaf, greenTree;
let inorganic, oiled, bioOrganic, chemicallyEnriched;
export let cropArray = [  //import in other file
    stinkWeed = {
        img: "./images/stinkweed.jpg",
        price: 0,
        id:0
    },
    blowFlower = {
        img: "./images/blowflower.png",
        price: 50,
        id:1
    },
    toxicShrooms = {
        img: "./images/toxicshrooms.png",
        price: 500,
        id:2
    },
    zucchini = {
        img: "./images/zucchini.png",
        price: 2500,
        id:3
    },
    purpleStalk = {
        img: "./images/purplestalk.png",
        price: 7500,
        id:4
    },
    quantumOnions = {
        img: "./images/quantumonions.png",
        price: 10000,
        id:5
    },
    triStemmedCarrots = {
        img: "./images/tristemmedcarrots.png",
        price: 25000,
        id:6
    },
    greenGlobLeaf = {
        img: "./images/greenglobleaf.png",
        price: 100000,
        id:7
    },
    greenTree = {
        img: "./images/greentree.png",
        price: 1000000000,
        id:8
    }
]; 
export let soilArray = [
    inorganic = {
        color: "darkgrey",
        price: 0
    },
    oiled = {
        color: "black",
        price: 250
    },
    bioOrganic = {
        color: "darkgreen",
        price: 50000
    },
    chemicallyEnriched = {
        color: "greenyellow",
        price: 100000
    }
];
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

const stinkweedLI = document.getElementById("stinkweed");
const blowflowerLI = document.getElementById("blowflower");
const toxicShroomsLI = document.getElementById("toxicshrooms");
const zucchiniLI = document.getElementById("zucchini");
const purpleStalkLI = document.getElementById("purplestalk");
const quantumOnionsLI = document.getElementById("quantumonions");
const triStemmedCarrotsLI = document.getElementById("tristemmedcarrots");
const greenGlobLeafLI = document.getElementById("greenglobleaf");
const greenTreeLI = document.getElementById("greentree");

export let cropStorageLabels = [    //list of <li> tags displaying amount of crop
    stinkweedLI,
    blowflowerLI,
    toxicShroomsLI,
    zucchiniLI,
    purpleStalkLI,
    quantumOnionsLI,
    triStemmedCarrotsLI,
    greenGlobLeafLI,
    greenTreeLI
];

export let recipeImageList = [
    "./images/stinkweedStew.png",
    "./images/blowflowerBread.png",
    "./images/zucchiniRamen.png",
    "./images/toxicPizza.png",
    "./images/quantumStew.png",
    "./images/quantumBurrito.png",
    "./images/greenTreeSmoothie.png",
    "./images/superSalad.png"
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