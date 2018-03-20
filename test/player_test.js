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
  })

  describe('setPlayerName()', function() {

    it('will set playerA name', function() {
      playerA.setPlayerName(playerA.id, "playerA test");
      expect(playerA.name).to.equal("playerA test");
    });

    it('will set playerB name', function() {
      playerB.setPlayerName(playerB.id, "playerB test");
      expect(playerB.name).to.equal("playerB test");
    });

  });
  
});