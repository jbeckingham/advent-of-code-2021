// part 1
const getLeastExpensiveTrip = (input) => {
    const fs = require("fs");
    let crabs = fs
        .readFileSync(input)
        .toString()
        .split(",")
        .map((n) => Number(n));

    positions = Array(Math.max(...crabs))
        .fill(0)
        .map((e, i) => i + 1);

    possibleCosts = positions.map((position) =>
        crabs
            .map((crab) => getTriangularNumber(Math.abs(crab - position)))
            .reduce((acc, cost) => acc + cost)
    );

    return Math.min(...possibleCosts);
};

// part 2 - apply this to the cost
const getTriangularNumber = (number) => (number * (number + 1)) / 2;

console.log(getLeastExpensiveTrip("input.txt"));
