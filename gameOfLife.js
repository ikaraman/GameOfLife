"use strict";

const tickChecker = require("./tick");

function generateField(size) {
    let field = [];

    for (let i = 0; i < size; i++) {
        field[i] = [];
        for (let j = 0; j < size; j++){
            field[i][j] = Math.round(Math.random());
        }
    }

    return field;
}


function checkIsFieldAlive(field) {

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++){
            if (field[i][j] === 1) {
                console.log("Some cells are alive");
                return true;
            }
        }
        return false;
    }
    console.log("There is no more alive cells");
}

// isLonely() - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// isSupported() - Any live cell with two or three live neighbours lives on to the next generation.
// isOverpopulated() - Any live cell with more than three live neighbours dies, as if by overpopulation.
// isResurrected() - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
function nextTick(field) {
    let newField = field;

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            if (field[i][j] === 0) {
                if (tickChecker.isResurrected(i, j) === true){
                    newField[i][j] = 1;
                }
            } else {
                if (tickChecker.isLonely(i, j) === true) {
                    newField[i][j] = 0;
                    break;
                }
                if (tickChecker.isSupported(i, j) === true) {
                    newField[i][j] = 1;
                    break;
                }
                if (tickChecker.isOverpopulated(i, j) === true) {
                    newField[i][j] = 0;
                    break;
                }
            }
        }
    }

    return newField;
}


function main(size) {
    let newField = generateField(size);

    while (true) {
        if (checkIsFieldAlive(newField)) {
            console.log("One more tick...");
            nextTick(newField);
        } else {
            break;
        }
    }

}

main(3);