"use strict";

const clone = require("clone");

// isLonely() - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// isSupported() - Any live cell with two or three live neighbours lives on to the next generation.
// isOverpopulated() - Any live cell with more than three live neighbours dies, as if by overpopulation.
// isResurrected() - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function checkLeftTop(field, x, y) {
    if (field[x - 1][y - 1] === 1) {
        return 1;
    } else {
        return 0;
    }
}
function checkLeft(field, x, y) {
    if (field[x][y - 1] === 1) {
        return 1;
    } else {
        return 0;
    }
}
function checkLeftBottom(field, x, y) {
    if (field[x + 1][y - 1] === 1){
        return 1;
    } else {
        return 0;
    }
}
function checkTop(field, x, y) {
    if (field[x - 1][y] === 1){
        return 1;
    } else {
        return 0;
    }
}
function checkBottom(field, x, y) {
    if (field[x + 1][y] === 1) {
        return 1;
    } else {
        return 0;
    }
}
function checkRightTop(field, x, y) {
    if (field[x - 1][y + 1] === 1) {
        return 1;
    } else {
        return 0;
    }
}
function checkRight(field, x, y) {
    if (field[x][y + 1] === 1) {
        return 1;
    } else {
        return 0;
    }
}
function checkRightBottom(field, x, y) {
    if (field[x + 1][y + 1] === 1) {
        return 1;
    } else {
        return 0;
    }
}


function liveCellsAround(field, x, y) {
    let count = 0;

    //check if cell NOT touching the field borders
    if (((x !== 0) && (x !== field.length - 1)) && ((y !== 0) && (y !== field.length - 1))) {
        //cell is in the middle
        count = checkLeftTop(field, x, y) +
                checkLeft(field, x, y) +
                checkLeftBottom(field, x, y) +
                checkTop(field, x, y) +
                checkBottom(field, x, y) +
                checkRightTop(field, x, y) +
                checkRight(field, x, y) +
                checkRightBottom(field, x, y);
    } else {
        //cell touching top border
        if (x === 0) {
            if (y !== 0 && y !== field.length - 1) {
                //cell is on top border but not in a corner
                count = checkLeft(field, x, y) +
                        checkLeftBottom(field, x, y) +
                        checkBottom(field, x, y) +
                        checkRight(field, x, y) +
                        checkRightBottom(field, x, y);
            } else if (y === 0) {
                //cell is on top left corner
                count = checkBottom(field, x, y) +
                        checkRightBottom(field, x, y) +
                        checkRight(field, x, y);
            } else {
                //cell is on top right corner
                count = checkLeft(field, x, y) +
                        checkLeftBottom(field, x, y) +
                        checkBottom(field, x, y);
            }
        }

        //cell touching bottom border
        if (x === field.length - 1) {
            if (y !== 0 && y !== field.length - 1) {
                //cell is on bottom border but not in a corner
                count = checkTop(field, x, y) +
                        checkLeftTop(field, x, y) +
                        checkLeft(field, x, y) +
                        checkRightTop(field, x, y) +
                        checkRight(field, x, y);
            } else if ( y === 0) {
                //cell is on bottom left corner
                count = checkTop(field, x, y) +
                        checkRightTop(field, x, y) +
                        checkRight(field, x, y);
            } else {
                //cell is on bottom right corner
                count = checkLeft(field, x, y) +
                        checkLeftTop(field, x, y) +
                        checkTop(field, x, y);
            }
        }

        //other (left/right border, not corner)
        if (y === 0 && (x !== 0 && (x !== field.length - 1))) {
            //cell is on left border but not in a corners
            count = checkTop(field, x, y) +
                    checkBottom(field, x, y) +
                    checkRightTop(field, x, y) +
                    checkRight(field, x, y) +
                    checkRightBottom(field, x, y);
        }
        if ((y === field.length - 1) && (x !== 0 && x !== field.length - 1)) {
            //cell is on right border but not in the corners
            count = checkLeftTop(field, x, y) +
                    checkLeft(field, x, y) +
                    checkLeftBottom(field, x, y) +
                    checkTop(field, x, y) +
                    checkBottom(field, x, y);
        }
    }
    return count;
}


function isLonely(field, x, y) {
    const liveCells = liveCellsAround(field, x, y);
    if (liveCells < 2) {
        return true;
    }
}
function isSupported(field, x, y) {
    const liveCells = liveCellsAround(field, x, y);
    if (liveCells === 2 || liveCells === 3) {
        return true;
    }
}
//code refactored, no need for this function, temporarily commented
//function isOverpopulated(field, x, y) {
    // const liveCells = liveCellsAround(field, x, y);
    // if (liveCells > 3) {
    //     return true;
    // }
//}
function isResurrected(field, x, y) {
    const liveCells = liveCellsAround(field, x, y);
    if (liveCells === 3) {
        return true;
    }
}


function nextTick(field) {
    let newField = clone(field);

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            if (field[i][j] === 0) {
                if (isResurrected(field, i, j) === true){
                    newField[i][j] = 1;
                }
            } else {
                if (isLonely(field, i, j) === true) {
                    newField[i][j] = 0;
                } else if (isSupported(field, i, j) === true) {
                    newField[i][j] = 1;
                } else {
                    //cell is overpopulated and will die, it's the only possibility left
                    newField[i][j] = 0;
                }
            }
        }
    }

    return newField;
}


module.exports = {
    nextTick: nextTick,
    liveCellsAround: liveCellsAround
};