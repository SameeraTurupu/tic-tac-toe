
var N_SIZE = 3,
  EMPTY = '&nbsp;',
  boxes = [],
  turn = 'X',
  score,
  moves;

  

function init() {

  //first let me create a board using table
  var board = document.createElement('table');
  board.setAttribute('border', 2);
  board.setAttribute('cellspacing', 1);

  //then create the whole 3 x 3 matrix
  for (var i = 0; i < N_SIZE; i++) {
    //here i will create a row and append it to the board
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      //in each row i will add a cell using td tag 
      var cell = document.createElement('td');
      cell.setAttribute('height', 120);
      cell.setAttribute('width', 120);
      cell.setAttribute('align', 'center');
      cell.setAttribute('valign', 'center');
      //let me add a class list for normal elements I will add row and col indexes
      cell.classList.add('row' + i, 'col' + j);
      // As they are only 2 diagonals so the first diagonal (0,0)(1,1) etc. 
      //we will consider the first diagonal as diagonal0 and 
      if (i == j) {
        cell.classList.add('diagonal0');
      }
      //this will be another diagonal lets make this a diagonal 1
      if (j == N_SIZE - i - 1) {
        cell.classList.add('diagonal1');
      }
      cell.addEventListener('click', updateTurn);
      //this we will have to append it to each row
      row.appendChild(cell);
      boxes.push(cell);
    }
  }
  //first create a div tag with TicTacToe as id then we appended the the whole table 
  document.getElementById('TicTacToe').appendChild(board);
  // after this let's start the game
  startNewGame();
}

/**
 * New game
 */
function startNewGame() {
  //let the move be 0 and the maximum moves that the both players can take is 3 * 3 = 9
  moves = 0;
  //let us intially assume that player X gets the first chance
  turn = 'X';
  //lets maintain a list to update the move in the html 
  boxes.forEach(function (cell) {
    //set each cell as empty first
    cell.innerHTML = EMPTY;
  });
}

/**
 * Check if a win or not
 */
function win(clicked) {
  //every time I will get all the cell classes and slipt them 
  var memberOf = clicked.className.split(" ");
  for (var i = 0; i < memberOf.length; i++) {
    //I am just appending a '.' so that I can query easily
    var testClass = '.' + memberOf[i];
    //this will return me the number of cells with the turn
    var items = contains('#TicTacToe ' + testClass, turn);
    // winning condition: turn == N_SIZE
    if (items.length == N_SIZE) {
      return true;
    }
  }
  //return false otherwise
  return false;
}

/**
 * Helper function to check if NodeList from selector has a particular text
 */
function contains(selector, text) {
  //here I will fetch all the cells with particular testclass
  var elements = document.querySelectorAll(selector);
  //here let me loop through the list and return the exact element
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

//when ever the user clicks on a cell lets have a function to update
function updateTurn() {
  //the base case is to check if the cell is already clicked
  if (this.innerHTML !== EMPTY) {
    return;
  }
  //here onclick I am updating the html with the turn (which is either O or X)
  this.innerHTML = turn;
  //let's increment the moves
  moves += 1;
  //after every update we need to check if either of the player is winning
  if (win(this)) {
    //if we get this true then we will upadte the winner with an alert and start the game
    alert('Winner: Player: ' + turn);
    startNewGame();
  } 
  //players can utmost make 9 moves and if none of them wins then it is a draw
  else if (moves === N_SIZE * N_SIZE) {
    //we will alert it with a  draw message 
    alert('Draw');
    //we will start the game again
    startNewGame();
  } else {
    //if either of these above cases are false then we will update the turn
    //let's use a ternary operator here 
    //so if the turn is 'x' then we il make it 'o' and vice versa
    turn = turn === 'X' ? 'O' : 'X';
    //let's update the turn of the player too
    document.getElementById('turn').textContent = 'Player: ' + turn;
  }
}

init();