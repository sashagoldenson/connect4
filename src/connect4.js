var store = require('store');
var _ = require('underscore');
var board = require('board');
var player = require('player');

$(document).ready(function() {
  setupGame();
});

var field = new board(turn = 0, moveCounter = 0);
var playerA = new player(0, "red");
var playerB = new player(1, "black");

function setupGame() {
  localStorage.clear();
  buildGameTable();
  getPlayerNames();
}

function buildGameTable() {
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

  $("#game-board").append( $("<table id='boardId'>").addClass("boardTable") );
  for (var i = 0; i < 6; i++) {
    $(".boardTable").append( $("<tr>").addClass("boardRow") );
    for (var j = 0; j < 7; j++) {
      $(".boardRow:last").append( $("<td>").addClass("boardCell").data("column",j).
        click( _.debounce((function() {
        if(turn==0) { playColumn(jQuery.data(this,"column")); }
      }), 250)));
    }  
  }
};


function displayCurrentPlayer() {
  if ((field.turn % 2) == 0 ) {
    console.log(localStorage['playerAName'])
    document.getElementById("player-name").innerHTML = localStorage['playerAName']
    document.getElementById("player-name").style.backgroundColor = "red" 
  } else {
    document.getElementById("player-name").innerHTML = localStorage['playerBName']
    document.getElementById("player-name").style.backgroundColor = "black"
  }
};


function getPlayerNames() {
  $('#player-a-name-modal').modal('show');
  setTimeout(function() {
    document.getElementById("player-a-input").focus();
  }, 500);
};

function handleFormSubmit(event, form) {  
  event.preventDefault();
  if (!localStorage['playerAName']) {
    if (form.elements[0].value == "" || form.elements[0].value == undefined) {
      localStorage.setItem("playerAName", "Red player")
      playerA.setPlayerName(0, 'Red player')
    } else {
      localStorage.setItem("playerAName", form.elements[0].value)
      playerA.setPlayerName(0, form.elements[0].value)
    }
    $('#player-a-name-modal').modal('toggle');
    $('#player-b-name-modal').modal('show');
    setTimeout(function() {
      document.getElementById("player-b-input").focus();
    }, 500);
  } else {
    if (form.elements[0].value == "" || form.elements[0].value == undefined) {
      localStorage.setItem("playerBName", "Black player")
      playerA.setPlayerName(1, "Black player")
    } else {
      localStorage.setItem("playerBName", form.elements[0].value);
      playerA.setPlayerName(1, form.elements[0].value)
    }
    $('#player-b-name-modal').modal('toggle');
    displayCurrentPlayer();
    return true;
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
      $("#player-name").html(
        (((field.turn % 2) + 1) == 1) ? (localStorage['playerBName'] + ' wins!') : (localStorage['playerAName']) + ' wins!'
      );
      document.getElementsByTagName("body")[0].style.background = "green";
      field.displayReplayButton();
      return;
    } else if (field.isFull()) { 
    $("#player-name").html(
      "Stalemate!");
      field.cells.reverse();
      document.getElementsByTagName("body")[0].style.background = "yellow";    
      field.displayReplayButton();
      field.gameOver = true;
      return;
    };
  if (!field.isFull() && !field.gameOver) {
    displayCurrentPlayer();
  }
  field.cells.reverse();
  store.set('cells', field.cells);
  store.set('turn', field.turn);
  store.set('moveCounter', field.moveCounter);
};