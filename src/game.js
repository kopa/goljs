(function () {

    var GameOfLife, XSIZE, YSIZE, board;

    XSIZE = 10;
    YSIZE = 10;

    function initializeGame() {
        console.log("init gol");
        board = new Board(XSIZE, YSIZE);
        board.initNeighbours();

        var intervalId = setInterval(tick, 1000);

        function tick() {
            if (board.isTicking()) {
                console.log("tick");
                board.nextStep();
            } else {
                clearInterval(intervalId);
                console.log("end state");
            }
        }


    }

    initializeGame();


}());
