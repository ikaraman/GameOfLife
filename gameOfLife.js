"use strict";

const Tick = require("./tick"),
    Field = require("./field"),
    Clone = require("clone");


function gameOfLife(fieldSize, seedField) {
    if (fieldSize < 2) {
        console.log("Field size cannot be less than 2. Execution will stop.");
        return false;
    }

    let newField = Field.generateField(fieldSize, seedField);
    Field.drawField(newField);

    while (true) {
        if (Field.checkIsFieldAlive(newField)) {
            //console.log("One more tick will happen...");
            if (Field.checkFieldsEqual(newField, Tick.nextTick(newField))) {
                console.log("Execution will stop. New field is the same as a previous one");
                break;
            } else {
                newField = Clone(Tick.nextTick(newField));
                Field.drawField(newField);
            }
        } else {
            break;
        }
    }
}

//let seed = [[0,1,0],[1,0,1],[0,1,0]];
//gameOfLife(3);

// isLonely() - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// isSupported() - Any live cell with two or three live neighbours lives on to the next generation.
// isOverpopulated() - Any live cell with more than three live neighbours dies, as if by overpopulation.
// isResurrected() - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

module.exports = {
    gameOfLife: gameOfLife
};