var Cellstate = {dead:0, alive:1};

var Cell = function (cellstate) {
    this.state = cellstate || Cellstate.dead;
    this.nextState = null;
    this.neighbours = [];

};

Cell.prototype.addNeighbour = function (neighbour) {
    this.neighbours.push(neighbour);
};

Cell.prototype.calculateAliveNeighbours = function () {
    var i, count;
    count = 0;
    for (i = 0; i < this.neighbours.length; i++) {
        if (this.neighbours[i].state === Cellstate.alive) {
            count++;
        }
    }
    return count;
};
