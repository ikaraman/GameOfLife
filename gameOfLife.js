"use strict";

const tick = require("./tick"),
    world = require("./world"),
    clone = require("clone");


function gameOfLife(worldSize, seed, tickTime) {
    if (!world.validateWorldParameters(worldSize, seed, tickTime)) {
        console.log("World parameters are incorrect. Execution will stop.");
        return false;
    }

    let newWorld = world.generateWorld(worldSize, seed);

    while (true) {
        world.drawWorld(newWorld, tickTime);
        if (world.checkIsWorldAlive(newWorld)) {
            if (world.isNextGenerationEqual(newWorld, tick.nextTick(newWorld))) {
                console.log("Execution will stop. New world is the same as the previous one");
                break;
            } else {
                newWorld = clone(tick.nextTick(newWorld));
            }
        } else {
            break;
        }
    }
}

 // let seed = [
 //     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 //     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 //     [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
 //     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 //     [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
 //     [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
 //     [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
 //     [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
 //     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 //     [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
 //     [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
 //     [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
 //     [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
 //     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 //     [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
 //     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 //     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
 // ];
 // //
 //  gameOfLife(17, seed, 500);
//gameOfLife(30);
//gameOfLife(3, undefined, 500);
// let seed = [[0, 0, 0, 0, 0],
//     [0, 0, 1, 0, 0],
//     [0, 1, 0, 1, 0],
//     [0, 0, 1, 0, 0],
//     [0, 0, 0, 0, 0]];
//
// let seed = [[0, 0, 0, 0],
//     [0, 0, 1, 0],
//     [0, 1, 0, 1],
//     [0, 0, 1, 0]];
// gameOfLife(4, seed, 500);

module.exports = {
    gameOfLife: gameOfLife
};