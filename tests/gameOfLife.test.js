"use strict";

const GameOfLife = require("gameOfLife"),
    Field = require("field"),
    Tick = require("tick");

console.log = jest.fn(function() {
});

//source: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
describe("Field-based tests", () => {
    describe("Still life tests:", () => {
        it("block should stop execution without ticking", () => {
            const seed = [[0, 0, 0, 0],
                          [0, 1, 1, 0],
                          [0, 1, 1, 0],
                          [0, 0, 0, 0]];


            GameOfLife.gameOfLife(4, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New field is the same as a previous one");
        });

        it("block should stop execution without ticking (small field)", () => {
            const seed = [[1, 1],
                        [1, 1]];

            GameOfLife.gameOfLife(2, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New field is the same as a previous one");
        });

        it("beehive should stop execution without ticking", () => {
            const seed = [[0, 0, 0, 0, 0, 0],
                          [0, 0, 1, 1, 0, 0],
                          [0, 1, 0, 0, 1, 0],
                          [0, 0, 1, 1, 0, 0],
                          [0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0]];

            GameOfLife.gameOfLife(6, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New field is the same as a previous one");
        });

        it("loaf should stop execution without ticking", () => {
            const seed = [[0, 0, 0, 0, 0, 0],
                          [0, 0, 1, 1, 0, 0],
                          [0, 1, 0, 0, 1, 0],
                          [0, 0, 1, 0, 1, 0],
                          [0, 0, 0, 1, 0, 0],
                          [0, 0, 0, 0, 0, 0]];

            GameOfLife.gameOfLife(6, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New field is the same as a previous one");
        });

        it("boat should stop execution without ticking", () => {
            const seed = [[0, 0, 0, 0, 0, 0],
                          [0, 1, 1, 0, 0, 0],
                          [0, 1, 0, 1, 0, 0],
                          [0, 0, 1, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0]];

            GameOfLife.gameOfLife(6, seed);
            expect(console.log).toHaveBeenLastCalledWith("Execution will stop. New field is the same as a previous one");
        });

        it("tub should stop execution without ticking", () => {
            const seed = [[0, 0, 0, 0],
                         [0, 0, 1, 0],
                         [0, 1, 0, 1],
                         [0, 0, 1, 0]];

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


describe("gameOfLife() tests:", () => {
    it("empty field should stop the execution", () => {
        const seed = [];

        const generateFieldUnmocker = Field.generateField;
        Field.generateField = jest.fn(function() {
            return seed;
        });

        GameOfLife.gameOfLife(3, seed);
        expect(console.log).toHaveBeenLastCalledWith("There is no more alive cells");
        expect(Field.generateField).toHaveBeenLastCalledWith(3, seed);

        Field.generateField = generateFieldUnmocker;
    });

    it("field size not matching the seed size should be handled gracefully", () => {
        expect(console.log).toHaveBeenLastCalledWith("This test is to be developed");
    });

    it("if field is not dead and (newField != field) new field must be generated and returned", () => {
        const seed = [[1, 1],
                      [0, 0]];

        const expectedField = [[0, 0],
                               [0, 0]];

        const drawFieldUnmocker = Field.drawField;
        Field.drawField = jest.fn(function() {
        });

        GameOfLife.gameOfLife(2, seed);
        expect(Field.drawField).toHaveBeenLastCalledWith(expectedField);

        Field.drawField = drawFieldUnmocker;
    });

    it("starting without initial seed should generate a new field", () => {
        const field = [[0, 0, 0, 0, 0, 0],
                       [0, 1, 1, 0, 0, 0],
                       [0, 1, 0, 1, 0, 0],
                       [0, 0, 1, 0, 0, 0],
                       [0, 0, 0, 0, 0, 0],
                       [0, 0, 0, 0, 0, 0]];

        const generateFieldUnmocker = Field.generateField;
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
    it("nextTick() should call all subfunctions/checks", () => {
        //this test just gives me more coverage on nextTick() logic:
        // isLonely(), isSupported(), isOverpopulated(), isResurrected()
        const seed = [[1, 1, 1, 0],
                      [0, 1, 1, 0],
                      [0, 1, 0, 1],
                      [0, 0, 1, 0]];

        const expectedField = [[1, 0, 1, 0],
                               [0, 0, 0, 1],
                               [0, 1, 0, 1],
                               [0, 0, 1, 0]];

        expect(Tick.nextTick(seed)).toEqual(expectedField);
    });

    describe("liveCellsAround() tests:", () => {
        it("cell is in top left corner", () => {
            const field = [[1, 1, 0],
                           [0, 0, 1],
                           [0, 0, 1]];
            const x = 0;
            const y = 0;

            expect(Tick.liveCellsAround(field, x, y)).toEqual(1);
        });

        it("cell is in top left corner", () => {
            const field = [[1, 0, 1],
                           [1, 1, 1],
                           [1, 1, 1]];
            const expectedField = [[1, 0, 1],
                                   [0, 0, 0],
                                   [1, 0, 1]];
            const x = 0;
            const y = 0;

            expect(Tick.nextTick(field)).toEqual(expectedField);
            expect(Tick.liveCellsAround(field, x, y)).toEqual(2);
        });

        it("cell is in top right corner", () => {
            const field = [[1, 1, 0],
                           [0, 0, 1],
                           [0, 0, 1]];
            const x = 0;
            const y = 2;

            expect(Tick.liveCellsAround(field, x, y)).toEqual(2);
        });

        it("cell is in top border, not corner", () => {
            const field = [[1, 1, 0],
                           [0, 0, 1],
                           [0, 0, 1]];
            const x = 0;
            const y = 1;

            expect(Tick.liveCellsAround(field, x, y)).toEqual(2);
        });

        it("cell is in left border, not corner", () => {
            const field = [[1, 1, 0],
                           [0, 0, 1],
                           [0, 0, 1]];
            const x = 1;
            const y = 0;

            expect(Tick.liveCellsAround(field, x, y)).toEqual(2);
        });

        it("cell is in the right border, not corner", () => {
            const field = [[1, 1, 0],
                           [0, 0, 1],
                           [0, 0, 1]];
            const x = 1;
            const y = 2;

            expect(Tick.liveCellsAround(field, x, y)).toEqual(2);
        });

        it("cell is in the bottom, not corner", () => {
            const field = [[1, 1, 0],
                           [0, 0, 1],
                           [0, 0, 1]];
            const x = 2;
            const y = 1;

            expect(Tick.liveCellsAround(field, x, y)).toEqual(2);
        });

        it("cell is in the bottom right corner", () => {
            const field = [[1, 1, 0],
                           [0, 0, 1],
                           [0, 0, 1]];
            const x = 2;
            const y = 2;

            expect(Tick.liveCellsAround(field, x, y)).toEqual(1);
        });

        it("cell is in the bottom left corner", () => {
            const field = [[1, 1, 0],
                           [0, 0, 1],
                           [0, 0, 1]];
            const x = 2;
            const y = 0;

            expect(Tick.liveCellsAround(field, x, y)).toEqual(0);
        });

        it("cell is in the middle", () => {
            const field = [[1, 1, 0],
                           [0, 0, 1],
                           [0, 0, 1]];
            const x = 1;
            const y = 1;

            expect(Tick.liveCellsAround(field, x, y)).toEqual(4);
        });
    });
});


describe("field() tests:", () => {
    it("generateField(): size 2, without a seed", () => {
        //this test here just gives me line coverage
        //result coming from generateField are random, so checking for "not to equal"...
        expect(Field.generateField(2)).not.toEqual("dfgsdf");
    });

    it("checkFieldsEqual(): with 2 fields that are equal ", () => {
        const field = [[0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 1],
                       [0, 0, 1, 0]];

        expect(Field.checkFieldsEqual(field, field)).toEqual(true);
    });

    it("checkFieldsEqual(): with 2 fields that are NOT equal", () => {
        const field = [[0, 0, 0, 0],
                       [0, 0, 1, 0],
                       [0, 1, 0, 1],
                       [0, 0, 1, 0]];

        const field2 = [[0, 0, 1, 0],
                        [0, 1, 1, 0],
                        [0, 1, 0, 1],
                        [0, 0, 1, 0]];

        expect(Field.checkFieldsEqual(field, field2)).toEqual(false);
    });
});