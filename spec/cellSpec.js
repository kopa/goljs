describe("Cell",function(){
    it("should calculate living should return zero by default", function(){
        expect(new Cell().calculateAliveNeighbours()).toEqual(0);
    });


    it("should calculate living should return 1 with one living neighbour", function(){
        var cell = new Cell();
        var other = new Cell();
        other.state = Cellstate.alive;
        cell.addNeighbour(other);
        expect(cell.calculateAliveNeighbours()).toEqual(1);
    });

    it("should calculate living should return 0 with only dead neighbours", function(){
        var cell = new Cell();
        cell.addNeighbour(new Cell);
        expect(cell.calculateAliveNeighbours()).toEqual(0);
    });

});
