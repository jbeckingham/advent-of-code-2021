// part 1
const countDotsAfterFirstFold = (input) => {
    const fs = require("fs");
    let data = fs.readFileSync(input).toString().split("\n");

    const folds = data
        .filter((line) => line.includes("fold along"))
        .map((fold) => fold.replace("fold along ", ""));
    const points = data
        .slice(0, data.length - folds.length - 1)
        .map((point) => point.split(",").map((n) => Number(n)));

    const foldedPoints = fold(points, folds[0].split("="));
    console.log(foldedPoints);
    console.log(foldedPoints.length);
};

// part 2
const getDotsAfterFolds = (input) => {
    const fs = require("fs");
    let data = fs.readFileSync(input).toString().split("\n");

    const folds = data
        .filter((line) => line.includes("fold along"))
        .map((fold) => fold.replace("fold along ", ""))
        .map((fold) => fold.split("="));
    const points = data
        .slice(0, data.length - folds.length - 1)
        .map((point) => point.split(",").map((n) => Number(n)));

    const pointsAfterFolds = folds.reduce(fold, points);

    drawPoints(pointsAfterFolds);
};

const fold = (points, [axis, line]) =>
    removeDuplicateCoordinates(
        axis == "x" ? flipAlongX(points, line) : flipAlongY(points, line)
    );

const removeDuplicateCoordinates = (points) => {
    const newPoints = Array.from(
        new Set(points.map((point) => point.join(",")))
    );
    return newPoints.map((point) => point.split(",").map((n) => Number(n)));
};

const flipAlongX = (points, foldLine) => {
    return points.map(([x, y]) =>
        x > foldLine ? [2 * foldLine - x, y] : [x, y]
    );
};

const flipAlongY = (points, foldLine) => {
    return points.map(([x, y]) =>
        y > foldLine ? [x, 2 * foldLine - y] : [x, y]
    );
};

const drawPoints = (points) => {
    const pointStrings = points.map((p) => p.join(","));
    let map = [];
    for (let j = 0; j < 6; j++) {
        let row = [];
        for (let i = 0; i < 50; i++) {
            row.push(pointStrings.includes(i + "," + j) ? "#" : ".");
        }
        map.push(row);
    }
    const code = map.map((line) => line.join(""));
    for (const line of code) {
        console.log(line);
    }
};

console.log(countDotsAfterFirstFold("input.txt"));
