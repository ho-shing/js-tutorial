const UserDirectoryContext = require('./UserDirectoryContext');
const HomeScreen = require('./screens/HomeScreen');

class UserDirectoryUI {
  constructor(storage) {
    this.screenStack = [];
    this.storage = storage;
  }

  start() {
    this.goToScreen(new HomeScreen(new UserDirectoryContext(this, this.storage)));
    process.stdin.on("data", (input) => {
      const command = input.toString().trim();
      this.screenStack[this.screenStack.length - 1].handleCommand(command);
    });
  }

  goToScreen(screen) {
    this.screenStack.push(screen);
    this.showLastScreen();
  }

  back() {
    this.screenStack.pop();
    this.showLastScreen();
  }

  goToHomeScreen() {
    this.screenStack.splice(1, this.screenStack.length - 1);
    this.showLastScreen();
  }

  showLastScreen() {
    console.log('\x1Bc'); //clear screen
    this.screenStack[this.screenStack.length - 1].show();
  }
}

module.exports = UserDirectoryUI;