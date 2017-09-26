"use strict";

// isLonely() - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// isSupported() - Any live cell with two or three live neighbours lives on to the next generation.
// isOverpopulated() - Any live cell with more than three live neighbours dies, as if by overpopulation.
// isResurrected() - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.


//broken from here
function checkLeftTop(field, x, y) {
    if (field[y - 1][x - 1] === 1) {
        return 1;
    } else {
        return 0;
    }
}
function checkLeft(field, x, y) {
    if (field[y - 1][x] === 1) {
        return 1;
    } else {
        return 0;
    }
}
function checkLeftBottom(field, x, y) {
    if (field[y - 1][x + 1] === 1){
        return 1;
    } else {
        return 0;
    }
}
function checkTop(field, x, y) {
    if (field[y][x - 1] === 1){
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
    if (field[y + 1][x - 1] === 1) {
        return 1;
    } else {
        return 0;
    }
}
function checkRight(field, x, y) {
    if (field[y + 1][x] === 1) {
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
//broken till here
//TOFIX


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
        //cell touching left border
        if (x === 0 && (y !== 0 && y !== field.length - 1)) {
            //cell is on left border but not in a corner
            count = checkTop(field, x, y) +
                    checkRightTop(field, x, y) +
                    checkRight(field, x, y) +
                    checkRightBottom(field, x, y) +
                    checkBottom(field, x, y);
        } else if (x === 0 && y === 0) {
            //cell is on top left corner
            count = checkBottom(field, x, y) +
                    checkRightBottom(field, x, y) +
                    checkRight(field, x, y);
        } else if (x === 0 && y === field.length - 1) {
            //cell is on bottom left corner
            count = checkTop(field, x, y) +
                    checkRightTop(field, x, y) +
                    checkRight(field, x, y);
        }

        //cell touching right border
        if ((x === field.length - 1) && (y !== 0 || (y !== field.length - 1))) {
            //cell is on right border but not in a corner
            count = checkTop(field, x, y) +
                    checkLeftTop(field, x, y) +
                    checkLeft(field, x, y) +
                    checkLeftBottom(field, x, y) +
                    checkBottom(field, x, y);
        } else if ((x === field.length - 1) && y === 0) {
            //cell is on top right corner
            count = checkLeft(field, x, y) +
                    checkLeftBottom(field, x, y) +
                    checkBottom(field, x, y);
        } else if ((x === field.length - 1) && (y === field.length - 1)) {
            //cell is on bottom right corner
            count = checkLeft(field, x, y) +
                    checkLeftTop(field, x, y) +
                    checkTop(field, x, y);
        }

        //other (top & bottom, not corner)
        if (y === 0 && (x !== 0 && (x !== field.length - 1))) {
            //cell is on top border but not in a corners
            count = checkLeft(field, x, y) +
                    checkLeftBottom(field, x, y) +
                    checkBottom(field, x, y) +
                    checkRightBottom(field, x, y) +
                    checkRight(field, x, y);
        }
        if ((y === field.length - 1) && (x !== 0 && x !== field.length - 1)) {
            //cell is on bottom border but not in the corners
            count = checkLeft(field, x, y) +
                    checkLeftTop(field, x, y) +
                    checkTop(field, x, y) +
                    checkRightTop(field, x, y) +
                    checkRight(field, x, y);
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
function isOverpopulated(field, x, y) {
    const liveCells = liveCellsAround(field, x, y);
    if (liveCells > 3) {
        return true;
    }
}
function isResurrected(field, x, y) {
    const liveCells = liveCellsAround(field, x, y);
    if (liveCells === 3) {
        return true;
    }
}


function nextTick(field) {
    let newField = field;

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            if (field[i][j] === 0) {
                if (isResurrected(field, i, j) === true){
                    newField[i][j] = 1;
                }
            } else {
                if (isLonely(field, i, j) === true) {
                    newField[i][j] = 0;
                    break;
                }
                if (isSupported(field, i, j) === true) {
                    newField[i][j] = 1;
                    break;
                }
                if (isOverpopulated(field, i, j) === true) {
                    newField[i][j] = 0;
                    break;
                }
            }
        }
    }
    //console.log("Tick happened, new field is:");
    return newField;
}


module.exports = {
    nextTick: nextTick
};