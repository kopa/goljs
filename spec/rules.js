describe("Board", function() {
   it("should have 9 cells if it is initialized with x=3 and y=3", function(){
       var board = new Board();
       board.init(3, 3);
       expect(board.cells.length).toEqual(3);
       expect(board.cells[0].length).toEqual(3);
   });

    it("should have 25 cells if it is initialized with x=5 and y=5", function(){
        var board = new Board();
        board.init(5, 5);
        expect(board.cells.length).toEqual(5);
        expect(board.cells[0].length).toEqual(5);
    });

    it("calc neighbours", function() {
       var board = new Board();
        board.init(3,3);
        board.calculateNeighbours();
        expect(board.cells[0][0].neighbours.length).toEqual(3);
    });

    it("calc next step", function() {
        var board = new Board();
        board.init(3,3);
        board.cells[1][0].state = Cellstate.alive;
        board.cells[1][1].state = Cellstate.alive;
        board.cells[0][1].state = Cellstate.alive;
        board.calculateNeighbours();
        board.nextStep();
        expect(board.cells[0][0].nextState).toEqual(Cellstate.alive);
    });

    it("calc next step, one dies", function() {
        var board = new Board();
        board.init(3,3);
        board.cells[1][0].state = Cellstate.alive;
        board.cells[1][1].state = Cellstate.alive;
        board.cells[0][1].state = Cellstate.alive;
        board.calculateNeighbours();
        board.nextStep();
        expect(board.cells[1][0].nextState).toEqual(Cellstate.dead);
    });
});
