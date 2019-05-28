const Screen = require('./Screen');
const ListUsersScreen = require('./ListUsersScreen');
const InsertScreen = require('./InsertScreen');
const SearchScreen = require('./SearchScreen');

class HomeScreen extends Screen {

  constructor(context) {
    super(context);
  }

  show() {
    console.log("Home");
    console.log("");
    process.stdout.write(this.getMessage());
  }

  handleCommand(command) {
    const cmd = command.toLowerCase();
    switch (cmd) {
      case 'l':
        this.context.ui.goToScreen(new ListUsersScreen(this.context));
        break;
      case 's':
        this.context.ui.goToScreen(new SearchScreen(this.context));
        break;
      case 'i':
        this.context.ui.goToScreen(new InsertScreen(this.context));
        break;
      default:
        process.stdout.write(`Invalid command. ${this.getMessage()}`);
        break;
    }
  }

  getMessage() {
    return "Enter command [l: list all users, s: search, i: insert]: ";
  }
}

module.exports = HomeScreen;