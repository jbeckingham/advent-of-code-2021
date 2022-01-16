const R = require("ramda");

// part 1
const getPolymerAfterNSteps = (input, n) => {
    const fs = require("fs");
    let data = fs.readFileSync(input).toString().split("\n");

    const originalPolymer = data[0].split("");
    const initialLetterCounts = originalPolymer.reduce(
        (counts, letter) => ({
            ...counts,
            [letter]: counts[letter] ? counts[letter] + 1 : 1,
        }),
        {}
    );
    const intialPairCounts = originalPolymer.reduce(
        (counts, letter, index, arr) => {
            const pair = letter + arr[index + 1];
            return index != arr.length - 1
                ? {
                      ...counts,
                      [pair]: counts[pair] ? counts[pair] + 1 : 1,
                  }
                : counts;
        },
        {}
    );

    const mappings = data
        .slice(2, data.length)
        .map((line) => line.split(" -> "));

    const map = getMap(mappings);

    const steps = [...Array(n)];

    const { letterCounts } = steps.reduce(
        ({ letterCounts, pairCounts }) => ({
            letterCounts: processLetterCounts(letterCounts, pairCounts, map),
            pairCounts: processPairCounts(pairCounts, map),
        }),
        { letterCounts: initialLetterCounts, pairCounts: intialPairCounts }
    );

    const letterCountsArray = Object.entries(letterCounts);
    const orderedLetterCounts = letterCountsArray.sort(([, a], [, b]) => a - b);
    const result =
        orderedLetterCounts[orderedLetterCounts.length - 1][1] -
        orderedLetterCounts[0][1];
    return result;
};

const processLetterCounts = (letterCounts, pairCounts, map) => {
    const newCounts = Object.entries(pairCounts).reduce(
        (currentCounts, [pair, number]) => {
            const letter = map[pair][0][1];
            return {
                ...currentCounts,
                [letter]: (currentCounts[letter] || 0) + number,
            };
        },
        letterCounts
    );
    return newCounts;
};

const processPairCounts = (counts, mappings) => {
    const newCounts = Object.entries(counts).reduce(
        (currentCounts, [pair, number]) => {
            const [first, second] = mappings[pair];

            const addToPairCount = (pair, number) => (currentCounts) => ({
                ...currentCounts,
                [pair]: (currentCounts[pair] || 0) + number,
            });

            const updateCounts = R.pipe(
                addToPairCount(first, number),
                addToPairCount(second, number),
                addToPairCount(pair, -number)
            );

            return updateCounts(currentCounts);
        },
        counts
    );
    return newCounts;
};

const getMap = (mappings) => {
    return mappings.reduce(
        (map, [[firstLetter, secondLetter], insert]) => ({
            ...map,
            [firstLetter + secondLetter]: [
                firstLetter + insert,
                insert + secondLetter,
            ],
        }),
        {}
    );
};

console.log(getPolymerAfterNSteps("input.txt", 10));
