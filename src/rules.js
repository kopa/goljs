var lonely = function (alive) {
    return Cellstate.dead;
};
var normal = function (alive) {
    return alive;
};
var optimal = function (alive) {
    return Cellstate.alive;
};
var crowded = function (alive) {
    return Cellstate.dead;
};

var Rules = {};
Rules.getStateCalculator = function (neighbours) {
    if (neighbours == 2) {
        return normal;
    }
    if (neighbours == 3) {
        return optimal;
    }
    if (neighbours > 3) {
        return crowded;
    }

    return lonely;
};
