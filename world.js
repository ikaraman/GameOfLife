"use strict";

const Clone = require("clone"),
    Clear = require("clear");

function generateField(fieldSize, seedField) {
    let field;
    if (seedField === undefined) {
        field = [];

        for (let i = 0; i < fieldSize; i++) {
            field[i] = [];
            for (let j = 0; j < fieldSize; j++){
                field[i][j] = Math.round(Math.random());
            }
        }
    } else {
        field = Clone(seedField);
    }
    return field;
}


function checkIsFieldAlive(field) {

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++){
            if (field[i][j] === 1) {
                //console.log("Some cells are alive");
                return true;
            }
        }
    }
    console.log("There is no more alive cells");
    return false;
}

function checkFieldsEqual(field, newField) {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            if (field[i][j] !== newField[i][j]) {
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

function drawField(field) {
    Clear();
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++){
            if (field[i][j] === 0 ) {
                process.stdout.write(" ");
            } else{
                process.stdout.write("*");
            }
        }
        console.log("");

    }
    sleep(500);
}

module.exports = {
    generateField: generateField,
    checkIsFieldAlive: checkIsFieldAlive,
    checkFieldsEqual: checkFieldsEqual,
    drawField: drawField
};
