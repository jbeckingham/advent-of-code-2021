// part 1
const countPaths = (input) => {
    const fs = require("fs");
    let data = fs
        .readFileSync(input)
        .toString()
        .split("\n")
        .map((n) => n.split("-"));

    let completeRoutes = [];

    let activeRoutes = getStartingRoutes(data);

    while (activeRoutes.length > 0) {
        activeRoutes = activeRoutes.flatMap((route) => {
            return getNextPossibleRoutes(data, route);
        });

        completeRoutes = completeRoutes.concat(
            activeRoutes.filter(
                (route) => route.points[route.points.length - 1] == "end"
            )
        );

        activeRoutes = activeRoutes.filter(
            (route) => route.points[route.points.length - 1] != "end"
        );
    }

    return completeRoutes.length;
};

const getStartingRoutes = (data) => {
    const startingRoutes = data.flatMap((connection) =>
        connection[0] == "start"
            ? [["start", connection[1]]]
            : connection[1] == "start"
            ? [["start", connection[0]]]
            : []
    );
    return startingRoutes.map((route) => ({
        points: route,
        hasVisitedSmallCaveTwice: false,
    }));
};

const getNextPossibleRoutes = (data, route) => {
    const currentLocation = route.points[route.points.length - 1];
    const possibleNextLocations = data.flatMap((connection) =>
        connection[0] == currentLocation
            ? [connection[1]]
            : connection[1] == currentLocation
            ? [connection[0]]
            : []
    );

    const nextLocations = possibleNextLocations.filter(
        (location) =>
            location !== "start" &&
            (!isLowerCase(location) ||
                !route.hasVisitedSmallCaveTwice ||
                !route.points.includes(location))
    );

    return nextLocations.map((location) => ({
        points: route.points.concat([location]),
        hasVisitedSmallCaveTwice: route.hasVisitedSmallCaveTwice
            ? true
            : isLowerCase(location) && route.points.includes(location)
            ? true
            : false,
    }));
};

const isLowerCase = (string) => string === string.toLowerCase();

console.log(countPaths("input.txt"));
