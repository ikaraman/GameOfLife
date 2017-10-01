"use strict";

const gameOfLife = require("gameOfLife"),
    world = require("world"),
    tick = require("tick");

console.log = jest.fn(function() {
});

world.drawWorld = jest.fn(function() {
});

//source: https://en.wikipedia.org/wiki/Conway%27s_game_of_Life
describe("World-based tests", () => {
    describe("Still life tests:", () => {
        it("block should stop execution without ticking", () => {
            const seed = [[0, 0, 0, 0],
                          [0, 1, 1, 0],
                          [0, 1, 1, 0],
                          [0, 0, 0, 0]];


            gameOfLife.gameOfLife(4, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New world is the same as the previous one");
        });

        it("block should stop execution without ticking (small world)", () => {
            const seed = [[1, 1],
                        [1, 1]];

            gameOfLife.gameOfLife(2, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New world is the same as the previous one");
        });

        it("beehive should stop execution without ticking", () => {
            const seed = [[0, 0, 0, 0, 0, 0],
                          [0, 0, 1, 1, 0, 0],
                          [0, 1, 0, 0, 1, 0],
                          [0, 0, 1, 1, 0, 0],
                          [0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0]];

            gameOfLife.gameOfLife(6, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New world is the same as the previous one");
        });

        it("loaf should stop execution without ticking", () => {
            const seed = [[0, 0, 0, 0, 0, 0],
                          [0, 0, 1, 1, 0, 0],
                          [0, 1, 0, 0, 1, 0],
                          [0, 0, 1, 0, 1, 0],
                          [0, 0, 0, 1, 0, 0],
                          [0, 0, 0, 0, 0, 0]];

            gameOfLife.gameOfLife(6, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New world is the same as the previous one");
        });

        it("boat should stop execution without ticking", () => {
            const seed = [[0, 0, 0, 0, 0, 0],
                          [0, 1, 1, 0, 0, 0],
                          [0, 1, 0, 1, 0, 0],
                          [0, 0, 1, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0]];

            gameOfLife.gameOfLife(6, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New world is the same as the previous one");
        });

        it("tub should stop execution without ticking", () => {
            const seed = [[0, 0, 0, 0],
                         [0, 0, 1, 0],
                         [0, 1, 0, 1],
                         [0, 0, 1, 0]];

            gameOfLife.gameOfLife(4, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New world is the same as the previous one");
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
            let seed = [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
                [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
                [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
                [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
                [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
                [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
                [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ];
        });

        it("pentadecathlon (period 15) should stop execution after 15 ticks", () => {

        });
    });
});


describe("gameOfLife() function:", () => {
    it("should stop the execution with an empty world seed", () => {
        const seed = [
            [0,0,0],
            [0,0,0],
            [0,0,0]];

        const generateWorldUnmocker = world.generateWorld;
        world.generateWorld = jest.fn(function() {
            return seed;
        });

        gameOfLife.gameOfLife(3, seed);
        expect(console.log).toHaveBeenLastCalledWith("There is no more cells alive.");
        expect(world.generateWorld).toHaveBeenLastCalledWith(3, seed);

        world.generateWorld = generateWorldUnmocker;
    });

    it("should generate and return new world if world is not dead and (newWorld != world) ", () => {
        const seed = [
            [1, 1],
            [0, 0]];

        const newWorld = [
            [0, 0],
            [0, 0]];

        gameOfLife.gameOfLife(2, seed);
        expect(world.drawWorld).toHaveBeenLastCalledWith(newWorld, undefined);
    });

    it("should generate a new world when being run without initial seed", () => {
        const generateWorldUnmocker = world.generateWorld;
        world.generateWorld = jest.fn(function() {
            return world;
        });

        gameOfLife.gameOfLife(6);
        expect(world.generateWorld).toHaveBeenLastCalledWith(6, undefined);

        world.generateWorld = generateWorldUnmocker;
    });

    it("should stop execution if being called with world size < 2", () => {
        gameOfLife.gameOfLife(1);

        expect(console.log).toHaveBeenLastCalledWith("World parameters are incorrect. Execution will stop.");
    });
});





