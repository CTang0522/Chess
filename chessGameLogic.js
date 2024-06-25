/*
  Notes for Additional Changes

  - Add Intricate Chess Moves such as Castling and En Passant
  - 

*/

let winner = 0;
let turn = 1;
let player = 1;
let started = false;
let pauseGame = false;
let promotionPiece;


//Basic Game Board Board
let newBoard = [
  [[2, "R"], [2, "N"], [2, "B"], [2, "Q"], [2, "K"], [2, "B"], [2, "N"], [2, "R"]],
  [[2, "P"], [2, "P"], [2, "P"], [2, "P"], [2, "P"], [2, "P"], [2, "P"], [2, "P"]],
  [[0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"]],
  [[0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"]],
  [[0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"]],
  [[0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"]],
  [[1, "P"], [1, "P"], [1, "P"], [1, "P"], [1, "P"], [1, "P"], [1, "P"], [1, "P"]],
  [[1, "R"], [1, "N"], [1, "B"], [1, "Q"], [1, "K"], [1, "B"], [1, "N"], [1, "R"]],
];

//Test Board Checking Promoting Functionality
let newBoard2 = [
  [[2, "R"], [2, "N"], [2, "B"], [0, "0"], [2, "K"], [2, "B"], [2, "N"], [2, "R"]],
  [[2, "P"], [2, "P"], [2, "P"], [1, "P"], [2, "P"], [2, "P"], [2, "P"], [2, "P"]],
  [[0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"]],
  [[0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"]],
  [[0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"]],
  [[0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"], [0, "0"]],
  [[1, "P"], [1, "P"], [1, "P"], [1, "P"], [1, "P"], [1, "P"], [1, "P"], [1, "P"]],
  [[1, "R"], [1, "N"], [1, "B"], [1, "Q"], [1, "K"], [1, "B"], [1, "N"], [1, "R"]],
];

let board = [];

let formatted = []
let whiteChecked = false
let blackChecked = false

// 0 = Empty Space
// P = Pawn
// R = Rook
// N = Knight
// B = Bishop
// Q = Queen
// K = King

function printBoard() {
  let res = "         Col [0]  Col [1]  Col [2]  Col [3]  Col [4]  Col [5]  Col [6]  Col [7]\n";
  for (let i = 0; i < 8; i++) {
    res += "Row [" + i + "]: ";
    for (let j = 0; j < 8; j++) {
      res += board[i][j] + " ";
    }
    res += "\n";
  }
  window.alert(res);
}

function validMoves(piece, team, row, col) {
  piece = String(piece)
  team = String(team)
  row = parseInt(row)
  col = parseInt(col)


  let validSpots = [];
  if (piece === "P") {
    if (team === "1") {
      if (row > 0) {
        if (board[row - 1][col][0] === 0) {
          validSpots.push([row - 1, col]);
        }
        if (col > 0 && board[row - 1][col - 1][0] === 2) {
          validSpots.push([row - 1, col - 1]);
        }
        if (col < 7 && board[row - 1][col + 1][0] === 2) {
          validSpots.push([row - 1, col + 1]);
        }
      }
      if (row === 6 && board[row - 2][col][0] === 0 && board[row - 1][col][0] === 0) {
        validSpots.push([row - 2, col]);
      }
    } else {
      if (row < 7) {
        if (board[row + 1][col][0] === 0) {
          validSpots.push([row + 1, col]);
        }
        if (col > 0 && board[row + 1][col - 1][0] === 1) {
          validSpots.push([row + 1, col - 1]);
        }
        if (col < 7 && board[row + 1][col + 1][0] === 1) {
          validSpots.push([row + 1, col + 1]);
        }
      }
      if (row === 1 && board[row + 2][col][0] === 0 && board[row + 1][col][0] === 0) {
        validSpots.push([row + 2, col]);
      }
    }
  } else if (piece === "R") {
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (let dr of directions) {
      let tempCol = col;
      let tempRow = row;
      let stopped = false;
      while (!stopped) {
        tempRow += dr[0];
        tempCol += dr[1];
        if (tempRow <= 7 && tempRow >= 0 && tempCol <= 7 && tempCol >= 0) {
          if (board[tempRow][tempCol][0] === 0) {
            validSpots.push([tempRow, tempCol]);
          } else if (board[tempRow][tempCol][0] === 2 && team === "1") {
            validSpots.push([tempRow, tempCol]);
            stopped = true;
          } else if (board[tempRow][tempCol][0] === 1 && team === "2") {
            validSpots.push([tempRow, tempCol]);
            stopped = true;
          } else {
            stopped = true;
          }
        } else {
          stopped = true;
        }
      }
    }
  } else if (piece === "B") {
    let directions = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (let dr of directions) {
      let tempCol = col;
      let tempRow = row;
      let stopped = false;
      while (!stopped) {
        tempRow += dr[0];
        tempCol += dr[1];
        if (tempRow <= 7 && tempRow >= 0 && tempCol <= 7 && tempCol >= 0) {
          if (board[tempRow][tempCol][0] === 0) {
            validSpots.push([tempRow, tempCol]);
          } else if (board[tempRow][tempCol][0] === 2 && team === "1") {
            validSpots.push([tempRow, tempCol]);
            stopped = true;
          } else if (board[tempRow][tempCol][0] === 1 && team === "2") {
            validSpots.push([tempRow, tempCol]);
            stopped = true;
          } else {
            stopped = true;
          }
        } else {
          stopped = true;
        }
      }
    }
  } else if (piece === "Q") {
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (let dr of directions) {
      let tempCol = col;
      let tempRow = row;
      let stopped = false;
      while (!stopped) {
        tempRow += dr[0];
        tempCol += dr[1];
        if (tempRow <= 7 && tempRow >= 0 && tempCol <= 7 && tempCol >= 0) {
          if (board[tempRow][tempCol][0] === 0) {
            validSpots.push([tempRow, tempCol]);
          } else if (board[tempRow][tempCol][0] === 2 && team === "1") {
            validSpots.push([tempRow, tempCol]);
            stopped = true;
          } else if (board[tempRow][tempCol][0] === 1 && team === "2") {
            validSpots.push([tempRow, tempCol]);
            stopped = true;
          } else {
            stopped = true;
          }
        } else {
          stopped = true;
        }
      }
    }
  } else if (piece === "N") {
    let directions = [[-2, -1], [-2, 1], [2, -1], [2, 1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
    for (let dr of directions) {
      let tempCol = col + dr[1];
      let tempRow = row + dr[0];
      if (tempRow <= 7 && tempRow >= 0 && tempCol <= 7 && tempCol >= 0) {
        if (team === "1" && (board[tempRow][tempCol][0] === 0 || board[tempRow][tempCol][0] === 2)) {
          validSpots.push([tempRow, tempCol]);
        } else if (team === "2" && (board[tempRow][tempCol][0] === 0 || board[tempRow][tempCol][0] === 1)) {
          validSpots.push([tempRow, tempCol]);
        }
      }
    }
  } else if (piece === "K") {
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (let dr of directions) {
      let tempRow = row + dr[0];
      let tempCol = col + dr[1];
      if (tempRow <= 7 && tempRow >= 0 && tempCol <= 7 && tempCol >= 0) {
        if (team === "1" && (board[tempRow][tempCol][0] === 0 || board[tempRow][tempCol][0] === 2)) {
          validSpots.push([tempRow, tempCol]);
        } else if (team === "2" && (board[tempRow][tempCol][0] === 0 || board[tempRow][tempCol][0] === 1)) {
          validSpots.push([tempRow, tempCol]);
        }
      }
    }
  }

  let result = []
  validSpots.forEach(move => {
    if(!testMove(board,[board[row][col][1],board[row][col][0],row,col],move,team)){
      result.push(move)
    }
  });
  return result
  
}

function check(board, team) {
  //Tests if (team) is currently in check on the board variable

  let checked = false;
  let king = [team, "K"];
  let row, col;
  let kingRow,kingCol;
  for (row = 0; row < 8; row++) {
    for (col = 0; col < 8; col++) {
      if (board[row][col][0] === king[0] && board[row][col][1] === king[1]) {
        kingRow=row;
        kingCol=col;
        console.log("Row: "+row.toString()+" Col: "+col.toString())
      }
    }
  }
  row = kingRow
  col = kingCol
  if (team === 1) {
    let pieces = [];
    for (let rowTwo = 0; rowTwo < 8; rowTwo++) {
      for (let colTwo = 0; colTwo < 8; colTwo++) {
        if (board[rowTwo][colTwo][0] === 2) {
          let x = board[rowTwo][colTwo];
          pieces.push([x[1], x[0], rowTwo, colTwo]);
        }
      }
    }
    let allMoves = [];
    for (let piece of pieces) {
      let currMoves = validMoves(piece[0], piece[1], piece[2], piece[3]);
      if (currMoves.length !== 0) {
        allMoves.push(currMoves);
      }
    }
    for (let moves of allMoves) {
      for (let move of moves) {
        if (move[0] === row && move[1] === col) {
          checked = true;
          window.alert("Player 1 Is In Check");
        }
      }
    }
  } else {
    let pieces = [];
    for (let rowTwo = 0; rowTwo < 8; rowTwo++) {
      for (let colTwo = 0; colTwo < 8; colTwo++) {
        if (board[rowTwo][colTwo][0] === 1) {
          let x = board[rowTwo][colTwo];
          pieces.push([x[0], x[1], rowTwo, colTwo]);
        }
      }
    }
    let allMoves = [];
    for (let piece of pieces) {
      let currMoves = validMoves(piece[0], piece[1], piece[2], piece[3]);
      if (currMoves.length !== 0) {
        allMoves.push(currMoves);
      }
    }
    for (let moves of allMoves) {
      for (let move of moves) {
        if (move[0] === row && move[1] === col) {
          checked = true;
          window.alert("Player 2 Is In Check");
        }
      }
    }
  }
  return checked;
}

function checkmate(board, team) {
  let pieces = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col][0] === team) {
        pieces.push([board[row][col][1], board[row][col][0], row, col]);
      }
    }
  }
  for (let piece of pieces) {
    let currMoves = validMoves(piece[0], piece[1], piece[2], piece[3]);
    if (currMoves.length !== 0) {
      for (let move of currMoves) {
        if (!testMove(board, piece, move, team)) {
          return false;
        }
      }
    }
  }
  return true;
}

function testMove(board, piece, move, team) {

  //make deep copy of the board so test move does not edit original board
  let testBoard = []
  board.forEach(elem => {
    let i = []
    elem.forEach(elem2 => {
      i.push(elem2)
    })
    testBoard.push(i)
  })

  let blank = [0, "0"];
  let curr = board[piece[2]][piece[3]];
  testBoard[move[0]][move[1]] = curr;
  testBoard[piece[2]][piece[3]] = blank;
  return check(testBoard, team);
}

function startGame(){
  started = true
  board = []
  newBoard.forEach(elem => {
    let i = []
    elem.forEach(elem2 => {
      i.push([elem2[0],elem2[1]])
    })
    board.push(i)
  })

  document.getElementById('row').value = ""
  document.getElementById('col').value = ""
  removeClass()
  
  loadBoard()
  turn = 1
  player = 1
  document.getElementById('instructions').innerHTML = "Turn ("+turn+") White to Move"
}

function checkLegalPiece(){
  if(started && (!pauseGame)){
    let x = document.getElementById('row').value;
    let y = document.getElementById('col').value;
    if(x!="" && y!=""){
      if((x>=0 && x<=7) && (y>=0 && y<=7)){
        removeClass()


        if(board[x][y][0] == player){
          document.getElementById(String(x)+String(y)).classList.add('selectedPiece')
          formatted.push([x,y])

          let valid = validMoves(board[x][y][1], board[x][y][0],x,y)
          valid.forEach(([i,j]) => {
            document.getElementById(String(i)+String(j)).classList.add("nextMove")
            formatted.push([i,j])
          });
        }
      }
    } else {
      removeClass()
    } 
  }
}

function removeClass(){
  formatted.forEach(([i,j]) => {
    if(document.getElementById(String(i)+String(j)).classList.contains('selectedPiece')){
      document.getElementById(String(i)+String(j)).classList.remove('selectedPiece')
    }
    if(document.getElementById(String(i)+String(j)).classList.contains('nextMove')){
      document.getElementById(String(i)+String(j)).classList.remove('nextMove')
    }
  });
}

function makeMove(){
  if(started && (!pauseGame)) {
    let x = String(document.getElementById('row').value)
    let y = String(document.getElementById('col').value)
    let destinationRow = String(document.getElementById('rowMove').value)
    let destinationCol = String(document.getElementById('colMove').value)


    if(x!="" && y!="" && destinationRow!="" && destinationCol!=""){
      if((x>=0 && x<=7) && (y>=0 && y<=7) && (destinationRow>=0 && destinationRow<=7) && (destinationCol>=0 && destinationCol<=7)){
        if(board[x][y][0] === player){
          let validTurn = validMoves(board[x][y][1],player,x,y)
          if(validTurn.some(move => move[0] === parseInt(destinationRow) && move[1] === parseInt(destinationCol))){
            let blank = [0, "0"]
            let piece = board[x][y]
            board[destinationRow][destinationCol] = piece
            board[x][y] = blank



            if(destinationRow == "0" && ((board[destinationRow][destinationCol][0]) == 1) && ((board[destinationRow][destinationCol][1]) == "P")){
              console.log("promote White")
              promotion(parseInt(destinationRow),parseInt(destinationCol));
            } else if (destinationRow == "7" && board[destinationRow][destinationCol] == [2, "P"]) {
              console.log("promote Black")
              promotion(parseInt(destinationRow),parseInt(destinationCol));
            } else {
              console.log("advancing!!!")
              advanceTurn()
            }

            

          } else {
            //Typed Move Doesnt Work
          }
        }
      }
    }
  }
}

function advanceTurn(){
  if(player == 1){
    if (checkmate(board,2)){
      winner = 1
      document.getElementById('instructions').innerHTML = "White Wins, Checkmate"
    }
    else if(check(board,2)) {
      player = 2
      document.getElementById('instructions').innerHTML = "Turn ("+turn+") Black to Move. Black in Check"
      turn += 1
    } 
    else {
      player = 2;
      document.getElementById('instructions').innerHTML = "Turn ("+turn+") Black to Move"
      turn += 1
    }

  } else {
    if (checkmate(board,1)){
      winner = 2
      document.getElementById('instructions').innerHTML = "Black Wins, Checkmate"
    }
    else if(check(board,1)) {
      player = 1
      document.getElementById('instructions').innerHTML = "Turn ("+turn+") White to Move. White in Check"
      turn += 1
    } 
    else {
      player = 1;
      document.getElementById('instructions').innerHTML = "Turn ("+turn+") White to Move"
      turn += 1
    }
  }
  document.getElementById('row').value = ""
  document.getElementById('col').value = ""
  document.getElementById('rowMove').value = ""
  document.getElementById('colMove').value = ""
  removeClass()
  loadBoard()
}

function pictureName(pieceInput,team){
    let name = ""
    let piece = String(pieceInput)
    if (parseInt(team) == 1){
        name+="./assets/white"
    }
    else if (parseInt(team) == 2){
        name+="./assets/black"
    }

    if (piece == "P"){
        name += "Pawn.png"
    }
    else if (piece == "R"){
        name += "Rook.png"
    }
    else if (piece == "N"){
        name += "Knight.png"
    }
    else if (piece == "B"){
        name += "Bishop.png"
    }
    else if (piece == "Q"){
        name += "Queen.png"
    }
    else if (piece == "K"){
        name += "King.png"
    }
    return name
}

function loadBoard() {
    for (let i=0; i<8;i++){
        for (let j = 0; j < 8; j ++){
            let x = pictureName(board[i][j][1],board[i][j][0])
            if (x != ""){
              document.getElementById(String(i)+String(j)).innerHTML = ("<img src='"+x+"' class='chessPiece'>")
            } else {
              document.getElementById(String(i)+String(j)).innerHTML = ""
            }
        }
    }
    return true
}

function clickPiece(coordinates){
  if(started && (!pauseGame)){
    console.log("Clicked: "+coordinates)
    let x = coordinates[0]
    let y = coordinates[1]

    if(document.getElementById(coordinates).classList.contains('selectedPiece')){
      document.getElementById('row').value = ""
      document.getElementById('col').value = ""
      checkLegalPiece()
    } else if(document.getElementById(coordinates).classList.contains('nextMove')) {
      document.getElementById('rowMove').value = x
      document.getElementById('colMove').value = y
      makeMove()
    } else {
      document.getElementById('row').value = x
      document.getElementById('col').value = y
      checkLegalPiece()
    }
  }
}

function promotion(row,col){
  if(row == 0){
    console.log("Promoting White?")
    pauseGame = true
    promotionPiece = [row,col]
    document.getElementById('instructions').innerHTML = "White Promote Pawn"
    let text = "<img src='./assets/whiteQueen.png' class='promotionPiece' onclick=\"promoteSelect('Q')\"><img src='./assets/whiteBishop.png' class='promotionPiece' onclick=\"promoteSelect('B')\"><img src='./assets/whiteRook.png' class='promotionPiece' onclick=\"promoteSelect('R')\"><img src='./assets/whiteKnight.png' class='promotionPiece' onclick=\"promoteSelect('N')\">"
    document.getElementById('promotionSelections').innerHTML = text
    document.getElementById('promotionSelections').style.visibility="visible"
      

    
  } else if (row == 7){
    pauseGame = true
    promotionPiece = [row,col]
    document.getElementById('instructions').innerHTML = "Black Promote Pawn"
    let text = "<img src='./assets/blackQueen.png' class='promotionPiece' onclick=\"promoteSelect('Q')\"><img src='./assets/blackBishop.png' class='promotionPiece' onclick=\"promoteSelect('B')\"><img src='./assets/blackRook.png' class='promotionPiece' onclick=\"promoteSelect('R')\"><img src='./assets/blackKnight.png' class='promotionPiece' onclick=\"promoteSelect('N')\">"
    document.getElementById('promotionSelections').innerHTML = text
    document.getElementById('promotionSelections').style.visibility="visible"
    
  }
}

function promoteSelect(pieceType){
  board[promotionPiece[0]][promotionPiece[1]][1] = pieceType;
  loadBoard();
  pauseGame = false;
  document.getElementById('promotionSelections').innerHTML = "";
  document.getElementById('promotionSelections').style.visibility="hidden";

  advanceTurn();
  pauseGame = false;

}

