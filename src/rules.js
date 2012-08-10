var lonely = function(alive){
    return Cellstate.dead;
}
var normal = function(alive) {
    return alive;
}
var optimal =function(alive) {
    return Cellstate.alive;
}
var crowded = function(alive) {
    return Cellstate.dead;
}

function neighbourhood(neighbours) {
    if(neighbours==2){
        return normal;
    }
    if(neighbours==3) {
        return optimal;
    }
    if(neighbours > 3){
        return crowded;
    }

    return lonely;
}


var Cellstate = { "dead":0, "alive":1};

var Cell=function() {
    this.cellstate = Cellstate.dead;
    this.neighbours = [];
}

Cell.prototype.addNeighbour = function(neighbour) {
    this.neighbours.push(neighbour);
}

Cell.prototype.calculateAliveNeighbours = function() {
    var count = 0;
    for (var i = 0; i < this.neighbours.length; i++) {
        if (this.neighbours[i].cellstate === Cellstate.alive) {
            count++;
        }
    }
    return count;
}