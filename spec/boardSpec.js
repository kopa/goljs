function calculateCells(board) {
    var cells = 0;
    for (var i = 0; i < board.rows.length; i++) {
        for (var j = 0; j < board.rows[i].cells.length; j++) {
            cells++;
        }
    }
    return cells;
}
describe("Board", function() {
    it("should have 3 rows with 3 cells each (= 9 cells) if it is initialized with r=3 and c=3", function(){
        var board = new Board(3, 3);
        expect(board.rows.length).toEqual(3);
        expect(board.rows[0].cells.length).toEqual(3);
        expect(calculateCells(board)).toEqual(9);
    });

    it("should have 5 rows with 5 cells each (= 25 cells) if it is initialized with r=5 and c=5", function(){
        var board = new Board(5, 5);
        expect(board.rows.length).toEqual(5);
        expect(board.rows[0].cells.length).toEqual(5);
        expect(calculateCells(board)).toEqual(25);
    });

    it("calc neighbours: 0,0 should have 3 neighbours", function() {
        var board = new Board(3, 3);
        expect(board.rows[0].cells[0].neighbours.length).toEqual(3);
    });

    it("calc neighbours: 1,1 should have 8 neighbours", function() {
        var board = new Board(3, 3);
        expect(board.rows[1].cells[1].neighbours.length).toEqual(8);
    });

    it("calc neighbours: 2,2 should have 3 neighbours", function() {
        var board = new Board(3, 3);
        expect(board.rows[2].cells[2].neighbours.length).toEqual(3);
    });

    it("calc neighbours: 2,1 should have 5 neighbours", function() {
        var board = new Board(3, 3);
        expect(board.rows[2].cells[1].neighbours.length).toEqual(5);
    });

    it("calc next step, one comes to live", function() {
        var board = new Board(2, 2);
        board.rows[0].cells[0].state = Cellstate.dead;
        board.rows[0].cells[1].state = Cellstate.alive;
        board.rows[1].cells[0].state = Cellstate.alive;
        board.rows[1].cells[1].state = Cellstate.alive;

        board.nextStep();

        expect(board.rows[0].cells[0].state).toEqual(Cellstate.alive);
        expect(board.rows[0].cells[1].state).toEqual(Cellstate.alive);
        expect(board.rows[1].cells[0].state).toEqual(Cellstate.alive);
        expect(board.rows[1].cells[1].state).toEqual(Cellstate.alive);
    });

    it("calc next step, two dieof underpopulation", function() {
        var board = new Board(2, 2);
        board.rows[0].cells[0].state = Cellstate.alive;
        board.rows[0].cells[1].state = Cellstate.dead;
        board.rows[1].cells[0].state = Cellstate.dead;
        board.rows[1].cells[1].state = Cellstate.alive;

        board.nextStep();

        expect(board.rows[0].cells[0].state).toEqual(Cellstate.dead);
        expect(board.rows[0].cells[1].state).toEqual(Cellstate.dead);
        expect(board.rows[1].cells[0].state).toEqual(Cellstate.dead);
        expect(board.rows[1].cells[1].state).toEqual(Cellstate.dead);
    });

    it("calc next step, two die of over population", function() {
        var board = new Board(3, 2);
        board.rows[0].cells[0].state = Cellstate.alive;
        board.rows[0].cells[1].state = Cellstate.alive;
        board.rows[1].cells[0].state = Cellstate.alive;
        board.rows[1].cells[1].state = Cellstate.alive;
        board.rows[2].cells[0].state = Cellstate.alive;
        board.rows[2].cells[1].state = Cellstate.alive;

        board.nextStep();

        expect(board.rows[0].cells[0].state).toEqual(Cellstate.alive);
        expect(board.rows[0].cells[1].state).toEqual(Cellstate.alive);
        expect(board.rows[1].cells[0].state).toEqual(Cellstate.dead);
        expect(board.rows[1].cells[1].state).toEqual(Cellstate.dead);
        expect(board.rows[2].cells[0].state).toEqual(Cellstate.alive);
        expect(board.rows[2].cells[1].state).toEqual(Cellstate.alive);
    });

    it("calc next step, two die of over population and one comes to life", function() {
        var board = new Board(3, 2);
        board.rows[0].cells[0].state = Cellstate.alive;
        board.rows[0].cells[1].state = Cellstate.alive;
        board.rows[1].cells[0].state = Cellstate.alive;
        board.rows[1].cells[1].state = Cellstate.alive;
        board.rows[2].cells[1].state = Cellstate.alive;
        board.rows[2].cells[0].state = Cellstate.dead;

        board.nextStep();

        expect(board.rows[0].cells[0].state).toEqual(Cellstate.alive);
        expect(board.rows[0].cells[1].state).toEqual(Cellstate.alive);
        expect(board.rows[1].cells[0].state).toEqual(Cellstate.dead);
        expect(board.rows[1].cells[1].state).toEqual(Cellstate.dead);
        expect(board.rows[2].cells[1].state).toEqual(Cellstate.alive);
        expect(board.rows[2].cells[1].state).toEqual(Cellstate.alive);
    });
});
