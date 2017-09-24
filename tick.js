"use strict";

// isLonely() - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// isSupported() - Any live cell with two or three live neighbours lives on to the next generation.
// isOverpopulated() - Any live cell with more than three live neighbours dies, as if by overpopulation.
// isResurrected() - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function isLonely() {
    return true;
}

function isSupported() {
    return true;
}

function isOverpopulated() {
    return true;
}

function isResurrected() {
    return true;
}

module.exports = {
    isLonely: isLonely,
    isSupported: isSupported,
    isOverpopulated: isOverpopulated,
    isResurrected: isResurrected
};