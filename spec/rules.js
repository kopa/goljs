describe("Rules", function() {
  
  it("should should die if it has less than two neighbors", function() {
    expect(lonely(true)).toBeFalsy();
  });
  it("should should stay alive if it has two or three neighbors", function() {
    expect(normal(true)).toBeTruthy();
    expect(optimal(true)).toBeTruthy();
  });

  it("should should die if it has more than thre neighbors", function() {
    expect(crowded(true)).toBeFalsy();
  });
  it("should should come to live if it has exactly three neighbors", function() {
    expect(optimal(false)).toBeTruthy();
  });
});

describe("Neighbourhoods",function(){

  it("should return a lonely neighbourhoood for 1 neighbours", function(){
    expect(neighbourhood(1)).toEqual(lonely);
  });

  it("should return a normal neighbourhoood for 2 neighbours", function(){
    expect(neighbourhood(2)).toEqual(normal);
  });

  it("should return a optimal neighbourhoood for 3 neighbours", function(){
    expect(neighbourhood(3)).toEqual(optimal);
  });

  it("should return a crowded neighbourhoood for 4 neighbours", function(){
    expect(neighbourhood(4)).toEqual(crowded);
  });

});
describe("Cell",function(){
  it("should calculate living should return zero by default", function(){
    expect(new Cell().calculateAliveNeighbours()).toEqual(0);
  });


  it("should calculate living should return 1 with one living neighbour", function(){
    var cell = new Cell();
    var other = new Cell();
    other.cellstate = Cellstate.alive;
    cell.addNeighbour(other);
    expect(cell.calculateAliveNeighbours()).toEqual(1);
  });

  it("should calculate living should return 0 with only dead neighbours", function(){
    var cell = new Cell();
    cell.addNeighbour(new Cell);
    expect(cell.calculateAliveNeighbours()).toEqual(0);
  });

});

describe("Board",function(){


  it("should allow to add new Cells ", function(){
    var board = new Board();
    board.addLivingCell(3, 5);
    var cell = board.getCell(3,5);
    expect(cell.calculateAliveNeighbours()).toEqual(0);
  });

});
