module.exports = function (id, color) {
  this.id = id;
  this.color = color;

  this.setPlayerName = function(id, playerName) {
    this.name = playerName;
  };
};