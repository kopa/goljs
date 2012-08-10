
describe("Cell", function() {
  it("should return 0 as the count of living neighbours", function() {
    var cell = new Cell(1,1);
    expect(cell.calculateLivingNeighbours()).toEqual(0);
  });
  
  it("should return 1 as the count of living neighbours", function() {
    var cell = new Cell(1,1);
    var other = new Cell(1,2);
    other.state = CellState.alive;
    cell.addNeighbour(other);
    expect(cell.calculateLivingNeighbours()).toEqual(1);
  });
});

describe("Board", function() {
  it("should return 0 as the count of living neighbours", function() {
    var cell = new Cell(1,1);
    expect(cell.calculateLivingNeighbours()).toEqual(0);
  });
});

describe("Rules", function() {
  it("should die if less than 2 alive neighbours", function() {
    var cell = new Cell(1,1);
    cell.state = CellState.alive;
    var aliveCell = new Cell(1,2);
    aliveCell.state = CellState.alive;
    cell.addNeighbour(aliveCell);
    expect(calculateState(cell)).toEqual(CellState.dead);
  });
  it("should live if 2 or three alive neighbours", function() {
    var cell = new Cell(1,1);
    cell.state = CellState.alive;
    var aliveCell = new Cell(1,2);
    aliveCell.state = CellState.alive;  
    var aliveCell2 = new Cell(1,3);
    aliveCell2.state = CellState.alive;
    cell.addNeighbour(aliveCell);
    cell.addNeighbour(aliveCell2);
    expect(calculateState(cell)).toEqual(CellState.alive);
  });
});