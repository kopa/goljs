

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
        expect(Rules.getStateCalculator(1)).toEqual(lonely);
    });

    it("should return a normal neighbourhoood for 2 neighbours", function(){
        expect(Rules.getStateCalculator(2)).toEqual(normal);
    });

    it("should return a optimal neighbourhoood for 3 neighbours", function(){
        expect(Rules.getStateCalculator(3)).toEqual(optimal);
    });

    it("should return a crowded neighbourhoood for 4 neighbours", function(){
        expect(Rules.getStateCalculator(4)).toEqual(crowded);
    });

});
