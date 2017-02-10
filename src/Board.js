// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        // console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        // console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        // console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var count = 0;
      for (var index = 0; index < row.length; index++) {
        count += row[index];
      }
      return count > 1 ? true : false;
      // var conflicts = rowIndex.reduce(function(total, current) {
      //   return total + current;
      // });
      // return conflicts > 1 ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var length = this.get('n');
      for (var index = 0; index < length; index++) {
        if (this.hasRowConflictAt(index)) {
          return true;
        }
      }
      return false;
      // var length = this.get('n');
      // var conflict = false;
      // for (var rowIndex = 0; rowIndex < length; rowIndex++) {
      //   if (this.hasRowConflictAt(this.get(rowIndex))) {
      //     conflict = true;
      //   }
      // }
      // return conflict;
      // return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var length = this.get('n');
      var count = 0;
      for (var index = 0; index < length; index++) {
        count += this.get(index)[colIndex];
      }
      return count > 1 ? true : false;
      // var conflicts = colIndex.reduce(function(total, current) {
      //   return total + current;
      // });
      // return conflicts > 1 ? true : false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var length = this.get('n');
      for (var index = 0; index < length; index++) {
        if (this.hasColConflictAt(index)) {
          return true;
        }
      }
      return false;
      // var length = this.get('n');
      // for (var columnIndex = 0; columnIndex < length; columnIndex++) {
      //   var column = [];
      //   for (var rowIndex = 0; rowIndex < length; rowIndex++) {
      //     column.push(this.get(rowIndex)[columnIndex]);
      //   }
      //   if (this.hasColConflictAt(column)) {
      //     return true;
      //   }
      // }
      // return false;




        // console.log('rows' + board.get(index)[0]);
      
      //for (var )
      // var board = this.rows();
      // var conflicts = false;
      // var columns = [];
      // for (var row = 0; row < board.length; row++) {
      //   var column = [];
      //   for (var rowIndex = 0; rowIndex < board.length; rowIndex++) {
      //     column.push(board[rowIndex][row]);
      //   }
      //   columns.push(column);
      // }
      // for (var col = 0; col < columns.length; col++) {
      //   if (this.hasColConflictAt(columns[col])) {
      //     conflicts = true;
      //   }
      // }
      // return conflicts;
      // var board = new Board(this.rows());
      // console.log('this row: ', this.rows());
      //       console.log('board: ', board);
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var conflicts = majorDiagonalColumnIndexAtFirstRow.reduce(function(total, current) {
        return total + current;
      });
      return conflicts > 1 ? true : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var length = this.get('n');
      for (var row = 0; row < length; row++) { 
        for (var column = 0; column < length; column++) {
          var diagonal = [];
          var rowShift = row;
          var colShift = column;
          // debugger;
          while (rowShift < length && colShift < length) {
            diagonal.push(this.get(rowShift)[colShift]);
            rowShift++;
            colShift++;
          }
          if (this.hasMajorDiagonalConflictAt(diagonal)) {
            return true;
          }
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // var conflicts = minorDiagonalColumnIndexAtFirstRow.reduce(function(total, current) {
      //   return total + current;
      // });
      // return conflicts > 1 ? true : false;
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var length = this.get('n');
      for (var column = 0; column < length; column++) { 
        for (var row = length - 1; row >= 0; row--) {
          var diagonal = [];
          var rowShift = row;
          var colShift = column;
          // debugger;
          while (rowShift >= 0 && colShift < length) {
            diagonal.push(this.get(rowShift)[colShift]);
            rowShift--;
            colShift++;
          }
          if (this.hasMajorDiagonalConflictAt(diagonal)) {
            return true;
          }
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
