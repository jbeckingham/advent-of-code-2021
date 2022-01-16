// part 1
const getCorruptionData = (input) => {
    const fs = require("fs");
    let lines = fs.readFileSync(input).toString().split("\n");

    const processed = lines.map((line) => processLine(line));

    const corrupted = processed.filter((line) => !isIncomplete(line));

    const scores = corrupted.map((line) => getScore(line));

    const total = scores.reduce((acc, value) => acc + value);
    console.log(total);
};

// part 2

const completeLines = (input) => {
    const fs = require("fs");
    let lines = fs.readFileSync(input).toString().split("\n");

    const processed = lines.map((line) => processLine(line));
    const incomplete = processed.filter((line) => isIncomplete(line));
    const completeStrings = incomplete.map((line) => getOppositeSymbols(line));
    const scores = completeStrings
        .map((line) => getCompletedScore(line))
        .sort((a, b) => a - b);

    const middleScore = scores[(scores.length - 1) / 2];
    console.log(middleScore);
};

const getCompletedScore = (line) => {
    const scoreMap = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4,
    };
    const symbols = line.split("");
    return symbols.reduce((score, symbol) => {
        return score * 5 + scoreMap[symbol];
    }, 0);
};

const getOppositeSymbols = (line) => {
    const map = {
        "{": "}",
        "<": ">",
        "[": "]",
        "(": ")",
    };
    const symbols = line.split("");
    const flipped = symbols.map((symbol) => map[symbol]).reverse();
    return flipped.join("");
};

const getScore = (line) => {
    const scoreMap = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137,
    };
    const openSymbols = ["{", "(", "<", "["];

    const closingSymbols = line
        .split("")
        .filter((item) => !openSymbols.includes(item));
    const first = closingSymbols[0];
    return scoreMap[first];
};

const processLine = (line) => {
    const regex = /(\(\))+/g;
    before = line;
    line = line.replace(regex, "");
    after = line;

    for (let i = 0; i < line.length; i++) {
        line = line.replace(/(\(\))/g, "");
        line = line.replace(/(\[\])/g, "");
        line = line.replace(/<>/g, "");
        line = line.replace(/{}/g, "");
    }
    return line;
};

const isIncomplete = (line) => {
    const symbols = ["{", "(", "<", "["];
    return line.split("").every((item) => symbols.includes(item));
};

console.log(completeLines("input.txt"));
