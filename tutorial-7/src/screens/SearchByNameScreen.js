const Screen = require('./Screen');
const SearchResultsScreen = require('./SearchResultsScreen');

class SearchByNameScreen extends Screen {
  constructor(context) {
    super(context);
  }

  show() {
    console.log("Search by name");
    console.log("");
    process.stdout.write("Enter the first few characters of the name: ");
  }

  handleCommand(command) {
    const cmd = command.toLowerCase();
    if (cmd) {
      this.context.ui.goToScreen(new SearchResultsScreen(this.context, cmd));
    } else {
      this.context.ui.back();
    }
  }
}

module.exports = SearchByNameScreen;