"use strict";

function generateField(fieldSize) {
    let field = [];

    for (let i = 0; i < fieldSize; i++) {
        field[i] = [];
        for (let j = 0; j < fieldSize; j++){
            field[i][j] = Math.round(Math.random());
        }
    }
    console.log("Field has been generated");
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

function compareFields(field, newField) {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            if (field[i][j] !== newField[i][j]) {
                console.log("Fields are not equal...");
                break;
            }
        }
    }
}

function sleep(sleepDuration) {
    let now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) {
        /* do nothing */
    }
}

function drawField(field) {
    for (let i = 0; i < field.length; i++) {
        console.log(field[i]);
    }
    sleep(1000);
    for (let i = 0; i < field.length; i++) {
        process.stdout.write("---");

    }
    console.log("--");
}

module.exports = {
    drawField: drawField,
    compareFields: compareFields,
    checkIsFieldAlive: checkIsFieldAlive,
    generateField: generateField
};
