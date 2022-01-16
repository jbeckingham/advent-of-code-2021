// part 1
const getNumberOfLanternFish = (input, days) => {
    const fs = require("fs");
    let lanternFish = fs
        .readFileSync(input)
        .toString()
        .split(",")
        .map((n) => Number(n));

    for (let i = 1; i <= days; i++) {
        const numberFishAboutToHaveBaby = lanternFish.filter(
            (fish) => fish == 0
        ).length;

        lanternFish = lanternFish.map((fish) => (fish == 0 ? 6 : fish - 1));
        for (let j = 0; j < numberFishAboutToHaveBaby; j++) {
            lanternFish.push(8);
        }
    }

    return lanternFish.length;
};

// part 2
const getLargeNumberOfLanternFish = (input, days) => {
    const fs = require("fs");
    let lanternFish = fs
        .readFileSync(input)
        .toString()
        .split(",")
        .map((n) => Number(n));

    let count = getInitialCounts(lanternFish);
    for (let i = 0; i < days; i++) {
        count = processDay(count);
    }
    return Object.values(count).reduce((acc, count) => acc + count);
};

const getInitialCounts = (lanternFish) => {
    let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return indexes.reduce(
        (object, index) => ({
            ...object,
            [index]: lanternFish.filter((fish) => fish == index).length,
        }),
        {}
    );
};

const processDay = (counts) => {
    newCounts = {};
    newCounts[6] = counts[0] + counts[7];
    newCounts[8] = counts[0];
    const standardCounters = [0, 1, 2, 3, 4, 5, 7];
    for (i of standardCounters) {
        newCounts[i] = counts[i + 1];
    }
    return newCounts;
};

console.log(getLargeNumberOfLanternFish("input.txt", 256));
