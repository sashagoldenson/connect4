require('jsdom-global')()
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// const options = ;
const { window } = new JSDOM('<!doctype html><html><body><p id="player-name"></p></body></html>', {
  resources: 'usable',
  runScripts: 'dangerously',
  beforeParse(window) {
    window.prompt = window.prompt.bind(window.prompt)
  },
  url: 'http://localhost'
});
global.window = window
global.document = window.document;
global.navigator = window.navigator;
global.HTMLElement = window.HTMLElement;
var MockStorage = require('mockstorage').MockStorage
window.localStorage = new MockStorage();
window.sessionStorage = new MockStorage();

const chai = require('chai');
var expect = chai.expect;
global.sinon = require('sinon'); // eslint-disable-line import/no-commonjs, import/newline-after-import
var store = require("store")
global.$ = require('jquery');
global.board = require('../src/Board.js');
global.player = require('../src/Player.js');


describe("board", function() {
  var board1 = new board(0,0);
  var playerA = new player(0, "red");
  var playerB = new player(1, "black");
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

  afterEach( function() {
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]]
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

});