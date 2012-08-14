(function () {

    var Board = function (xSize, ySize) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.cells = [];
        this.init();
        this.ticking = true;
        this.isTicking = function () {
            return this.ticking;
        }
    };

    Board.prototype.init = function () {
        $("#gamepad").append(this.createGameTable());

        for (var x = 0; x < this.xSize; x++) {
            this.cells.push([]);
            for (var y = 0; y < this.ySize; y++) {
                var cell = new Cell();
                //todo starting grid??
                if ((x === 0 && y === 1) || (x === 1 && y === 1) || (x === 1 && y === 0) || (x === 2 && y === 0)
                    || (x === 3 && y === 0) || (x === 3 && y === 1)) {
                    cell.state = Cellstate.alive;
                }
                if ((x === this.xSize / 2 && y === this.ySize / 2) || (x === (this.xSize / 2 + 1) && y === this.ySize / 2)
                    || (x === this.xSize / 2 && y === (this.ySize / 2 + 1)) || (x === (this.xSize / 2 + 2) && y === this.ySize / 2)) {
                    cell.state = Cellstate.alive;
                }

                this.cells[x][y] = cell;

                this.renderState(cell, $("#" + y + x));
            }
        }
    };

    Board.prototype.createGameTable = function () {
        var table, tableEnd, rows, r, c;
        table = "<table id='gameTable'>";
        rows = "";
        tableEnd = "</table>";

        for (r = 0; r < this.ySize; r++) {
            rows += this.createRow(r);
        }

        return table + rows + tableEnd;
    };

    Board.prototype.initNeighbours = function () {
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
    };

    Board.prototype.nextStep = function () {
        var x, y, cell, calculateCellstate, differences;

        differences = 0;

        for (x = 0; x < this.xSize; x++) {
            for (y = 0; y < this.ySize; y++) {
                cell = this.cells[x][y];
                calculateCellstate = Rules.neighbourhood(cell.calculateAliveNeighbours());
                cell.nextState = calculateCellstate(cell.state);
                if (cell.state !== cell.nextState) {
                    differences++;
                }
            }

        }
        this.closeStep();
        if (differences === 0) {
            this.ticking = false;
        }
    };

    Board.prototype.closeStep = function () {
        var x, y, cell;

        for (x = 0; x < this.xSize; x++) {
            for (y = 0; y < this.ySize; y++) {
                cell = this.cells[x][y];
                cell.state = cell.nextState;
                cell.nextState = null;
                this.renderState(cell, $("#" + y + x));
            }
        }
    };

    Board.prototype.renderState = function (cell, cellElement) {
        if (cell.state === Cellstate.alive) {
            cellElement.removeClass("dead").addClass("alive");
        } else {
            cellElement.removeClass("alive").addClass("dead");
        }
    };


    Board.prototype.createRow = function (index) {
        return "<tr id='" + index + "'>" + this.createCells(index) + "</tr>"
    };

    Board.prototype.createCells = function (index) {
        var cells = "";
        for (c = 0; c < this.xSize; c++) {
            cells += "<td id='" + this.createId(index, c) + "' class='dead'></td>";
        }
        return cells;
    };

    Board.prototype.createId = function (rowIndex, cellIndex) {
        return rowIndex + "" + cellIndex;
    };

    window.Board = Board;

}());
