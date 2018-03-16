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
require('../src/connect4.js')
var board = require('./../src/Board.js');
var player = require('./../src/Player.js')



describe("board", function() {
  describe("Red win states", function() {
    it("wins horizontally", function() {
    turn = 0
    moveCounter = 0
    var board1 = new board(turn, moveCounter);
    var playerA = new player(0, "red");
    var playerB = new player(1, "black");
    
    board1.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [2,0,2,1,1,1,1],
    [1,1,2,2,1,2,2]]

    board1.checkForWin(4,3);
    expect(board1.gameOver).to.be.true
    });
  });
});

// describe("Learning About Fixtures", function() {
//   it("offers three crucial functions", function() {
//     // readFixtures
//     // setFixtures
//     // loadFixtures
//     expect(readFixtures).toBeDefined();
//     expect(setFixtures).toBeDefined();
//     expect(loadFixtures).toBeDefined();
//   });
// });