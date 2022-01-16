// part 1
const getRisk = (input) => {
    const fs = require("fs");
    let data = fs
        .readFileSync(input)
        .toString()
        .split("\n")
        .map((n) => n.split("").map((e) => Number(e)));

    const lowPoints = data.map((line, verticalPosition) =>
        line.filter((point, horizontalPosition) =>
            isLowPoint(verticalPosition, horizontalPosition, data)
        )
    );

    const combinedLowPoints = lowPoints.reduce(
        (acc, arr) => acc.concat(arr),
        []
    );

    return combinedLowPoints.reduce((acc, point) => acc + point + 1, 0);
};

const isLowPoint = (verticalPosition, horizontalPosition, data) => {
    const horizontalLine = data[verticalPosition];
    const verticalLine = data.map((line) => line[horizontalPosition]);
    return (
        comparePoints(horizontalLine, horizontalPosition) &&
        comparePoints(verticalLine, verticalPosition)
    );
};

const comparePoints = (points, index) => {
    if (index == 0) return points[index] < points[1];
    if (index == points.length - 1) return points[index] < points[index - 1];
    return (
        points[index] < points[index + 1] && points[index] < points[index - 1]
    );
};

// part 2
const getMultipleOfThreeLargestBasins = (input) => {
    const fs = require("fs");
    let data = fs
        .readFileSync(input)
        .toString()
        .split("\n")
        .map((n) => n.split("").map((e) => Number(e)));

    const lowPointCoordinates = data.map((line, verticalPosition) => {
        return line
            .map((e, horizontalPosition) => [
                horizontalPosition,
                verticalPosition,
            ])
            .filter((point, horizontalPosition) =>
                isLowPoint(verticalPosition, horizontalPosition, data)
            );
    });

    const lowPoints = lowPointCoordinates.reduce(
        (acc, arr) => acc.concat(arr),
        []
    );

    const basinSizes = lowPoints.map((lowPoint) =>
        getBasinSize(lowPoint, data)
    );

    const largestThreeBasins = basinSizes.sort((a, b) => b - a).slice(0, 3);

    return largestThreeBasins.reduce((acc, value) => acc * value);
};

const getBasinSize = ([x, y], data) => {
    const originalPoint = { coordinates: [x, y], checked: 1 };
    let pointsInBasin = [originalPoint];
    let pointToCheck = originalPoint;
    while (pointToCheck) {
        pointCoordinates = pointToCheck.coordinates;
        pointsInBasin = pointsInBasin.map((point) =>
            point.coordinates.join(",") == pointCoordinates.join(",")
                ? { ...point, checked: 1 }
                : point
        );
        connectedPoints = getConnectedPoints(pointCoordinates, data);
        pointsInBasin = addPointsToBasin(pointsInBasin, connectedPoints);
        pointToCheck = pointsInBasin.find((point) => point.checked == 0);
    }
    return pointsInBasin.length;
};

const addPointsToBasin = (pointsInBasin, connectedPoints) => {
    const points = connectedPoints.map((point) => ({
        coordinates: point,
        checked: 0,
    }));
    const stringCoordinates = pointsInBasin.map((point) =>
        point.coordinates.join(",")
    );
    const pointsToAdd = points.filter((point) => {
        return !stringCoordinates.includes(point.coordinates.join(","));
    });
    return pointsInBasin.concat(pointsToAdd);
};

const getConnectedPoints = ([x, y], data) => {
    points = [];
    // horizontal
    const horizontal = data[y];
    for (let i = x + 1; true; i++) {
        if (i >= data[0].length || i < 0 || horizontal[i] == 9) break;
        points.push([i, y]);
    }
    for (let j = x - 1; true; j--) {
        if (j >= data[0].length || j < 0 || horizontal[j] == 9) break;
        points.push([j, y]);
    }

    // // vertical
    const vertical = data.map((e) => e[x]);
    for (let k = y + 1; true; k++) {
        if (k >= data.length || k < 0 || vertical[k] == 9) break;
        points.push([x, k]);
    }
    for (let l = y - 1; true; l--) {
        if (l >= data.length || l < 0 || vertical[l] == 9) break;
        points.push([x, l]);
    }
    return points;
};

console.log(getMultipleOfThreeLargestBasins("input.txt"));
