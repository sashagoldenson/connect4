import { before, after, describe, it } from 'mocha'
import { expect, assert, should } from 'chai'
global.player = require('../src/Player.js');

describe("Player", function() {
  var playerA;
  var playerB;
  var sandbox;
  beforeEach( function() {
    playerA = new player(0, "red");
    playerB = new player(1, "black");
    sandbox = sinon.sandbox.create();
  })

  afterEach(function() {
    sandbox.restore()
  })

  describe("setPlayerName()", function() {
    it("sets playerA's name to localStorage", function() {
      playerA.setPlayerName(playerA.id, "Player A Test");

      expect(localStorage['playerAName']).to.equal('Player A Test');
    })

    it("sets playerB's name to localStorage", function() {
      playerB.setPlayerName(playerB.id, "Player B Test");

      expect(localStorage['playerBName']).to.equal('Player B Test');
    })
  })
});