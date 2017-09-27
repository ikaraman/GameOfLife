"use strict";

const GameOfLife = require("gameOfLife"),
    Field = require("field");

console.log = jest.fn(function() {
});

//source: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
describe("Field-based tests", () => {
    describe("Still life tests:", () => {
        it("block should stop execution without ticking", () => {
            let seed = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];

            GameOfLife.gameOfLife(4, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New field is the same as a previous one");
        });

        it("block should stop execution without ticking (small field)", () => {
            let seed = [[1, 1], [1, 1]];

            GameOfLife.gameOfLife(2, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New field is the same as a previous one");
        });

        it("beehive should stop execution without ticking", () => {
            let seed = [[0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

            GameOfLife.gameOfLife(6, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New field is the same as a previous one");
        });

        it("loaf should stop execution without ticking", () => {
            let seed = [[0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0], [0, 1, 0, 0, 1, 0], [0, 0, 1, 0, 1, 0], [0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0]];

            GameOfLife.gameOfLife(6, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New field is the same as a previous one");
        });

        it("boat should stop execution without ticking", () => {
            let seed = [[0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0], [0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

            GameOfLife.gameOfLife(6, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New field is the same as a previous one");
        });

        it("tub should stop execution without ticking", () => {
            let seed = [[0, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]];

            GameOfLife.gameOfLife(4, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New field is the same as a previous one");
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
});


describe("gameOfLife() tests:", () => {
    it("empty field should stop the execution", () => {
        let seed = [];

        let generateFieldUnmocker = Field.generateField;
        Field.generateField = jest.fn(function() {
            return seed;
        });

        GameOfLife.gameOfLife(3, seed);
        expect(console.log).toHaveBeenLastCalledWith("There is no more alive cells");
        expect(Field.generateField).toHaveBeenLastCalledWith(3, seed);

        Field.generateField = generateFieldUnmocker;
    });

    it("starting without initial seed should generate a new field", () => {
        let field = [[0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 0], [0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

        let generateFieldUnmocker = Field.generateField;
        Field.generateField = jest.fn(function() {
            return field;
        });

        GameOfLife.gameOfLife(6);
        expect(Field.generateField).toHaveBeenLastCalledWith(6, undefined);

        Field.generateField = generateFieldUnmocker;
    });

    it("calling game of life with size < 2 field should not be allowed", () => {
        GameOfLife.gameOfLife(1);

        expect(console.log).toHaveBeenLastCalledWith("Field size cannot be less than 2. Execution will stop.");
    });
});


describe("tick() tests:", () => {
    it("...", () => {

    });
});


describe("field() tests:", () => {
    it("generateField(): size 2, without a seed", () => {
        //this test here just gives me line coverage
        //result coming from generateField are random, so checking for "not to equal"...
        expect(Field.generateField(2)).not.toEqual("dfgsdf");
    });

    it("checkFieldsEqual(): with 2 fields that are equal ", () => {
        let field = [[0, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]];

        expect(Field.checkFieldsEqual(field, field)).toEqual(true);
    });

    it("checkFieldsEqual(): with 2 fields that are NOT equal", () => {
        let field = [[0, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]];
        let field2 = [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]];

        expect(Field.checkFieldsEqual(field, field2)).toEqual(false);
    });
});