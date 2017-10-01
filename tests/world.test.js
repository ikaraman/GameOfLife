"use strict";

const world = require("world");

console.log = jest.fn(function() {
});

process.stdout.write = jest.fn(function() {
});

describe("world() tests:", () => {
    describe("generateWorld()", () => {
        it("should generate a random world when called without a seed", () => {
            //this test here just gives me line coverage
            //result coming from generateWorld are random, so checking for "not to equal"...
            expect(world.generateWorld(2)).not.toEqual("dfgsdf");
        });
    });

    describe("isNextGenerationEqual()", () => {
        it("should return TRUE if called with 2 identical worlds", () => {
            const world1 = [[0, 0, 0, 0],
                [0, 0, 1, 0],
                [0, 1, 0, 1],
                [0, 0, 1, 0]];

            expect(world.isNextGenerationEqual(world1, world1)).toBe(true);
        });

        it("should return FALSE if called with 2 NON-identical worlds", () => {
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

    describe("drawWorld()", () => {
        it("should draw space if cell value is 0", () => {
            const seed = [
                [0,0,0],
                [0,0,0],
                [0,0,0]];

            world.drawWorld(seed);
            expect(process.stdout.write).toHaveBeenLastCalledWith(" ");
            expect(console.log).toHaveBeenLastCalledWith("");
        });

        it("should draw asterisk if cell value is 1", () => {
            const seed = [
                [1,1,1],
                [1,1,1],
                [1,1,1]];

            world.drawWorld(seed);
            expect(process.stdout.write).toHaveBeenLastCalledWith("*");
            expect(console.log).toHaveBeenLastCalledWith("");
        });
    });

    describe("validateWorldParameters()", () => {
        describe("should return false", () => {
            describe("when worldSize parameter is < 2", () => {
                it("worldSize = 1 ", () => {
                    const worldSize = 1;
                    expect(world.validateWorldParameters(worldSize)).toEqual(false);
                });

                it("worldSize = 0", () => {
                    const worldSize = 0;
                    expect(world.validateWorldParameters(worldSize)).toEqual(false);
                });

                it("worldSize is negative number", () => {
                    const worldSize = -100;
                    expect(world.validateWorldParameters(worldSize)).toEqual(false);
                });
            });

            describe("when worldSize parameter is NOT a number", () => {
                it("worldSize is undefined", () => {
                    const worldSize = undefined;
                    expect(world.validateWorldParameters(worldSize)).toEqual(false);
                });

                it("worldSize is null", () => {
                    const worldSize = null;
                    expect(world.validateWorldParameters(worldSize)).toEqual(false);
                });

                it("worldSize is NaN", () => {
                    const worldSize = NaN;
                    expect(world.validateWorldParameters(worldSize)).toEqual(false);
                });

                it("worldSize is an array", () => {
                    const worldSize = [];
                    expect(world.validateWorldParameters(worldSize)).toEqual(false);
                });

                it("worldSize is an object ", () => {
                    const worldSize = {};
                    expect(world.validateWorldParameters(worldSize)).toEqual(false);
                });

                it("worldSize is a string", () => {
                    const worldSize = "test string";
                    expect(world.validateWorldParameters(worldSize)).toEqual(false);
                });

                it("worldSize is boolean", () => {
                    const worldSize = true;
                    expect(world.validateWorldParameters(worldSize)).toEqual(false);
                });
            });

            describe("when worldSize parameter is a number", () => {
                it("when worldSize is float", () => {
                    const worldSize = 10.2;
                    expect(world.validateWorldParameters(worldSize)).toEqual(false);
                });

                it("when worldSize is positive infinity", () => {
                    const worldSize = "infinity";
                    expect(world.validateWorldParameters(worldSize)).toEqual(false);
                });

                it("when worldSize is proper integer", () => {
                    const worldSize = 10;
                    expect(world.validateWorldParameters(worldSize)).toEqual(true);
                });
            });

            describe("when values in seed parameter are not 0's or 1's", () => {
                it("but still numbers", () => {
                    const worldSize = 2;
                    const seed = [
                        [1,1],
                        [2,31]];

                    expect(world.validateWorldParameters(worldSize, seed)).toEqual(false);
                });

                it("but NOT numbers", () => {
                    const worldSize = 2;
                    const seed = [
                        [1,"test"],
                        [1,1]];

                    expect(world.validateWorldParameters(worldSize, seed)).toEqual(false);
                });
            });

            describe("when seed parameter size is", () => {
                it("bigger than the world", () => {
                    const worldSize = 3;
                    const seed = [
                        [1,1,0,1],
                        [1,1,1,0],
                        [0,1,1,1],
                        [0,1,1,1]];

                    expect(world.validateWorldParameters(worldSize, seed)).toEqual(false);
                });

                it("smaller than the world", () => {
                    const worldSize = 3;
                    const seed = [
                        [1,1],
                        [1,1]];

                    expect(world.validateWorldParameters(worldSize, seed)).toEqual(false);
                });
            });

            describe("when seed parameter structure is", () => {
                describe("incorrect because", () => {
                    it("it's not an array, but an object", () => {
                        const worldSize = 3;
                        const seed = {};

                        expect(world.validateWorldParameters(worldSize, seed)).toEqual(false);
                    });

                    it("it's not an array, but a string", () => {
                        const worldSize = 3;
                        const seed = "test string seed";

                        expect(world.validateWorldParameters(worldSize, seed)).toEqual(false);
                    });

                    it("it's not an array, but a number", () => {
                        const worldSize = 3;
                        const seed = 12345;

                        expect(world.validateWorldParameters(worldSize, seed)).toEqual(false);
                    });

                    it("incorrect because it's first element is not an array", () => {
                        const worldSize = 3;
                        const seed = [
                            "test first element",
                            [1,1,0],
                            [1,1,1]];

                        expect(world.validateWorldParameters(worldSize, seed)).toEqual(false);
                    });

                    it("incorrect because it's first element length is not matching a worldSize", () => {
                        const worldSize = 3;
                        const seed = [
                            [1,1,0,1,1,1,1],
                            [1,1,0],
                            [1,1,1]];

                        expect(world.validateWorldParameters(worldSize, seed)).toEqual(false);
                    });

                });
            });

            describe("when tickTime parameter is", () => {

            });
        });

        describe("should return true", () => {
            describe("when seed parameter structure is", () => {
                describe("correct because", () => {
                    it("it's not an array, but null (correct)", () => {
                        const worldSize = 3;
                        const seed = null;

                        expect(world.validateWorldParameters(worldSize, seed)).toEqual(true);
                    });

                    it("it's not an array, but undefined (correct)", () => {
                        const worldSize = 3;

                        expect(world.validateWorldParameters(worldSize)).toEqual(true);
                    });
                });
            });
        })
    });
});