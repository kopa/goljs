var gol = angular.module("GameOfLife", []);

gol.controller('GameController', function GameController($scope, $timeout) {
    var board;

    $scope.newGame = function () {
        board = $scope.board = new Board($scope.boardSize);
    };

    $scope.nextStep = function () {
        board.nextStep();
    };

    $scope.playing = false;

    $scope.play = function () {
        $scope.playing = true;
    };

    $scope.stop = function () {
        $scope.playing = false;
    };

    $scope.$watch("playing", function () {
        var tick = function () {
            if ($scope.playing && $scope.board.nextStepAvailable) {
                $scope.nextStep();
                if ($scope.playing) {
                    return $timeout(tick, 500);
                }
            }
        };
        return tick();
    });

    $scope.toggle = function (cell) {
        if (cell.state === Cellstate.alive) {
            cell.state = Cellstate.dead;
        } else {
            cell.state = Cellstate.alive;
        }
        board.nextStepAvailable = true;
        $scope.playing = false;
    };

    $scope.cellClass = function (cell) {
        if (cell.state === Cellstate.alive) {
            return "alive";
        } else {
            return "dead";
        }
    };

    $scope.boardSize = 10;

    $scope.newGame();
});


