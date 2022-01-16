// part 1
const getDepthMultipliedByPosition = (input) => {
    const fs = require("fs");
    let data = fs.readFileSync(input).toString().split("\n");

    array = data
        .map((line) => line.split(" "))
        .map(([command, x]) => [command, Number(x)]);

    [position, depth] = array.reduce(
        ([p, d], [command, x]) => {
            switch (command) {
                case "forward":
                    return [p + x, d];
                case "down":
                    return [p, d + x];
                case "up":
                    return [p, d - x];
            }
        },
        [0, 0]
    );

    console.log(position, depth);

    return position * depth;
};

// part 2
const getDepthMultipliedByPositionConsideringAim = (input) => {
    const fs = require("fs");
    let data = fs.readFileSync(input).toString().split("\n");

    array = data
        .map((line) => line.split(" "))
        .map(([command, x]) => [command, Number(x)]);

    [position, depth, aim] = array.reduce(
        ([p, d, a], [command, x]) => {
            switch (command) {
                case "forward":
                    return [p + x, d + a * x, a];
                case "down":
                    return [p, d, a + x];
                case "up":
                    return [p, d, a - x];
            }
        },
        [0, 0, 0]
    );

    console.log(position, depth, aim);

    return position * depth;
};

console.log(getDepthMultipliedByPosition("input.txt"));
