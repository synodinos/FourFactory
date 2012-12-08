/** checkWin() is evoked after every player move, to check if that
 * move resulted in "four-in-a-row", either horizontally, vertically
 * or diagonally.*/
var checkWin = function(matrix, row, column) {
  var winner = false;
  var lu = ru = rd = ld = 0;
  var lus = false
          , rus = false
          , rds = false
          , lds = false;
  /* Check horizontally (rows) */
  for (var c = 0; c <= 3; c++) {
    console.log('*for c = ' + c + ' , row = ' + row);
    if ((matrix[row][c] == matrix[row][c + 1]) && ((typeof matrix[row][c]) != 'undefined')) {
      console.log('if ((matrix[row][c] == matrix[row][c + 1]) && ((typeof matrix[row][c]) != undefined)) {');
      if (matrix[row][c] == matrix[row][c + 2]) {
        console.log('if (matrix[row][c] == matrix[row][c + 2]) {');
        if (matrix[row][c] == matrix[row][c + 3]) {
          console.log('if (matrix[row][c] == matrix[row][c + 3]) {');
          winner = true;
        }
      }
    }
  }
  if (!winner) {
    /* Check vertically (columns) */
    for (var r = 0; r <= 2; r++) {
      if ((matrix[r][column] == matrix[r + 1][column]) && ((typeof matrix[r][column]) != 'undefined')) {
        if (matrix[r][column] == matrix[r + 2][column]) {
          if (matrix[r][column] == matrix[r + 3][column]) {
            winner = true;
          }
        }
      }
    }
  }
  if (!winner) {
    /* Check matrix diagonally */
    for (var i = 1; i <= 3; i++) {
      if (typeof matrix[row - i] != 'undefined') {
        if (typeof matrix[row - i][column - i] != 'undefined') {
          if ((matrix[row][column] == matrix[row - i][column - i]) && (!lus)) {
            lu++;
          } else {
            lus = true;
          }
        }
        if (typeof matrix[row - i][column + i] != 'undefined') {
          if ((matrix[row][column] == matrix[row - i][column + i]) && (!rus)) {
            ru++;
          } else {
            rus = true;
          }
        }
      }
      if (typeof matrix[row + i] != 'undefined') {
        console.log('has row below');
        if (typeof matrix[row + i][column + i] != 'undefined') {
          if ((matrix[row][column] == matrix[row + i][column + i]) && (!rds)) {
            rd++;
          } else {
            rds = true;
          }
        }
        if (typeof matrix[row + i][column - i] != 'undefined') {
          console.log('has row below-left');
          if ((matrix[row][column] == matrix[row + i][column - i]) && (!lds)) {
            console.log('has row below-lefta and equals');
            ld++;
          } else {
            lds = true;
            console.log('has row below-lefta and NOT equals');
          }
        }
      }
    }
    if ((lu == 3 ) || (ru == 3) || (rd == 3) || (ld == 3)) { // We got a winner!
      winner = true;
    }
  }
  return winner;
};

