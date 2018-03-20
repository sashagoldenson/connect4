module.exports = function (id, color) {
  this.id = id;
  this.color = color;

  this.setPlayerName = function(id, playerName) {
    this.name = playerName;
    if (id == 0) {
      localStorage.setItem('playerAName', playerName)
    } else {
      localStorage.setItem('playerBName', playerName)
    }
  };
};