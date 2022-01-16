// part 1
const getPowerConsumption = (input) => {
    const fs = require("fs");
    const array = fs.readFileSync(input).toString().split("\n");

    let gamma = "";
    let epsilon = "";

    for (let i = 0; i < array[0].length; i++) {
        const bitValues = array.map((line) => Number(line[i]));
        const [numberTrues, numberFalses] = bitValues.reduce(
            ([t, f], value) => {
                return value ? [t + 1, f] : [t, f + 1];
            },
            [0, 0]
        );
        const moreTrues = numberTrues > numberFalses;
        gamma = gamma + (moreTrues ? "1" : "0");
        epsilon = epsilon + (moreTrues ? "0" : "1");
    }
    console.log(gamma, epsilon);
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

// part 2
const getLifeSupportRating = (input) => {
    const fs = require("fs");
    let array = fs.readFileSync(input).toString().split("\n");

    const oxygen = getRating(array, true);
    const co2 = getRating(array, false);

    console.log(oxygen, co2);
    return parseInt(oxygen, 2) * parseInt(co2, 2);
};

const getRating = (array, ratingType) => {
    const bitLength = array[0].length;
    for (let i = 0; i < bitLength; i++) {
        const bitValues = array.map((line) => Number(line[i]));
        const numberTrues = bitValues.reduce((trues, value) => {
            return value ? trues + 1 : trues;
        }, 0);
        const moreTrues = numberTrues >= array.length / 2;
        const filter = ratingType ? moreTrues : !moreTrues;
        array = array.filter((line) => line[i] == Number(filter));
        if (array.length == 1) {
            return array[0];
        }
    }
    return false;
};

console.log(getLifeSupportRating("input.txt"));
