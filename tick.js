"use strict";

const clone = require("clone");

// isLonely() - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// isSupported() - Any live cell with two or three live neighbours lives on to the next generation.
// isOverpopulated() - Any live cell with more than three live neighbours dies, as if by overpopulation.
// isSpawned() - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

//challenge: remove all comments, all function size: 10 lines max, idiot-proof naming

function checkLeftTop(world, x, y) {
    if (world[x - 1][y - 1] === 1) {
        return 1;
    } else {
        return 0;
    }
}
function checkLeft(world, x, y) {
    if (world[x][y - 1] === 1) {
        return 1;
    } else {
        return 0;
    }
}
function checkLeftBottom(world, x, y) {
    if (world[x + 1][y - 1] === 1){
        return 1;
    } else {
        return 0;
    }
}
function checkTop(world, x, y) {
    if (world[x - 1][y] === 1){
        return 1;
    } else {
        return 0;
    }
}
function checkBottom(world, x, y) {
    if (world[x + 1][y] === 1) {
        return 1;
    } else {
        return 0;
    }
}
function checkRightTop(world, x, y) {
    if (world[x - 1][y + 1] === 1) {
        return 1;
    } else {
        return 0;
    }
}
function checkRight(world, x, y) {
    if (world[x][y + 1] === 1) {
        return 1;
    } else {
        return 0;
    }
}
function checkRightBottom(world, x, y) {
    if (world[x + 1][y + 1] === 1) {
        return 1;
    } else {
        return 0;
    }
}


function liveCellsAround(world, x, y) {
    let count = 0;

    //check if cell NOT touching the world borders
    if (((x !== 0) && (x !== world.length - 1)) && ((y !== 0) && (y !== world.length - 1))) {
        //cell is in the middle
        count = checkLeftTop(world, x, y) +
                checkLeft(world, x, y) +
                checkLeftBottom(world, x, y) +
                checkTop(world, x, y) +
                checkBottom(world, x, y) +
                checkRightTop(world, x, y) +
                checkRight(world, x, y) +
                checkRightBottom(world, x, y);
    } else {
        //cell touching top border
        if (x === 0) {
            if (y !== 0 && y !== world.length - 1) {
                //cell is on top border but not in a corner
                count = checkLeft(world, x, y) +
                        checkLeftBottom(world, x, y) +
                        checkBottom(world, x, y) +
                        checkRight(world, x, y) +
                        checkRightBottom(world, x, y);
            } else if (y === 0) {
                //cell is on top left corner
                count = checkBottom(world, x, y) +
                        checkRightBottom(world, x, y) +
                        checkRight(world, x, y);
            } else {
                //cell is on top right corner
                count = checkLeft(world, x, y) +
                        checkLeftBottom(world, x, y) +
                        checkBottom(world, x, y);
            }
        }

        //cell touching bottom border
        if (x === world.length - 1) {
            if (y !== 0 && y !== world.length - 1) {
                //cell is on bottom border but not in a corner
                count = checkTop(world, x, y) +
                        checkLeftTop(world, x, y) +
                        checkLeft(world, x, y) +
                        checkRightTop(world, x, y) +
                        checkRight(world, x, y);
            } else if ( y === 0) {
                //cell is on bottom left corner
                count = checkTop(world, x, y) +
                        checkRightTop(world, x, y) +
                        checkRight(world, x, y);
            } else {
                //cell is on bottom right corner
                count = checkLeft(world, x, y) +
                        checkLeftTop(world, x, y) +
                        checkTop(world, x, y);
            }
        }

        //other (left/right border, not corner)
        if (y === 0 && (x !== 0 && (x !== world.length - 1))) {
            //cell is on left border but not in a corners
            count = checkTop(world, x, y) +
                    checkBottom(world, x, y) +
                    checkRightTop(world, x, y) +
                    checkRight(world, x, y) +
                    checkRightBottom(world, x, y);
        }
        if ((y === world.length - 1) && (x !== 0 && x !== world.length - 1)) {
            //cell is on right border but not in the corners
            count = checkLeftTop(world, x, y) +
                    checkLeft(world, x, y) +
                    checkLeftBottom(world, x, y) +
                    checkTop(world, x, y) +
                    checkBottom(world, x, y);
        }
    }
    return count;
}


function isLonely(world, x, y) {
    const liveCells = liveCellsAround(world, x, y);
    if (liveCells < 2) {
        return true;
    }
}
function isSupported(world, x, y) {
    const liveCells = liveCellsAround(world, x, y);
    if (liveCells === 2 || liveCells === 3) {
        return true;
    }
}
//code refactored, no need for this function, temporarily commented
//function isOverpopulated(world, x, y) {
    // const liveCells = liveCellsAround(world, x, y);
    // if (liveCells > 3) {
    //     return true;
    // }
//}
function isSpawned(world, x, y) {
    const liveCells = liveCellsAround(world, x, y);
    if (liveCells === 3) {
        return true;
    }
}


function nextTick(world) {
    let newWorld = clone(world);

    for (let i = 0; i < world.length; i++) {
        for (let j = 0; j < world.length; j++) {
            if (world[i][j] === 0) {
                if (isSpawned(world, i, j) === true){
                    //resurrect()
                    newWorld[i][j] = 1;
                }
            } else {
                if (isLonely(world, i, j) === true) {
                    //die()
                    newWorld[i][j] = 0;
                } else if (isSupported(world, i, j) === true) {
                    //live()
                    newWorld[i][j] = 1;
                } else {
                    //cell is overpopulated and will die, it's the only possibility left
                    //dieDueToOverpopulation
                    newWorld[i][j] = 0;
                }
            }
        }
    }
    return newWorld;
}


module.exports = {
    nextTick: nextTick,
    liveCellsAround: liveCellsAround
};