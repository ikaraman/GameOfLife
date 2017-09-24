"use strict";

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


function tick(field) {
    // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    // Any live cell with two or three live neighbours lives on to the next generation.
    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    
}


function main(size) {
    let newField = generateField(size);

    while (true) {
        if (checkIsFieldAlive(newField)) {
            console.log("One more tick...");
            tick(newField);
        } else {
            break;
        }
    }

}


main(3);