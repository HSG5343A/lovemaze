var express  = require('express');
var app      = express();
var http     = require('http').Server(app);
var io       = require('socket.io')(http);

app.use(express.static(__dirname + '/webgl-chat'));
app.use('/public', express.static(__dirname + '/public'));

var maze = undefined;
var mazeDimension = 49;
maze = generateSquareMaze(mazeDimension);

var mazeStr = "";
for(var i = 0; i < maze.length - 1; i++)
{
    mazeStr +=  maze[i] + "-";
}
 mazeStr +=  maze[maze.length - 1];


io.on('connection', function(socket) {
	var id = socket.id;
	console.log(id);
    //console.log(mazeStr);

    socket.on('unityLoad', function() {
        socket.emit('maze', mazeStr);
    });

	socket.on('move', function(x, y, z) {
		//console.log("move", x, y, z);
		socket.broadcast.emit('move', id, x, y, z);
	});

	socket.on('rotate', function(x, y, z, w) {
		socket.broadcast.emit('rotate', id, x, y, z, w);
	});

	socket.on('talk', function(message) {
		socket.broadcast.emit('talk', id, message);
	});

	socket.on('disconnect', function(message) {
		console.log(id);
		socket.broadcast.emit('destroy', id);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});


function generateSquareMaze(dimension) {

    function iterate(field, x, y) {
        field[x][y] = false;
        while(true) {
            directions = [];
            if(x > 1 && field[x-2][y] == true) {
                directions.push([-1, 0]);
            }
            if(x < field.dimension - 2 && field[x+2][y] == true) {
                directions.push([1, 0]);
            }
            if(y > 1 && field[x][y-2] == true) {
                directions.push([0, -1]);
            }
            if(y < field.dimension - 2 && field[x][y+2] == true) {
                directions.push([0, 1]);
            }
            if(directions.length == 0) {
                return field;
            }
            dir = directions[Math.floor(Math.random()*directions.length)];
            field[x+dir[0]][y+dir[1]] = false;
            field = iterate(field, x+dir[0]*2, y+dir[1]*2);
        }
    }

    // Initialize the field.
    var field = new Array(dimension);
    field.dimension = dimension;
    for(var i = 0; i < dimension; i++) {
        field[i] = new Array(dimension);
        for (var j = 0; j < dimension; j++) {
            field[i][j] = true;
        }
    }

    // Generate the maze recursively.
    field = iterate(field, 1, 1);
    var holes = Math.floor((dimension-1) * (dimension-1) / 7 - 8);

    //Odd or Even
    var lpass = Math.round((dimension - 2) * 0.5);
    var lwall = Math.floor((dimension - 2) * 0.5);

    var wx, wy;

    while(holes > 0) {
        var ran = Math.floor(Math.random() * 2);
        if(ran == 0)
        {
            //Remove Vertical
            wx = 1 + Math.floor(Math.random() * lpass);
            wy = 2 + Math.floor(Math.random() * lwall);
            if(!field[wx][wy + 1] && !field[wx][wy - 1]) field[wx][wy] = false;
        }
        else
        {
            ////Remove Horizontal
            wx = 2 + Math.floor(Math.random() * lwall);
            wy = 1 + Math.floor(Math.random() * lpass);
            if(!field[wx + 1][wy] && !field[wx - 1][wy]) field[wx][wy] = false;
        }
        holes--;
    };

    
    return field;

}


