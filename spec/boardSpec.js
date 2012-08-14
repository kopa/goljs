describe("Board", function() {
    it("should have 9 cells if it is initialized with x=3 and y=3", function(){
        var board = new Board(3, 3);
        expect(board.cells.length).toEqual(3);
        expect(board.cells[0].length).toEqual(3);
    });

    it("should have 25 cells if it is initialized with x=5 and y=5", function(){
        var board = new Board(5, 5);
        expect(board.cells.length).toEqual(5);
        expect(board.cells[0].length).toEqual(5);
    });

    it("calc neighbours", function() {
        var board = new Board(3, 3);
        board.initNeighbours();
        expect(board.cells[0][0].neighbours.length).toEqual(3);
    });

    it("calc next step, one comes to live", function() {
        var board = new Board(2, 2);
        board.cells[0][0].state = Cellstate.dead;
        board.cells[0][1].state = Cellstate.alive;
        board.cells[1][0].state = Cellstate.alive;
        board.cells[1][1].state = Cellstate.alive;
        board.initNeighbours();
        board.nextStep();
        expect(board.cells[0][0].state).toEqual(Cellstate.alive);
        expect(board.cells[0][1].state).toEqual(Cellstate.alive);
        expect(board.cells[1][0].state).toEqual(Cellstate.alive);
        expect(board.cells[1][1].state).toEqual(Cellstate.alive);
    });

    it("calc next step, two die of over population", function() {
        var board = new Board(3, 2);
        board.cells[0][0].state = Cellstate.alive;
        board.cells[0][1].state = Cellstate.alive;
        board.cells[1][0].state = Cellstate.alive;
        board.cells[1][1].state = Cellstate.alive;
        board.cells[2][0].state = Cellstate.alive;
        board.cells[2][1].state = Cellstate.alive;
        board.initNeighbours();
        board.nextStep();
        expect(board.cells[0][0].state).toEqual(Cellstate.alive);
        expect(board.cells[0][1].state).toEqual(Cellstate.alive);
        expect(board.cells[1][0].state).toEqual(Cellstate.dead);
        expect(board.cells[1][1].state).toEqual(Cellstate.dead);
        expect(board.cells[2][0].state).toEqual(Cellstate.alive);
        expect(board.cells[2][1].state).toEqual(Cellstate.alive);
    });

    it("calc next step, two die of over population and one comes to life", function() {
        var board = new Board(3, 2);
        board.cells[0][0].state = Cellstate.alive;
        board.cells[0][1].state = Cellstate.alive;
        board.cells[1][0].state = Cellstate.alive;
        board.cells[1][1].state = Cellstate.alive;
        board.cells[2][1].state = Cellstate.alive;
        board.cells[2][0].state = Cellstate.dead;
        board.initNeighbours();
        board.nextStep();
        expect(board.cells[0][0].state).toEqual(Cellstate.alive);
        expect(board.cells[0][1].state).toEqual(Cellstate.alive);
        expect(board.cells[1][0].state).toEqual(Cellstate.dead);
        expect(board.cells[1][1].state).toEqual(Cellstate.dead);
        expect(board.cells[2][1].state).toEqual(Cellstate.alive);
        expect(board.cells[2][1].state).toEqual(Cellstate.alive);
    });
});
