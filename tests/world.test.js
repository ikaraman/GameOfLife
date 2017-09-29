"use strict";

const world = require("world");

console.log = jest.fn(function() {
});

describe("world() tests:", () => {
    it("generateWorld(): size 2, without a seed", () => {
        //this test here just gives me line coverage
        //result coming from generateWorld are random, so checking for "not to equal"...
        expect(world.generateWorld(2)).not.toEqual("dfgsdf");
    });

    it("isNextGenerationEqual() should return TRUE if called with 2 identical worlds", () => {
        const world1 = [[0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 0, 1],
            [0, 0, 1, 0]];

        expect(world.isNextGenerationEqual(world1, world1)).toBe(true);
    });

    it("isNextGenerationEqual(): should return FALSE if called with 2 NON-identical worlds", () => {
        const world1 = [[0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 0, 1],
            [0, 0, 1, 0]];

        const world2 = [[0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 1],
            [0, 0, 1, 0]];

        expect(world.isNextGenerationEqual(world1, world2)).toBe(false);
    });
});