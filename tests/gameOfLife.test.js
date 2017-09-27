"use strict";

const GameOfLife = require("gameOfLife");

console.log = jest.fn(function() {
});

//source: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
describe("Still life tests:", () => {
    it("block should stop execution without ticking", () => {
        let seed = [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]];
        
        GameOfLife.gameOfLife(4, seed);
        expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New field is the same as a previous one");
    });

    it("beehive should stop execution without ticking", () => {

    });

    it("loaf should stop execution without ticking", () => {

    });

    it("boat should stop execution without ticking", () => {

    });

    it("tub should stop execution without ticking", () => {

    });
});

describe("Oscillator tests:", () => {
    it("blinker (period 2) should stop execution after 2 ticks", () => {

    });

    it("toad (period 2) should stop execution after 2 ticks", () => {

    });

    it("beacon (period 2) should stop execution after 2 ticks", () => {

    });

    it("pulsar (period 3) should stop execution after 3 ticks", () => {

    });

    it("pentadecathlon (period 15) should stop execution after 15 ticks", () => {

    });

});

describe("Other tests:", () => {
    it("empty field should ", () => {
        let seed = [];
        GameOfLife.gameOfLife(3, seed);

        expect(console.log).toHaveBeenLastCalledWith("There is no more alive cells");
    });

    it("calling game of life with size < 2 field should not be allowed", () => {
        GameOfLife.gameOfLife(1);

        expect(console.log).toHaveBeenLastCalledWith("Field size cannot be less than 2. Execution is stopped.");
    });
});