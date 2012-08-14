(function () {

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

    window.lonely = lonely;
    window.normal = normal;
    window.optimal = optimal;
    window.crowded = crowded;

    var Rules = {};
    Rules.neighbourhood = function (neighbours) {
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
    window.Rules = Rules;

}());
