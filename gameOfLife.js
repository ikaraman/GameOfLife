"use strict";

const tickChecker = require("./tick");

function generateField(fieldSize) {
    let field = [];

    for (let i = 0; i < fieldSize; i++) {
        field[i] = [];
        for (let j = 0; j < fieldSize; j++){
            field[i][j] = Math.round(Math.random());
        }
    }
    console.log("Field has been generated");
    drawField(field);
    return field;
}

function drawField (field) {
    for (let i = 0; i < field.length; i++) {
        console.log(field[i]);
    }
    sleep(1000);
}

function checkIsFieldAlive(field) {

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++){
            if (field[i][j] === 1) {
                console.log("Some cells are alive");
                return true;
            }
        }
    }
    console.log("There is no more alive cells");
    return false;
}

function compareFields(field, newField) {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++){
            if (field[i][j] !== newField[i][j]) {
                console.log("Fields are not equal...");
                break;
            }
        }
    }

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
                if (tickChecker.isResurrected(field, i, j) === true){
                    newField[i][j] = 1;
                }
            } else {
                if (tickChecker.isLonely(field, i, j) === true) {
                    newField[i][j] = 0;
                    break;
                }
                if (tickChecker.isSupported(field, i, j) === true) {
                    newField[i][j] = 1;
                    break;
                }
                if (tickChecker.isOverpopulated(field, i, j) === true) {
                    newField[i][j] = 0;
                    break;
                }
            }
        }
    }
    console.log("Tick happened, new field is:");
    drawField(newField);
    return newField;
}

function sleep(sleepDuration) {
    let now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) {
        /* do nothing */
    }
}

function main(fieldSize) {
    let newField = generateField(fieldSize);

    while (true) {
        if (checkIsFieldAlive(newField)) {
            console.log("One more tick will happen...");
            if (compareFields(newField, nextTick(newField))) {
                console.log("Execution will stop. New field is the same as a previous one");
                break;
            }
        } else {
            break;
        }
    }

}

main(10);