var Board = function (size) {
    this.size = size;
    this.rows = [];
    this.nextStepAvailable = false;

    this.init();
    this.initNeighbours();
};

Board.Row = function () {
    this.cells = [];
};

Board.prototype.init = function () {
    for (var r = 0; r < this.size; r++) {
        var row = new Board.Row();
        this.rows.push(row);
        for (var c = 0; c < this.size; c++) {
            row.cells.push(new Cell());
        }
    }
};

Board.prototype.initNeighbours = function () {
    for (var r = 0; r < this.size; r++) {
        for (var c = 0; c < this.size; c++) {
            var cell = this.rows[r].cells[c];
            if (r > 0) {
                cell.addNeighbour(this.rows[r - 1].cells[c]);
            }
            if (r < this.size - 1) {
                cell.addNeighbour(this.rows[r + 1].cells[c]);
            }
            if (c > 0) {
                cell.addNeighbour(this.rows[r].cells[c - 1]);
            }
            if (c < this.size - 1) {
                cell.addNeighbour(this.rows[r].cells[c + 1]);
            }
            if (r > 0 && c > 0) {
                cell.addNeighbour(this.rows[r - 1].cells[c - 1]);
            }
            if (r < this.size - 1 && c > 0) {
                cell.addNeighbour(this.rows[r + 1].cells[c - 1]);
            }
            if (r > 0 && c < this.size - 1) {
                cell.addNeighbour(this.rows[r - 1].cells[c + 1]);
            }
            if (r < this.size - 1 && c < this.size - 1) {
                cell.addNeighbour(this.rows[r + 1].cells[c + 1]);
            }
        }
    }
};

Board.prototype.nextStep = function () {
    var r, c, cell, differences, aliveCells;

    differences = 0;
    aliveCells = 0;
    for (r = 0; r < this.size; r++) {
        for (c = 0; c < this.size; c++) {
            cell = this.rows[r].cells[c];

            cell.nextState = this.calculateNewCellstate(cell);

            if (cell.state !== cell.nextState) {
                differences++;
            }
            if (cell.nextState === Cellstate.alive) {
                aliveCells++;
            }
        }
    }

    this.closeStep();
    if (differences === 0 || aliveCells === 0) {
        this.nextStepAvailable = false;
    }
};

Board.prototype.calculateNewCellstate = function(cell) {
    var calculateCellstate = Rules.getStateCalculator(cell.calculateAliveNeighbours());
    return calculateCellstate(cell.state);
};

Board.prototype.closeStep = function () {
    var r, c, cell;

    for (r = 0; r < this.size; r++) {
        for (c = 0; c < this.size; c++) {
            cell = this.rows[r].cells[c];
            cell.state = cell.nextState;
            cell.nextState = null;
        }
    }
};
