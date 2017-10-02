"use strict";

const clone = require("clone");

// isCellLonely() - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// isCellSupported() - Any live cell with two or three live neighbours lives on to the next generation.
// isCellOverpopulated() - Any live cell with more than three live neighbours dies, as if by overpopulation.
// ifThreeNeighbours() - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function aliveCellsAroundCell(world, x, y) {

    return ((x > 0 && y > 0) ? world[x - 1][y - 1] : 0) +                             //top left
        ((x > 0) ? world[x - 1][y] : 0) +                                             //top
        ((x > 0 && y < world.length - 1) ? world[x - 1][y + 1] : 0) +                 //top right
        ((y < world.length - 1) ? world[x][y + 1] : 0) +                              //right
        ((x < world.length - 1 && y < world.length - 1) ? world[x + 1][y + 1] : 0) +  //bottom right
        ((x < world.length - 1) ? world[x + 1][y] : 0) +                              //bottom
        ((x < world.length - 1 && y > 0) ? world[x + 1][y - 1] : 0) +                 //bottom left
        ((y > 0) ? world[x][y - 1] : 0);                                              //left
}

function ifCellLonely(world, x, y) {
    return ((world[x][y] === 1) && (aliveCellsAroundCell(world, x, y) < 2));
}
function ifCellSupported(world, x, y) {
    return ((world[x][y] === 1) && (aliveCellsAroundCell(world, x, y) === 2 || aliveCellsAroundCell(world, x, y) === 3));
}
function ifCellOverpopulated(world, x, y) {
    return ((world[x][y] === 1) && (aliveCellsAroundCell(world, x, y) > 3));
}
function ifThreeNeighbours(world, x, y) {
    return ((world[x][y] === 0) && (aliveCellsAroundCell(world, x, y) === 3));
}

function liveIfAny(liveRules, oldWorld, newWorld, x, y) {

    for (let rule in liveRules) {
        if (liveRules[rule](oldWorld, x, y)) {
            newWorld[x][y] = 1;
            return;
        }
    }
}
function dieIfAny(dieRules, oldWorld, newWorld, x, y) {

    for (let rule in dieRules) {
        if (dieRules[rule](oldWorld, x, y)) {
            newWorld[x][y] = 0;
            return;
        }
    }
}

function nextTick(world) {
    let newWorld = clone(world);

    for (let x = 0; x < world.length; x++) {
        for (let y = 0; y < world.length; y++) {
            dieIfAny([ ifCellLonely, ifCellOverpopulated ], world, newWorld, x, y);
            liveIfAny([ ifCellSupported, ifThreeNeighbours ], world, newWorld, x, y);
        }
    }
    return newWorld;
}


module.exports = {
    nextTick: nextTick,
    aliveCellsAroundCell: aliveCellsAroundCell
};