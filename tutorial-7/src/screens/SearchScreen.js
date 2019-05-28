const Screen = require('./Screen');
const SearchByNameScreen = require('./SearchByNameScreen');
const SearchByIdScreen = require('./SearchByIdScreen');

class SearchScreen extends Screen {
  constructor(context) {
    super(context);
  }

  show() {
    console.log("Search");
    console.log("");
    process.stdout.write(this.getMessage());
  }

  handleCommand(command) {
    const cmd = command.toLowerCase();
    switch (cmd) {
      case 'n':
        this.context.ui.goToScreen(new SearchByNameScreen(this.context));
        break;
      case 'i':
        this.context.ui.goToScreen(new SearchByIdScreen(this.context));
        break;
      case 'b':
        this.context.ui.back();
        break;
      case 'h':
        this.context.ui.goToHomeScreen();
        break;
      default:
        process.stdout.write(`Invalid command. ${this.getMessage()}`);
        break;
    }
  }

  getMessage() {
    return "Enter command [n: search by name, i: search by ID, b: back, h: home]: ";
  }
}

module.exports = SearchScreen;