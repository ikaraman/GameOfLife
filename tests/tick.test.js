"use strict";

const tick = require("tick");

console.log = jest.fn(function() {
});

describe("tick() tests:", () => {
    it("nextTick() should call all subfunctions/checks", () => {
        //this test just gives me more coverage on nextTick() logic:
        // isLonely(), isSupported(), isOverpopulated(), isResurrected()
        const seed = [
            [1, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 1],
            [0, 0, 1, 0]];

        const expectedWorld = [
            [1, 0, 1, 0],
            [0, 0, 0, 1],
            [0, 1, 0, 1],
            [0, 0, 1, 0]];

        expect(tick.nextTick(seed)).toEqual(expectedWorld);
    });

    describe("liveCellsAround() tests:", () => {
        it("should properly calculate quantity of live cells nearby when cell is in top left corner", () => {
            const world = [
                [1, 1, 0],
                [0, 0, 1],
                [0, 0, 1]];
            const x = 0;
            const y = 0;

            expect(tick.aliveCellsAroundCell(world, x, y)).toEqual(1);
        });

        it("should properly calculate quantity of live cells nearby when cell is in top left corner", () => {
            const world = [
                [1, 0, 1],
                [1, 1, 1],
                [1, 1, 1]];
            const expectedWorld = [
                [1, 0, 1],
                [0, 0, 0],
                [1, 0, 1]];
            const x = 0;
            const y = 0;

            expect(tick.nextTick(world)).toEqual(expectedWorld);
            expect(tick.aliveCellsAroundCell(world, x, y)).toEqual(2);
        });

        it("should properly calculate quantity of live cells nearby when cell is in top right corner", () => {
            const world = [
                [1, 1, 0],
                [0, 0, 1],
                [0, 0, 1]];
            const x = 0;
            const y = 2;

            expect(tick.aliveCellsAroundCell(world, x, y)).toEqual(2);
        });

        it("should properly calculate quantity of live cells nearby when cell is in top border, not corner", () => {
            const world = [
                [1, 1, 0],
                [0, 0, 1],
                [0, 0, 1]];
            const x = 0;
            const y = 1;

            expect(tick.aliveCellsAroundCell(world, x, y)).toEqual(2);
        });

        it("should properly calculate quantity of live cells nearby when cell is in left border, not corner", () => {
            const world = [
                [1, 1, 0],
                [0, 0, 1],
                [0, 0, 1]];
            const x = 1;
            const y = 0;

            expect(tick.aliveCellsAroundCell(world, x, y)).toEqual(2);
        });

        it("should properly calculate quantity of live cells nearby when cell is in the right border, not corner", () => {
            const world = [
                [1, 1, 0],
                [0, 0, 1],
                [0, 0, 1]];
            const x = 1;
            const y = 2;

            expect(tick.aliveCellsAroundCell(world, x, y)).toEqual(2);
        });

        it("should properly calculate quantity of live cells nearby when cell is in the bottom, not corner", () => {
            const world = [
                [1, 1, 0],
                [0, 0, 1],
                [0, 0, 1]];
            const x = 2;
            const y = 1;

            expect(tick.aliveCellsAroundCell(world, x, y)).toEqual(2);
        });

        it("should properly calculate quantity of live cells nearby when cell is in the bottom right corner", () => {
            const world = [
                [1, 1, 0],
                [0, 0, 1],
                [0, 0, 1]];
            const x = 2;
            const y = 2;

            expect(tick.aliveCellsAroundCell(world, x, y)).toEqual(1);
        });

        it("should properly calculate quantity of live cells nearby when cell is in the bottom left corner", () => {
            const world = [
                [1, 1, 0],
                [0, 0, 1],
                [0, 0, 1]];
            const x = 2;
            const y = 0;

            expect(tick.aliveCellsAroundCell(world, x, y)).toEqual(0);
        });

        it("should properly calculate quantity of live cells nearby when cell is in the middle", () => {
            const world = [
                [1, 1, 0],
                [0, 0, 1],
                [0, 0, 1]];
            const x = 1;
            const y = 1;

            expect(tick.aliveCellsAroundCell(world, x, y)).toEqual(4);
        });
    });
});