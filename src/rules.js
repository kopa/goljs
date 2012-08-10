
CellState = {"dead":0, "alive":1};

Cell = function(x, y) {
    this.state = CellState.dead;
    this.neighbours = [];
    this.x = x;
    this.y = y;
}

Cell.prototype.calculateLivingNeighbours = function() {
    var livingNeighboursCount = 0;
    var ns = this.neighbours.length;
    console.log(ns);
    for (var i = 0; i < ns; i++) {
        if (this.neighbours[i].state === CellState.alive) {
            livingNeighboursCount++;
        }
    }
    return livingNeighboursCount;
}

Cell.prototype.addNeighbour = function(neighbour) {
    this.neighbours.push(neighbour);
}

Board = function() {
    this.cells = [];
    this.cells.push([]);
}

Board.prototype.init = function(xSize, ySize) {
    var neighbour;
    for(x = 0; x < xSize; x++) {
        for(y=0; y < ySize; y++) {
            var cell = new Cell(x,y);
            this.cells[x][y] = cell;
        }
    }

    for(x = 0; x < xSize; x++) {
        for(y=0; y < ySize; y++) {
            var cell = this.cells[x][y];
            if(x > 0) {
                neighbour = this.cells[x-1][y];
                cell.neighbours.push(neighbour);
            }
            if(x < xSize) {
                neighbour = this.cells[x+1][y];
                cell.neighbours.push(neighbour);
            }
            if(y > 0) {
                neighbour = this.cells[x][y-1];
                cell.neighbours.push(neighbour);
            }
            if(y < ySize) {
                neighbour = this.cells[x][y+1];
                cell.neighbours.push(neighbour);
            }
            if(x > 0 && y > 0) {
                neighbour = this.cells[x-1][y-1];
                cell.neighbours.push(neighbour);
            }
            if(x < xSize && y < ySize) {
                neighbour = this.cells[x+1][y+1];
                cell.neighbours.push(neighbour);
            }
            if(x < xSize && y > 0){
                neighbour = this.cells[x+1][y-1];
                cell.neighbours.push(neighbour);
            }
            if(y < ySize && x > 0) {
                neighbour = this.cells[x-1][y+1];
                cell.neighbours.push(neighbour);   
            }
        }
    }
}

function calculateState(cell) {
    var livingNeighbours = cell.calculateLivingNeighbours();
    if(cell.state === CellState.alive && livingNeighbours < 2) {
        return CellState.dead;
    }
    if(cell.state === CellState.alive && livingNeighbours >=2 && livingNeighbours <=3) {
        return CellState.alive;
    }
    return CellState.dead;
}