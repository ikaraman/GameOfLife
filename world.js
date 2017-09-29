"use strict";

const clone = require("clone"),
    clear = require("clear");

function generateWorld(worldSize, seed) {
    let world;
    if (seed === undefined) {
        world = [];

        for (let i = 0; i < worldSize; i++) {
            world[i] = [];
            for (let j = 0; j < worldSize; j++){
                world[i][j] = Math.round(Math.random());
            }
        }
    } else {
        world = clone(seed);
    }
    return world;
}

function isProperWorldSize(worldSize) {
    let result = (worldSize < 2) ? false : true;

    if (!result) {
        console.log("World size cannot be less than 2. Execution will stop.");
    }

    return result;
}

function checkIsWorldAlive(world) {

    for (let i = 0; i < world.length; i++) {
        for (let j = 0; j < world.length; j++){
            if (world[i][j] === 1) {
                //console.log("Some cells are alive");
                return true;
            }
        }
    }
    console.log("There is no more cells alive.");
    return false;
}

function isNextGenerationEqual(world, newWorld) {
    for (let i = 0; i < world.length; i++) {
        for (let j = 0; j < world.length; j++) {
            if (world[i][j] !== newWorld[i][j]) {
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
    for (let i = 0; i < world.length; i++) {
        for (let j = 0; j < world[i].length; j++){
            if (world[i][j] === 0 ) {
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
    isProperWorldSize: isProperWorldSize
};
