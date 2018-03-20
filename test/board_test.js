require('jsdom-global')()
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM('<!doctype html><html><body><p id="player-name"></p></body></html>');
global.window = window
global.document = window.document;
const chai = require('chai');
var expect = chai.expect;
var store = require("store")
global.board = require('../src/Board.js');
global.player = require('../src/Player.js');

describe("board", function() {
  var board1 = new board(0,0);
  beforeEach( function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]];
    board1.gameOver = false;
    board1.turn = 0;
    board1.moveCounter = 0;
  });

  describe("Red win states", function() {
    it("can win horizontally", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [2,0,2,1,1,1,1],
    [1,1,2,2,1,2,2]]

    board1.checkForWin(4,3);
    expect(board1.gameOver).to.be.true
    });

    it("can win vertically", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0],
    [1,2,0,0,0,0,0],
    [1,2,0,0,0,0,0],
    [1,2,0,0,0,0,0]]

    board1.checkForWin(2,0);
    expect(board1.gameOver).to.be.true
    });

    it("can win diagonally NE to SW", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,1,0],
    [0,0,0,0,1,1,0],
    [0,0,0,1,2,2,0],
    [0,0,1,2,2,1,0]]

    board1.checkForWin(2,6);
    expect(board1.gameOver).to.be.true
    });

    it("can win diagonally NW to SE", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0],
    [0,2,1,2,2,0,0],
    [1,2,2,1,1,1,1],
    [1,1,2,2,1,1,2]]

    board1.checkForWin(2,1);
    expect(board1.gameOver).to.be.true
    });
  });

  describe("Red fail states", function () {

    it("cannot win horizontally with less than four in a row", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,2,2,0,0,0],
    [0,0,1,1,1,0,0]]

    board1.checkForWin(5,4);
    expect(board1.gameOver).to.be.false
    });


    it("cannot win vertically with less than four in a row", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0],
    [0,0,0,1,2,0,0],
    [0,0,0,1,2,0,0]]

    board1.checkForWin(3,3);
    expect(board1.gameOver).to.be.false
    });


    it("cannot win diagonally NE to SW with less than four in a row", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0],
    [0,0,2,1,1,0,0],
    [0,0,1,2,2,0,0]]

    board1.checkForWin(3,4);
    expect(board1.gameOver).to.be.false
    });


    it("cannot win diagonally NW to SE with less than four in a row", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,2,0,0,1,0,0],
    [0,1,1,2,2,0,0],
    [1,2,2,1,2,1,1],
    [1,1,2,2,1,1,2]]

    board1.checkForWin(3,2);
    expect(board1.gameOver).to.be.false
    });
  })

  describe("Black win states", function() {
    it("can win horizontally", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0],
    [1,0,1,2,2,2,2],
    [2,2,1,1,2,1,1]]

    board1.checkForWin(4,3);
    expect(board1.gameOver).to.be.true
    });

    it("can win vertically", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [2,0,0,0,0,0,0],
    [2,1,0,0,0,0,0],
    [2,1,0,0,0,0,0],
    [2,1,1,0,0,0,0]]

    board1.checkForWin(2,0);
    expect(board1.gameOver).to.be.true
    });

    it("can win diagonally NE to SW", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,2,0],
    [0,0,0,0,2,1,0],
    [0,0,0,2,1,1,0],
    [0,0,2,1,1,1,0]]

    board1.checkForWin(2,6);
    expect(board1.gameOver).to.be.true
    });

    it("can win diagonally NW to SE", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,2,0,0,0,0,0],
    [1,1,2,1,1,0,0],
    [2,1,1,2,2,2,2],
    [2,2,1,1,2,2,1]]

    board1.checkForWin(2,1);
    expect(board1.gameOver).to.be.true
    });
  });

  describe("Black fail states", function () {

    it("cannot win horizontally with less than four in a row", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0],
    [1,0,2,2,2,0,0]]

    board1.checkForWin(5,4);
    expect(board1.gameOver).to.be.false
    });


    it("cannot win vertically with less than four in a row", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,2,0,0,0],
    [0,0,0,2,1,0,0],
    [0,0,0,2,1,1,0]]

    board1.checkForWin(3,3);
    expect(board1.gameOver).to.be.false
    });


    it("cannot win diagonally NE to SW with less than four in a row", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,2,0,0],
    [0,0,1,2,2,0,0],
    [0,0,2,1,1,0,1]]

    board1.checkForWin(3,4);
    expect(board1.gameOver).to.be.false
    });


    it("cannot win diagonally NW to SE with less than four in a row", function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0],
    [0,2,2,1,1,0,0],
    [2,1,1,2,1,2,2],
    [2,2,1,1,2,2,1]]

    board1.checkForWin(3,2);
    expect(board1.gameOver).to.be.false
    });
  });

  describe("Player names", function() {
    var playerA;
    var playerB;
    beforeEach( function() {
      playerA = new player(0, "red");
      playerA = new player(0, "black");
    });

    describe('displayCurrentPlayer()', function() {

      xit('displays current player by evaluating the turn', function() {
      });

    });
  });

});