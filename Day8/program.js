// part 1
const getNumberOfUniqueInstances = (input) => {
    const fs = require("fs");
    let data = fs
        .readFileSync(input)
        .toString()
        .split("\n")
        .map((n) => n.split(" | ").map((n) => n.split(" ")));

    const secondParts = data
        .map((item) => item[1])
        .reduce((acc, current) => acc.concat(current), []);
    const uniqueLengths = [2, 3, 4, 7];

    const result = secondParts.filter((item) =>
        uniqueLengths.includes(item.length)
    ).length;

    return result;
};

// part 2
const decodeTimes = (input) => {
    const fs = require("fs");
    let data = fs
        .readFileSync(input)
        .toString()
        .split("\n")
        .map((n) => n.split(" | ").map((n) => n.split(" ")));

    const outputs = data.map((line) => decode(line));

    return outputs.reduce((acc, value) => acc + value);
};

const decode = ([rawConfigurations, rawTime]) => {
    let results = {};
    configurations = rawConfigurations.map((e) => alphabetise(e));
    time = rawTime.map((e) => alphabetise(e));
    results[1] = configurations.find((e) => e.length == 2);
    results[4] = configurations.find((e) => e.length == 4);
    results[7] = configurations.find((e) => e.length == 3);
    results[8] = configurations.find((e) => e.length == 7);
    results[2] = findTwo(configurations);
    [three, five] = findThreeAndFiveGivenOneAndTwo(
        configurations,
        results[1],
        results[2]
    );
    [zero, six, nine] = findZeroSixAndNineGivenOneAndFour(
        configurations,
        results[1],
        results[4]
    );
    results[3] = three;
    results[5] = five;
    results[6] = six;
    results[9] = nine;
    results[0] = zero;

    const timeResult = time.map((digit) =>
        Object.entries(results).find(([key, value]) => value == digit)
    );

    return Number(timeResult.map((e) => e[0]).join(""));
};

const alphabetise = (string) => {
    return string.split("").sort().join("");
};

const findTwo = (configurations) => {
    letters = ["a", "b", "c", "d", "e", "f", "g"];
    const letterNotInTwo = letters.filter((letter) => {
        return (
            configurations.filter((item) => {
                return !item.includes(letter);
            }).length == 1
        );
    });
    const twoConfig = configurations.find((item) => {
        return !item.includes(letterNotInTwo);
    });
    return twoConfig;
};

const findThreeAndFiveGivenOneAndTwo = (configurations, one, two) => {
    // get configs with length 5 and filter out 2
    lengthFiveConfigurations = configurations
        .filter((config) => config.length == 5)
        .filter((config) => config != two);

    // three should have both letters from one, 5 will not
    const three = lengthFiveConfigurations.find((config) =>
        one.split("").every((letter) => config.includes(letter))
    );

    // five will be remaining one
    const five = lengthFiveConfigurations.find((config) => config != three);

    return [three, five];
};

const findZeroSixAndNineGivenOneAndFour = (configurations, one, four) => {
    const lengthSixConfigurations = configurations.filter(
        (config) => config.length == 6
    );

    // six will not contain both letters from one
    const six = lengthSixConfigurations.find(
        (config) => !one.split("").every((letter) => config.includes(letter))
    );

    // remove six
    const sixAndNineConfigurations = lengthSixConfigurations.filter(
        (config) => config != six
    );

    // nine should have all letters from 4
    const nine = sixAndNineConfigurations.find((config) =>
        four.split("").every((letter) => config.includes(letter))
    );

    // zero will be remaining one
    const zero = sixAndNineConfigurations.find((config) => config != nine);
    return [zero, six, nine];
};

console.log(decodeTimes("input.txt"));
