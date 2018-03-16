var store = require('store');
var _ = require('underscore');
var board = require('./../src/Board.js');
var player = require('./../src/Player.js');

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
var field = new board(0, 0);
var playerA = new player(0, "red");
var playerB = new player(1, "black");

function buildGameTable() {
  $("#game-board").append( $("<table id='boardId'>").addClass("boardTable") );
  for (var i = 0; i < 6; i++) {
    $(".boardTable").append( $("<tr>").addClass("boardRow") );
    for (var j = 0; j < 7; j++) {
      $(".boardRow:last").append( $("<td>").addClass("boardCell").data("column",j).
        click( _.debounce((function() {
        if(turn==0) { field.playColumn(jQuery.data(this,"column")); }
      }), 250)));
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
      document.getElementsByTagName("body")[0].style.background = "green";
      field.displayReplayButton();
      return;
    } else if (field.isFull()) { 
    $("#score").html(
      "Stalemate!");
      field.cells.reverse();
      document.getElementsByTagName("body")[0].style.background = "yellow";    
      field.displayReplayButton();
      field.gameOver = true;
      return;
    };
  if (!field.isFull() && !field.gameOver) {
    field.displayCurrentPlayer();
  }
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
field.displayCurrentPlayer();