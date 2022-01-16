// part 1
const playBingo = (input) => {
    const fs = require("fs");
    const array = fs.readFileSync(input).toString().split("\n");
    let [calledNumbers, boards] = parseData(array);

    for (const number of calledNumbers) {
        boards = boards.map((board) => {
            const newBoard = board.map((row) =>
                row.map((boardNumber) =>
                    boardNumber == number ? "X" : boardNumber
                )
            );
            return newBoard;
        });

        const winningBoard = checkForWinningBoard(boards);
        if (winningBoard) {
            return getSumOfRemainingNumbers(winningBoard) * number;
        }
    }
};

// part 2
const loseBingo = (input) => {
    const fs = require("fs");
    const array = fs.readFileSync(input).toString().split("\n");
    let [calledNumbers, boards] = parseData(array);

    for (const number of calledNumbers) {
        boards = boards.map((board) => {
            const newBoard = board.map((row) =>
                row.map((boardNumber) =>
                    boardNumber == number ? "X" : boardNumber
                )
            );
            return newBoard;
        });

        if (boards.length == 1 && boards.find(isBoardWinning)) {
            return getSumOfRemainingNumbers(boards[0]) * number;
        }

        boards = removeWinningBoards(boards);
    }
};

const parseData = (array) => {
    const calledNumbers = array[0].split(",");
    const regex = /([\d])+/g;
    let boards = [];
    for (let i = 2; i < array.length; i += 6) {
        let board = [];
        for (let j = 0; j < 5; j++) board[j] = array[i + j].match(regex);
        boards.push(board);
    }

    return [calledNumbers, boards];
};

const getSumOfRemainingNumbers = (board) => {
    return board.reduce(
        (total, row) =>
            total +
            row.reduce(
                (acc, number) => (number != "X" ? acc + Number(number) : acc),
                0
            ),
        0
    );
};

const removeWinningBoards = (boards) =>
    boards.filter((board) => !isBoardWinning(board));

const checkForWinningBoard = (boards) => boards.find(isBoardWinning);

const isBoardWinning = (board) => {
    const columns = [];
    for (let i = 0; i < 5; i++) {
        const column = board.map((row) => row[i]);
        columns.push(column);
    }

    const rowAndColumns = board.concat(columns);

    return rowAndColumns.some((line) => line.every((item) => item == "X"));
};

console.log(loseBingo("input.txt"));
