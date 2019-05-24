const STATE_EMPTY = 0;
const STATE_X = 1;
const STATE_O = 2;

class Position {
  constructor(i, j) {
    this.i = i;//row number
    this.j = j;//column number
  }
}

//base class
class Strategy {
  getNextMove(board, player) {
    throw new Error("Not implemented");
  }
}

//derived class
class RandomStrategy extends Strategy {
  getNextMove(board, player) {
    return board.randomEmptyPosition();
  }
}

//derived class
class BetterStrategy extends Strategy {
  getNextMove(board, player) {
    if (board.isEmpty()) {
      return new Position(1, 1);
    }
    const data = board.getData();

    const defenseMove = this.getWinningMoveForPlayer(data, player === STATE_X ? STATE_O : STATE_X);
    if (defenseMove) {
      return defenseMove;
    }

    const attackMove = this.getWinningMoveForPlayer(data, player);
    if (attackMove) {
      return attackMove;
    }

    if (data[1][1] === STATE_EMPTY) {
      return new Position(1, 1);
    }

    return new RandomStrategy().getNextMove(board, player);
  }

  getWinningMoveForPlayer(data, player) {
    const opponent = player === STATE_X ? STATE_O : STATE_X;
    for (let i=0; i<3; i++) {
      if (data[i][0] === data[i][1] && data[i][0] === player && data[i][0] !== STATE_EMPTY && data[i][2] === STATE_EMPTY) {
        return new Position(i, 2);
      } else if (data[i][1] === data[i][2] && data[i][1] === player && data[i][1] !== STATE_EMPTY && data[i][0] === STATE_EMPTY) {
        return new Position(i, 0);
      } else if (data[i][0] === data[i][2] && data[i][0] === player && data[i][0] !== STATE_EMPTY && data[i][1] === STATE_EMPTY) {
        return new Position(i, 1);
      }
    }
    for (let j=0; j<3; j++) {
      if (data[0][j] === data[1][j] && data[0][j] === player && data[0][j] !== STATE_EMPTY && data[2][j] === STATE_EMPTY) {
        return new Position(2, j);
      } else if (data[1][j] === data[2][j] && data[1][j] === player && data[1][j] !== STATE_EMPTY && data[0][j] === STATE_EMPTY) {
        return new Position(0, j);
      } else if (data[0][j] === data[2][j] && data[0][j] === player && data[0][j] !== STATE_EMPTY && data[1][j] === STATE_EMPTY) {
        return new Position(1, j);
      }
    }
    if (data[0][0] === data[1][1] && data[0][0] === player && data[0][0] !== STATE_EMPTY && data[2][2] === STATE_EMPTY) {
      return new Position(2, 2);
    } else if (data[1][1] === data[2][2] && data[1][1] === player && data[1][1] !== STATE_EMPTY && data[0][0] === STATE_EMPTY) {
      return new Position(0, 0);
    } else if (data[0][0] === data[2][2] && data[0][0] === player && data[0][0] !== STATE_EMPTY && data[1][1] === STATE_EMPTY) {
      return new Position(1, 1);
    }
  }
}

class Board {
  constructor() {
    this.data = []; //2D array
    for (let i=0; i<3; i++) { //nested loops
      this.data.push([]);
      for (let j=0; j<3; j++) {
        this.data[i].push(STATE_EMPTY);
      }
    }
  }

  isOccupied(i, j) {
    return this.data[i][j] !== STATE_EMPTY;
  }

  setPosition(i, j, player) {
    this.data[i][j] = player;
  }

  printBoard() {
    for (let i=0; i<3; i++) {
      console.log(`   |   |   `);
      for (let j=0; j<3; j++) {
        if (this.data[i][j] !== STATE_EMPTY) {
          process.stdout.write(`${this.data[i][j] === STATE_X ? ' X ' : ' O '}`);
        } else {
          process.stdout.write("   ");
        }
        if (j !== 2) {
          process.stdout.write("|");
        }
      }
      console.log("");
      if (i !== 2) {
        console.log("___|___|___");
      } else {
        console.log("   |   |   ");
      }
    }
  }

