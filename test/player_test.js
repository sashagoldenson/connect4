const chai = require('chai');
var expect = chai.expect;
var store = require("store");
global.player = require('../src/Player.js');

describe("player", function() {
  var playerA;
  var playerB;
  beforeEach( function() {
    playerA = new player(0, "red");
    playerB = new player(1, "black");
  });

  describe('setPlayerName()', function() {

    it('will set player name', function() {
      playerA.setPlayerName("playerA test");
      expect(playerA.name).to.equal("playerA test");
    });

  });
});