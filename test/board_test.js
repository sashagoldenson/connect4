import { before, after, describe, it } from 'mocha'
import { expect, assert, should } from 'chai'
global.board = require('../src/Board.js');
global.player = require('../src/Player.js');

describe("Board", function() {
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

	describe("Player name", function() {
		var playerA;
		var playerB;
		var board2;
		// var sandbox;
		beforeEach( function() {
			board2 = new board(0,0);
			playerA = new player(0, "red");
			playerB = new player(1, "black");
			playerA.setPlayerName(0, "Player A Test")
			playerB.setPlayerName(1, "Player B Test")
			board2.cells = [
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0]];
			board2.gameOver = false;
			board2.turn = 0;
			board2.moveCounter = 0;
			// sandbox = sinon.sandbox.create();
		});

		// afterEach(function() {
		// 	// sandbox.restore();
		// })

		describe('displayCurrentPlayer()', function() {

			xit('displays name of Player A when starting a new game, turn = 0', function() {
				if (board2.turn == 0) {
					// board2.displayCurrentPlayer();
				}

				// expect($('#player-name').value()).to.equal(playerA.name);
			})
			
			xit('displays name of Player A when turn value is even', function() {
				board2.turn += 2;
				if ((board2.turn % 2) == 0) {
					// board2.displayCurrentPlayer();
				}

				// expect($('#player-name').value()).to.equal(playerA.name)
			})
			
			xit('displays name of Player B when turn value is odd', function() {
				board2.turn += 1
				if ((board2.turn % 2) == 1) {
					// board2.displayCurrentPlayer();
				}

				// expect($('#player-name').value()).to.equal(playerB.name)
			})

			xit('displays name of Player A in Red when Red wins', function() {
				board2.cells = [[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[1,0,0,0,0,0,0],
				[1,2,0,0,0,0,0],
				[1,2,0,0,0,0,0],
				[1,2,0,0,0,0,0]]
				board2.checkForWin(2,0);

				// expect($('#player-name').value()).to.equal(playerA.name + " wins!")
				// expect($('#player-name').css('background-color')).to.equal('#ff0000');
			});

			xit('displays name of Player B in Black when Black wins', function() {
				board2.cells = [[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,2,0,0,0,0,0],
				[1,2,0,0,0,0,0],
				[1,2,0,0,0,0,0],
				[1,2,0,0,0,1,0]]
				board2.checkForWin(2,1);

				// expect($('#player-name').value()).to.equal(playerB.name + " wins!")
				// expect($('#player-name').css('background-color')).to.equal('#000000');
			});

			xit('displays Stalemate message with a Yellow body background-color when the board is full', function() {
				board2.moveCounter = 42;
				if (board2.isFull()) {
					// expect($('#player-name').value()).to.equal("Stalemate!")
					// expect($('body').css('background-color')).to.equal('yellow');	
				}
			});

		});
	});

});