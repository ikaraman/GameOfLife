"use strict";

const tick = require("./tick"),
    world = require("./world"),
    clone = require("clone");


function gameOfLife(worldSize, seed, tickTime) {
    if (worldSize < 2) {
        console.log("World size cannot be less than 2. Execution will stop.");
        return false;
    }

    let newWorld = world.generateWorld(worldSize, seed);
    world.drawWorld(newWorld, tickTime);

    while (true) {
        if (world.checkIsWorldAlive(newWorld)) {
            //console.log("One more tick will happen...");
            if (world.isNextGenerationEqual(newWorld, tick.nextTick(newWorld))) {
                console.log("Execution will stop. New world is the same as a previous one");
                break;
            } else {
                newWorld = clone(tick.nextTick(newWorld));
                world.drawWorld(newWorld, tickTime);
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
//gameOfLife(3);

module.exports = {
    gameOfLife: gameOfLife
};