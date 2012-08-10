Cellstate = {dead:0, alive:1};

Cell = function () {
    this.state = Cellstate.dead;
    this.nextState;
    this.neighbours = [];

}

Cell.prototype.addNeighbour = function (neighbour) {
    this.neighbours.push(neighbour);
}

Cell.prototype.calculateNeighbours = function () {
    var count = 0;
    for (var i = 0; i < this.neighbours.length; i++) {
        if (this.neighbours[i].state === Cellstate.alive) {
            count++;
        }
    }
    return count;
}

Board = function() {
    this.xSize;
    this.ySize;
    this.cells = [];
}

Board.prototype.init = function(xSize, ySize) {
    this.xSize = xSize;
    this.ySize = ySize;
    for (var x = 0; x < xSize; x++) {
        this.cells.push([]);
        for (var y = 0; y < ySize; y++) {
            this.cells[x][y] = new Cell();
        }
    }
}

Board.prototype.calculateNeighbours = function() {
    for (var x = 0; x < this.xSize; x++) {
        for (var y = 0; y < this.ySize; y++) {
            var cell = this.cells[x][y];
            if (x > 0) {
                cell.addNeighbour(this.cells[x - 1][y]);
            }
            if (x < this.xSize - 1) {
                cell.addNeighbour(this.cells[x + 1][y]);
            }
            if (y > 0) {
                cell.addNeighbour(this.cells[x][y - 1]);
            }
            if (y < this.ySize - 1) {
                cell.addNeighbour(this.cells[x][y + 1]);
            }
            if (x > 0 && y > 0) {
                cell.addNeighbour(this.cells[x - 1][y - 1]);
            }
            if (x < this.xSize - 1 && y > 0) {
                cell.addNeighbour(this.cells[x + 1][y - 1]);
            }
            if (x > 0 && y < this.ySize - 1) {
                cell.addNeighbour(this.cells[x - 1][y + 1]);
            }
            if (x < this.xSize - 1 && y < this.ySize - 1) {
                cell.addNeighbour(this.cells[x + 1][y + 1]);
            }
        }
    }
}

Board.prototype.nextStep = function() {
    for (var x = 0; x < this.xSize; x++) {
        for (var y = 0; y < this.ySize; y++) {
            var cell = this.cells[x][y];

            if (cell.state === Cellstate.dead && cell.calculateNeighbours() === 3) {
                cell.nextState = Cellstate.alive;
            }
            if (cell.state === Cellstate.alive && cell.calculateNeighbours() < 2) {
                cell.nextState = Cellstate.dead;
            }
        }
    }
}
