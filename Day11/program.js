// part 1
const getNumberOfFlashes = (input, n) => {
    const fs = require("fs");
    let lines = fs
        .readFileSync(input)
        .toString()
        .split("\n")
        .map((n) => n.split("").map((n) => Number(n)));

    const width = lines[0].length;
    const height = lines.length;
    let data = lines.flatMap((line, verticalPosition) =>
        line.map((point, horizontalPosition) => [
            point,
            [horizontalPosition, verticalPosition],
        ])
    );
    let totalFlashed = [];

    for (let i = 0; i < n; i++) {
        // add one to everything
        data = data.map(([point, coords]) => [point + 1, coords]);

        // find the (greater than) nines
        let nines = data.filter(([point]) => point > 9).map((z) => z[1]);

        let flashed = [];
        let flashedStrings = [];
        let nineStrings = [];

        while (nines.length > 0) {
            flashed = flashed.concat(nines);
            flashedStrings = flashed.map((z) => z.join(","));
            nineStrings = nines.map((z) => z.join(","));

            // get nine adjacent coordinates
            const nineAdjacent = getNineAdjacents(nines, width, height);

            // filter out flashed
            const coordinatesToIncrement = nineAdjacent.filter(
                (z) => !flashedStrings.includes(z.join(","))
            );

            // Add one to ones touching the nines
            data = coordinatesToIncrement.reduce(
                (acc, coord) => updateByCoordinate(acc, width, coord),
                data
            );

            // set nines to zero
            data = data.map(([point, coords]) =>
                nineStrings.includes(coords.join(","))
                    ? [0, coords]
                    : [point, coords]
            );

            nines = data.filter(([point]) => point > 9).map((z) => z[1]);
        }

        totalFlashed = totalFlashed.concat(flashed);

        // Part 2 - comment for part 1
        // Has everything gone to 0 in this step? If yes, break
        if (data.every((item) => item[0] == 0)) {
            return i + 1;
        }
    }
    // Uncomment for part 1
    // return totalFlashed.length;
};

const getNineAdjacents = (nines, width, height) => {
    return nines.flatMap((nine) => getPointAdjacents(nine, width, height));
};

const getPointAdjacents = ([x, y], width, height) => {
    const points = [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
    ];
    return points.filter(
        ([a, b]) => 0 <= a && a < width && 0 <= b && b < height
    );
};

const updateByCoordinate = (grid, gridWidth, [x, y]) => {
    const flatCoord = gridWidth * y + x;
    const updatedGrid = [...grid];
    updatedGrid[flatCoord] = [
        updatedGrid[flatCoord][0] + 1,
        updatedGrid[flatCoord][1],
    ];
    return updatedGrid;
};

console.log(getNumberOfFlashes("input.txt", 1000));
