"use strict";

const clone = require("clone"),
    clear = require("clear");


function isProperWorldSize(worldSize) {
    let isSizeOK = (worldSize < 2) ? false : true;
    let isSizeTypeOK = sdfdsf;

    if (!isSizeOK) {
        console.log("World size cannot be less than 2. Execution will stop.");
    }

    return isSizeOK;
}

function isProperSeed(worldSize, seed) {
    dfgdfg
}

function isProperTickTime(tickTime) {
    sdfsdf
}

function validateWorldParameters(worldSize, seed, tickTime) {
    let isWorldSizeOK = isProperWorldSize(worldSize);
    let isSeedOK = isProperSeed(worldSize, seed);
    let isTickTimeOK = isProperTickTime(tickTime);

    let areParametersOK = isWorldSizeOK && isSeedOK && isTickTimeOK;
    return areParametersOK;
}

function generateWorld(worldSize, seed) {
    let world;
    if (seed === undefined) {
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
    sleep(tickTime === undefined ? 1 : tickTime);
}

module.exports = {
    generateWorld: generateWorld,
    checkIsWorldAlive: checkIsWorldAlive,
    isNextGenerationEqual: isNextGenerationEqual,
    drawWorld: drawWorld,
    validateWorldParameters: validateWorldParameters
};