  checkWin(player) {
    for (let i=0; i<3; i++) {
      if (this.data[i][0] === player &&
        this.data[i][0] === this.data[i][1] &&
        this.data[i][1] === this.data[i][2]) { //row
        return true;
      }
    }
    for (let j=0; j<3; j++) {
      if (this.data[0][j] === player &&
        this.data[0][j] === this.data[1][j] &&
        this.data[1][j] === this.data[2][j]) { //column
        return true;
      }
    }
    if (this.data[0][0] === player &&
      this.data[0][0] === this.data[1][1] &&
      this.data[1][1] === this.data[2][2]) { //diagonal
      return true;
    }
    return false;
  }

  checkGameOver() {
    for (let i=0; i<3; i++) {
      for (let j=0; j<3; j++) {
        if (this.data[i][j] === STATE_EMPTY) {
          return false;
        }
      }
    }
    return true;
  }

  randomEmptyPosition() {
    if (this.checkGameOver()) {
      return undefined;
    }
    while (true) {
      const i = Math.floor(Math.random() * 3); //0,1,2
      const j = Math.floor(Math.random() * 3); //0,1,2
      if (this.data[i][j] === STATE_EMPTY) {
        return new Position(i, j);
      }
    }
  }

  isEmpty() {
    for (let i=0; i<3; i++) {
      for (let j=0; j<3; j++) {
        if (this.data[i][j] !== STATE_EMPTY) {
          return false;
        }
      }
    }
    return true;
  }

  getData() {
    return this.data;
  }
}

class TicTacToe {
  constructor() {
    this.board = new Board();
    //this.strategy = new RandomStrategy();
    this.strategy = new BetterStrategy();
    this.humanPlayer = STATE_EMPTY;
  }

  start() {
    process.stdout.write("Pick X or O: ");
    process.stdin.on("data", (input) => {
      const command = input.toString().trim(); //e.g. 1,2

      if (this.humanPlayer === STATE_EMPTY) {
        this.pickPlayer(command);
      } else {
        this.handleMove(command);
      }
    });
  }

  pickPlayer(command) {
    if (command.toUpperCase() === 'X') {
      this.humanPlayer = STATE_X;
      this.board.printBoard();
      this.promptForNextMove();
    } else if (command.toUpperCase() === 'O') {
      this.humanPlayer = STATE_O;
      this.computerMove();
      this.promptForNextMove();
    } else {
      process.stdout.write("Invalid input. Pick X or O: ");
    }
  }

  promptForNextMove() {
    process.stdout.write("Enter the position of your next move? e.g. 1,2: ");
  }

  handleMove(command) {
    const positions = command.split(",");
    if (positions.length !== 2) {
      this.promptForNextMove();
      return;
    }

    const i = parseInt(positions[0]);
    const j = parseInt(positions[1]);
    if (isNaN(i) || isNaN(j) || i < 1 || i > 3 || j < 1 || j > 3) {
      this.promptForNextMove();
      return;
    }

    if (this.board.isOccupied(i-1, j-1)) {
      process.stdout.write("Occupied! Enter another position:");
      return;
    }

    this.board.setPosition(i-1, j-1, this.humanPlayer);

    console.log("Human:");
    this.board.printBoard();

    if (this.board.checkWin(this.humanPlayer)) {
      console.log("Congratulations! You win!");
      process.exit(0);
    }

    if (this.board.checkGameOver()) {
      console.log("Draw!");
      process.exit(0);
    }

    this.computerMove();
    this.promptForNextMove();
  }

  computerMove() {
    const position = this.strategy.getNextMove(this.board);
    this.board.setPosition(position.i, position.j, this.computerPlayer);
    
    console.log("Computer:");
    this.board.printBoard();

    if (this.board.checkWin(this.computerPlayer)) {
      console.log("You lose!");
      process.exit(0);
    }

    if (this.board.checkGameOver()) {
      console.log("Draw!");
      process.exit(0);
    }
  }

  get computerPlayer() {
    return this.humanPlayer === STATE_X ? STATE_O : STATE_X;
  }
}

const ticTacToe = new TicTacToe();
ticTacToe.start();