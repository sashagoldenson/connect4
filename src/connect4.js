var store = require('store');

playerName = document.getElementById("player-name");

$(document).ready(function() {
  store.get('cells')
  buildGameTable();

  $("#game-board").delegate('td','mouseover mouseleave', function(e) {
    if (e.type == 'mouseover' && turn == 0) {
      $("#game-board tr td:nth-child("+($(this).index()+1)+"):not(.played)").addClass("hover");
      $("#game-board tr td:nth-child("+($(this).index()+1)+"):not(.played):last").addClass("hover-target");
    }
    else {
      $("#game-board tr td:nth-child("+($(this).index()+1)+"):not(.played)").removeClass("hover");
      $("#game-board tr td:nth-child("+($(this).index()+1)+"):not(.played):last").removeClass("hover-target");
    }
  });
});

var turn = 0;
var moveCounter = 0;

function Player(id, color) {
  this.id = id,
  this.color = color
};

var field = new Board(0, 0);
var playerA = new Player(0, "red");
var playerB = new Player(1, "black");
function Board(turn, moveCounter) {
  this.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]],
  this.turn = turn,
  this.moveCounter = moveCounter,
  this.gameOver = false
};

Board.prototype.isFull = function() {
    return this.moveCounter == 42 ? true : false; 
}

Board.prototype.displayCurrentPlayer = function() {
  if ((this.turn % 2) == 0 ) {
    document.getElementById("player-name").innerHTML = store.get('playerA')
    document.getElementById("player-name").style.backgroundColor = "red" 
  } else {
    document.getElementById("player-name").innerHTML = store.get('playerB') 
    document.getElementById("player-name").style.backgroundColor = "black"
  }
}

// check all cardinal directions from a cell for neighbors which are the same, summing to four or more.
Board.prototype.checkForWin = function(row, col) {
  // up and down
  if (this.sumLikeAdjCells(row, col, 0, 1) + (this.sumLikeAdjCells(row, col, 0, -1)) > 2) {
    return true;
  } else {
    // left and right    
    if (this.sumLikeAdjCells(row, col, -1, 0) > 2) {
      return true;
    } else {
      // northeast and southwest
      if (this.sumLikeAdjCells(row, col, -1, 1) + (this.sumLikeAdjCells(row, col, 1, -1)) > 2) {
        return true;
      } else {
        // northwest and southeast
        if (this.sumLikeAdjCells(row, col, -1, -1) + (this.sumLikeAdjCells(row, col, 1, 1)) > 2) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
};

Board.prototype.sumLikeAdjCells = function(row, col, row_modifier, col_modifier) {
  // if the current cell is like the cell which is found using the row and col incrementers
  if (this.getCell(row, col) == this.getCell(row + row_modifier, col + col_modifier)) {
    // return a 1 and recursively call this function again on that matching cell with the same coordinate pattern  
    return 1 + this.sumLikeAdjCells(row + row_modifier, col + col_modifier, row_modifier, col_modifier);
  } else {
    // else return 0
    return 0;
  }
};

Board.prototype.getCell = function(row, col) {
  // checks to protect against requested cell being undefined
  if (this.cells[row] == undefined || this.cells[row][col] == undefined) {
    return -1;
  } else {
    return this.cells[row][col];
  }
};

Board.prototype.getRowCoordinate = function(c) {
  var i = field.cells.length - 1;
  this.getCell(i, c)
  while (this.getCell(i, c) == 0) {
    i--;
  }
  return i;
};

Board.prototype.displayReplayButton = function() {
  document.getElementById("replay").style.display = "inline";
}

Player.prototype.setPlayerName = function(playerName) {
  this.name = playerName;
};

Player.prototype.getPlayerName = function(id) {
  var txt;
  var playerName = (id == 0) ? 
    prompt("Red player, please enter your name:", "Red player") :
    prompt("Black player, please enter your name:", "Black player")

  if (playerName == null || playerName == "") {
      txt = (id == 0) ? "Red player" : "Black player"
  } else {
      txt = playerName;
  }
  this.setPlayerName(txt);
  field.displayCurrentPlayer();
};

function buildGameTable() {
  $("#game-board").append( $("<table id='boardId'>").addClass("boardTable") );
  for (var i = 0; i < 6; i++) {
    $(".boardTable").append( $("<tr>").addClass("boardRow") );
    for (var j = 0; j < 7; j++) {
      $(".boardRow:last").append( $("<td>").addClass("boardCell").data("column",j)
      .click(function() {
        if(turn==0) { playColumn(jQuery.data(this,"column")); }
      }));
    }  
  }
};

function playColumn(c) {
  if (!field.isFull() && !field.gameOver) {
    field.cells.reverse();
    var i = field.getRowCoordinate(c) + 1
    field.moveCounter += 1;
    $('.slideDown played').click(function() {
      $(this).addClass("slideDown");
    });
    $("#game-board tr td:nth-child("+(c+1)+"):not(.played):last").addClass("slideDown played player"+((field.turn % 2) + 1)).data("player",field.turn);
    field.cells[i][c] = ((field.turn % 2) + 1);
    field.turn += 1;
  }
  if (field.checkForWin(field.getRowCoordinate(c),c)) {
    $("#score").html(
      (((field.turn % 2) + 1) == 1) ? (store.get('playerB') + ' wins!') : (store.get('playerA') + ' wins!')
     );
    field.gameOver = true
    field.displayReplayButton();
    return;
  } else if (field.isFull()) { 
    $("#score").html(
      "Stalemate! Game over."
    ); 
    field.displayReplayButton();
    field.gameOver = true
    return;
  }
    field.displayCurrentPlayer();
    field.cells.reverse();
    store.set('cells', field.cells);
    store.set('turn', field.turn);
    store.set('moveCounter', field.moveCounter);
}

if ( typeof playerA.name == "undefined" ) { 
  playerA.getPlayerName(0);
  store.set('playerA', playerA.name)
  playerB.getPlayerName(1);
  store.set('playerB', playerB.name)
}