$(document).ready(function() {
  var isMobile;
  if ($('#board-container').height() == 280) {
    isMobile = true;
  } else {
    isMobile = false;
  }

  /* Load sound effects */
  var sndDisk = new Audio();
  var sndCheer = new Audio();
  var sndLoop = new Audio();

  sndDisk.src = "audio/click.ogg";
  sndCheer.src = "audio/cheer.ogg";
  sndLoop.src = "audio/loop.ogg";

  /* HTML5 audio loop is flaky but lets try */
  sndLoop.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  //setTimeout(function(){sndLoop.play()}, 500);

  /* This will indicate the color of th enext players checker. On page load it's red. */
  $("div#next").addClass("disc_player disc_player0");

  /* These will be used for calculating how far to drop the checkers, so they align with the "holes". */
  if ($('#board-container').height() == 280) {
    var boardMargin = 7;     //->css
    var diskRadious = 35;      //->css
  } else {
    var boardMargin = 20;     //->css
    var diskRadious = 70;      //->css
  }

  /* This is the current player */
  var player = 0; // 0->red, 1->yellow

  /* Number of disk <= 6*7=42 */
  var disk = 0;

  /* Holds board state - matrix[x][y] */
  var matrix = new Array(6);    // 6 rows
  for (i = 0; i < 6; i++) {
    matrix[i] = new Array(7);   // 7 columns
  }

  /** dropDisc() is evoked when a player clicks on the button and
   * takes care of dropping the checker, evoking checkWin(), etc. */
  var dropDisc = function(column, p, row) {

    disk++;
    var nextRow;
    var topOccupiedRow = 6;
    // Helps drops checker in the correct column
    var diskLeftMargin = boardMargin + column * (boardMargin + diskRadious);

    /* Finds how "deep" (row) the checker will go */
    for (k = 5; k >= 0; k--) {
      if (typeof matrix[k][column] != 'undefined') {
        topOccupiedRow = k;
      }
    }
    if (typeof topOccupiedRow == 'undefined') {
      nextRow = 5;
    } else {
      nextRow = topOccupiedRow - 1;
    }

    // TODO this is ugly
    if ($('#board-container').height() == 280) {
      isMobile = true;
      var responsive_length = 62;
      var responsive_length_2 = 52;
    } else {
      isMobile = false;
      var responsive_length = 115;
      var responsive_length_2 = 42;
    }

    if (topOccupiedRow > 0) { // Are you trying to drop a checker on a column that's already full
      var depth = boardMargin + (nextRow - 1) * (boardMargin + diskRadious) + responsive_length;
      matrix[nextRow][column] = p;

      $('#board-container')
              .prepend('<div class="disc_player disc_player' + p + '" id="dp'
              + disk
              + '" style="margin-left: ' + diskLeftMargin
              + 'px; z-index: ' + (disk - responsive_length_2) + '"></div>');

      /* Animate disc */
      $('#dp' + disk).animate({
                top: '+=' + depth
              }, 200, function() {
                sndDisk.play();
              });

      if (checkWin(matrix, nextRow, column)) { // If this turned out to be a winning move -> crowd cheers
        setTimeout(function() {
          sndCheer.play();
          var playerLabel = player ? 'YELLOW' : 'RED  ';
          alert('Player ' + playerLabel + ' wins!!!\n Click ok to reload page and try again...');
          window.location.reload();
        }, 400);
      } else { // This wasn't a winning move :(
        if (disk == 42) { // Board is full -> reload page and start again.
          alert('No winner here :(\n Hit ok to reload page...');
          window.location.reload();
        } else { // Toggle players and wait for next move
          player = player ? 0 : 1;
          $("div#next").removeClass('disc_player' + Math.abs(player - 1));
          $("div#next").addClass('disc_player' + player);
        }
      }
    } else {
      disk--;
    }
  };

  /* Function factory for adding callbacks */
  var eventCb = function(column) {
    if (navigator.mozVibrate) {
      navigator.mozVibrate(1000);
    }
    return function() {
      dropDisc(column, player, 2);
    }
  };

  /* Adding player controls */
  for (i = 0; i <= 6; i++) {
    if (isMobile) {
      $('#controls').append('<div id="col' + i + '" class="control">&darr;</div>');

      var control = document.querySelector("#col" + i);
      // Use the GestureDetector.js library to handle gestures.
      // This will generate tap, pan, swipe and transform events
      new GestureDetector(control).startDetecting();
      // Handle gesture events
      control.addEventListener('swipe', eventCb(i));
    } else {
      $('#controls').append('<button id="col' + i + '" class="control">&darr;</button>');
      $('#col' + i).click(eventCb(i));      
    }

  }

  /* Building 7*6=42 holes in the board */
  for (j = 0; j <= 41; j++) {
    $('#board').append('<div class="hole"></div>');
  }
});
