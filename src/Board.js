module.exports = function (turn, moveCounter) {
  this.cells = [[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]];
  this.turn = turn;
  this.moveCounter = moveCounter;
  this.gameOver = false;
  this.isFull = function() {
    return this.moveCounter >= 42 ? true : false; 
  };

  this.displayCurrentPlayer = function() {
    if ((this.turn % 2) == 0 ) {
      $("#player-name").text(localStorage.getItem('playerAName'));
      $("#player-name").css("background-color", "#ff0000")
    } else {
      $("#player-name").html(localStorage.getItem('playerBName'));
      $("#player-name").css("background-color","#000000");
    }
  };


  // check all cardinal directions from a cell for neighbors which are the same, summing to four or more.
  this.checkForWin = function(row, col) {
    // left and right
    if (this.sumLikeAdjCells(row, col, 0, 1) + (this.sumLikeAdjCells(row, col, 0, -1)) > 2) {
      this.gameOver = true;
      return true;
    } else {
      // up and down    
      if (this.sumLikeAdjCells(row, col, -1, 0) + (this.sumLikeAdjCells(row, col, 1, 0)) > 2) {
        this.gameOver = true;
        return true;
      } else {
        // northeast and southwest
        if (this.sumLikeAdjCells(row, col, -1, 1) + (this.sumLikeAdjCells(row, col, 1, -1)) > 2) {
          this.gameOver = true;
          return true;
        } else {
          // northwest and southeast
          if (this.sumLikeAdjCells(row, col, -1, -1) + (this.sumLikeAdjCells(row, col, 1, 1)) > 2) {
            this.gameOver = true;
            return true;
          } else {
            return false;
          }
        }
      }
    }
  };

  this.sumLikeAdjCells = function(row, col, row_modifier, col_modifier) {
    // if the current cell is like the cell which is found using the row and col incrementers
    if (!this.gameOver) {
      if (this.getCell(row, col) == (this.getCell(row + row_modifier, col + col_modifier))) {
        // return a 1 and recursively call this function again on that matching cell with the same coordinate pattern 
        return 1 + this.sumLikeAdjCells(row + row_modifier, col + col_modifier, row_modifier, col_modifier);
      } else {
        // else return 0
        return 0;
      } 
    } else {
      return;
    }
  };

  this.getCell = function(row, col) {
    // checks to protect against requested cell being undefined
    if (this.cells[row] == undefined || this.cells[row][col] == undefined) {
      return -1;
    } else {
      return this.cells[row][col];
    }
  };

  this.getRowCoordinate = function(c) {
    var i = this.cells.length - 1;
    this.getCell(i, c)
    while (this.getCell(i, c) == 0) {
      i--;
    }
    return i;
  };

  this.displayReplayButton = function() {
    document.getElementById("replay").style.display = "inline";
  };
};
