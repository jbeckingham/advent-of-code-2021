// part 1 & part 2 (comment out diagonal else statement for part 1)
const getDangerousVents = (input) => {
    const fs = require("fs");
    const data = fs.readFileSync(input).toString().split("\n");
    const array = parseData(data);

    let coveredCoordinates = [];

    for (const [[x0, y0], [x1, y1]] of array) {
        if (x0 == x1 || y0 == y1) {
            coveredCoordinates = coveredCoordinates.concat(
                getStraightCoordinates([x0, y0], [x1, y1])
            );
        } else {
            coveredCoordinates = coveredCoordinates.concat(
                getDiagonalCoordinates([x0, y0], [x1, y1])
            );
        }
    }

    const coordGroups = groupSimilar(coveredCoordinates);
    const coordinatesGreaterThanOne = coordGroups.filter((item) => item[1] > 1);
    return coordinatesGreaterThanOne.length;
};

const getStraightCoordinates = ([x0, y0], [x1, y1]) => {
    let coveredCoordinates = [];
    for (let y = Math.min(y0, y1); y < Math.max(y0, y1) + 1; y++) {
        for (let x = Math.min(x0, x1); x < Math.max(x0, x1) + 1; x++) {
            coveredCoordinates.push([x, y]);
        }
    }
    return coveredCoordinates;
};

const getDiagonalCoordinates = ([x0, y0], [x1, y1]) => {
    const slopeUp = (x0 > x1 && y0 > y1) || (x1 > x0 && y1 > y0);
    let coveredCoordinates = [];
    for (let i = 0; i < Math.abs(x0 - x1) + 1; i++) {
        coveredCoordinates.push([
            Math.min(x0, x1) + i,
            slopeUp ? Math.min(y0, y1) + i : Math.max(y0, y1) - i,
        ]);
    }
    return coveredCoordinates;
};

const parseData = (data) =>
    data.map((line) =>
        line
            .split(" -> ")
            .map((coordinates) =>
                coordinates.split(",").map((coordinate) => Number(coordinate))
            )
    );

const groupSimilar = (arr) => {
    return arr
        .map((coords) => coords.join(","))
        .reduce(
            (acc, val) => {
                const { data, map } = acc;
                const ind = map.get(val);
                if (map.has(val)) {
                    data[ind][1]++;
                } else {
                    map.set(val, data.push([val, 1]) - 1);
                }
                return { data, map };
            },
            {
                data: [],
                map: new Map(),
            }
        ).data;
};

console.log(getDangerousVents("input.txt"));
