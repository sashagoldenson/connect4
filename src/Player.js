module.exports = function (id, color) {
  this.id = id;
  this.color = color;

  this.setPlayerName = function(playerName) {
    this.name = playerName;
  };

  this.getPlayerName = function(id) {
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
  };
};