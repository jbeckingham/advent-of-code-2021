// part 1
const getNumberOfTimesDepthIncreases = (input) => {
    var fs = require("fs");
    var array = fs
        .readFileSync(input)
        .toString()
        .split("\n")
        .map((n) => Number(n));

    return array.filter((current, index, array) => current > array[index - 1])
        .length;
};

// part 2
const getNumberOfTimesWindowIncreases = (input) => {
    var fs = require("fs");
    var array = fs
        .readFileSync(input)
        .toString()
        .split("\n")
        .map((n) => Number(n));

    let count = 0;
    for (let i = 3; i < array.length; i++) {
        const curr = array[i] + array[i - 1] + array[i - 2];
        const prev = array[i - 1] + array[i - 2] + array[i - 3];

        if (curr > prev) {
            count++;
        }
    }

    return count;
};

console.log(getNumberOfTimesWindowIncreases("input.txt"));
