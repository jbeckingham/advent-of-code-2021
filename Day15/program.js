const PriorityQueue = require("priorityqueuejs");

const getTouchingPoints = ([x, y], map) => {
    const points = [
        [x, Number(y - 1)],
        [x, Number(y + 1)],
        [Number(x - 1), y],
        [Number(x + 1), y],
    ];

    const filteredPoints = points.filter(
        ([x, y]) => x >= 0 && x < map[0].length && y >= 0 && y < map.length
    );

    const result = filteredPoints.map(([x, y]) => ({
        node: [x, y].join(","),
        distance: map[x][y],
    }));

    return result;
};

const buildPartTwoData = (data) => {
    const expandHorizontally = data.map((row) => expandRowFiveTimes(row));
    const expandVertically = [...Array(5)].flatMap((item, i) =>
        expandHorizontally.map((line) =>
            line.map((n) => applyAdditionModNine(n, i))
        )
    );
    return expandVertically;
};

const expandRowFiveTimes = (row) =>
    [...Array(5)].flatMap((item, i) =>
        row.map((n) => applyAdditionModNine(n, i))
    );

const applyAdditionModNine = (number, i) => {
    return number + i > 9 ? ((number + i) % 10) + 1 : number + i;
};

const getChildren = (node, data) =>
    getTouchingPoints(
        node.split(",").map((n) => Number(n)),
        data
    );

const findShortestPath = (input) => {
    const fs = require("fs");
    const data = fs
        .readFileSync(input)
        .toString()
        .split("\n")
        .map((line) => line.split("").map((n) => Number(n)));

    const part2Data = buildPartTwoData(data);

    const startNode = "0,0";
    const endNode =
        Number(part2Data[0].length - 1) + "," + Number(part2Data.length - 1);

    let distances = {};
    let distancesQueue = new PriorityQueue(function (a, b) {
        return b.distance - a.distance;
    });

    distancesQueue.enq({ node: endNode, distance: 1000000000000 });
    distances[endNode] = 1000000000000;

    let children = getChildren(startNode, part2Data);

    for (let child of children) {
        distancesQueue.enq(child);
        distances[child.node] = child.distance;
    }

    let shortestDistanceNode = distancesQueue.peek();
    distancesQueue.deq();

    while (shortestDistanceNode.node !== endNode) {
        children = getChildren(shortestDistanceNode.node, part2Data);

        for (let child of children) {
            if (child.node === startNode) {
                continue;
            } else {
                let newDistance =
                    shortestDistanceNode.distance + child.distance;
                if (
                    !distances[child.node] ||
                    newDistance < distances[child.node]
                ) {
                    distancesQueue.enq({
                        node: child.node,
                        distance: newDistance,
                    });
                    distances[child.node] = newDistance;
                }
            }
        }
        shortestDistanceNode = distancesQueue.peek();
        distancesQueue.deq();
    }

    return distances[endNode];
};

console.time();
console.log(findShortestPath("input.txt"));
console.timeEnd();
