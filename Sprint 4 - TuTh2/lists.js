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
        stinkweed: 10
    },
    blowflowerBread: {
        blowflower: 20,
        stinkweed: 5
    },
    toxicPizza: {
        blowflower: 15, 
        stinkweed: 10,
        quantumOnions: 10,
        toxicShrooms: 10,
        zucchini: 10,
        greenGlobLeaf: 20 
    },
    quantumBurrito: {
        blowflower: 30, 
        stinkweed: 20,
        quantumOnions: 20,
        zucchini: 10,
        greenTree: 10,
        purpleStalk: 15, 
    },
    quantumStew: {
        stinkweed: 5,
        toxicShrooms: 15,
        zucchini: 20,
        purpleStalk: 20,
        quantumOnions: 10
    },
    zucchiniRamen: {
        zucchini: 50,
        quantumOnions: 5,
        triStemmedCarrots: 20,
        greenGlobLeaf: 5
    },
    greenTreeSmoothie: {
        greenTree: 30,
        greenGlobLeaf: 10,
        triStemmedCarrots: 20,
        purpleStalk:10,
        stinkweed: 5
    },
    superSalad: {
        blowflower: 5,
        zucchini: 20,
        purpleStalk: 20,
        quantumOnions: 10,
        triStemmedCarrots: 20,
        greenGlobLeaf: 20,
        greenTree: 50
    }
}