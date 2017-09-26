"use strict";

const tick = require("./tick"),
    field = require("./field");

function gameOfLife(fieldSize, seedField) {
    let newField;
    if (seedField === undefined) {
        newField = field.generateField(fieldSize);
    } else {
        newField = seedField;
    }

    while (true) {
        field.drawField(newField);
        if (field.checkIsFieldAlive(newField)) {
            //console.log("One more tick will happen...");
            if (field.compareFields(newField, tick.nextTick(newField))) {
                console.log("Execution will stop. New field is the same as a previous one");
                break;
            }
        } else {
            break;
        }
    }

}

let seed = [[0,1,0],[0,1,0],[0,1,0]];
gameOfLife(3, seed);
// isLonely() - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// isSupported() - Any live cell with two or three live neighbours lives on to the next generation.
// isOverpopulated() - Any live cell with more than three live neighbours dies, as if by overpopulation.
// isResurrected() - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.