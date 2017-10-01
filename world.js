"use strict";

const clone = require("clone"),
    clear = require("clear");


function isProperWorldSize(worldSize) {
    if (worldSize < 2) {
        console.log("World size cannot be less than 2.");
        return false;
    }

    if (typeof worldSize !== "number" || (worldSize % 1) !== 0) {
        console.log("World size should be integer.");
        return false;
    }

    return true;
}

function isSeedCellValuesCorrect(seed) {
    if (seed !== undefined && seed !== null) {
        for (let x = 0; x < seed.length; x++) {
            for (let y = 0; y < seed.length; y++){
                if (seed[x][y] !== 1) {
                    if (seed[x][y] !== 0) {
                        console.log("Seed array should only contain 0's or 1's");
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

function isProperSeed(worldSize, seed) {
    if (seed === undefined || seed === null) {
        return true;
    }

    if (worldSize !== seed.length) {
        console.log("World size is different from seed size.");
        return false;
    }

    if (seed.constructor !== Array || seed[0].constructor !== Array || seed[0].length !== worldSize) {
        console.log("Seed should be an array of arrays matching size of the world.");
        return false;
    }

    return true;
}

function isProperTickTime(tickTime) {
    if (tickTime === undefined || tickTime === null) {
        return true;
    }

    if (typeof tickTime !== "number" || (tickTime % 1) !== 0) {
        console.log("Tick time should be integer (ms).");
        return false;
    }

    return true;
}

function validateWorldParameters(worldSize, seed, tickTime) {
    let isWorldSizeOK = isProperWorldSize(worldSize);
    let isSeedOK =
        isProperSeed(worldSize, seed) &&
        isSeedCellValuesCorrect(seed);
    let isTickTimeOK = isProperTickTime(tickTime);

    let areParametersOK = isWorldSizeOK && isSeedOK && isTickTimeOK;
    return areParametersOK;
}

function generateWorld(worldSize, seed) {
    let world;
    if (seed === undefined || seed === null) {
        world = [];

        for (let x = 0; x < worldSize; x++) {
            world[x] = [];
            for (let y = 0; y < worldSize; y++){
                world[x][y] = Math.round(Math.random());
            }
        }
    } else {
        world = clone(seed);
    }
    return world;
}

function checkIsWorldAlive(world) {
    for (let x = 0; x < world.length; x++) {
        for (let y = 0; y < world.length; y++){
            if (world[x][y] === 1) {
                return true;
            }
        }
    }
    console.log("There is no more cells alive.");
    return false;
}

function isNextGenerationEqual(world, newWorld) {
    for (let x = 0; x < world.length; x++) {
        for (let y = 0; y < world.length; y++) {
            if (world[x][y] !== newWorld[x][y]) {
                return false;
            }
        }
    }
    return true;
}

function sleep(sleepDuration) {
    if (sleepDuration === undefined || sleepDuration === null) {
        sleepDuration = 1;
    }

    let now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) {
        /* do nothing */
    }
}

function drawWorld(world, tickTime) {
    clear();
    for (let x = 0; x < world.length; x++) {
        for (let y = 0; y < world[x].length; y++){
            if (world[x][y] === 0 ) {
                process.stdout.write(" ");
            } else{
                process.stdout.write("*");
            }
        }
        console.log("");
    }
    sleep(tickTime);
}

module.exports = {
    generateWorld: generateWorld,
    checkIsWorldAlive: checkIsWorldAlive,
    isNextGenerationEqual: isNextGenerationEqual,
    drawWorld: drawWorld,
    sleep: sleep,
    validateWorldParameters: validateWorldParameters
};
