const Screen = require('./Screen');
const UserScreen = require('./UserScreen');

class SearchByIdScreen extends Screen {
  constructor(context) {
    super(context);
  }

  show() {
    console.log("Search by ID");
    console.log("");
    process.stdout.write("Enter user ID: ");
  }

  handleCommand(command) {
    const cmd = command.toLowerCase();
    if (cmd) {
      this.context.ui.goToScreen(new UserScreen(this.context, cmd));
    } else {
      this.context.ui.back();
    }
  }
}

module.exports = SearchByIdScreen;