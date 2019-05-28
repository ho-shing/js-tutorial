const Screen = require('./Screen');
const UserScreen = require('./UserScreen');

class SearchResultsScreen extends Screen {
  constructor(context, keyword) {
    super(context);
    this.keyword = keyword;
    this.users = [];
  }

  show() {
    const users = this.context.storage.searchUsers(this.keyword);
    this.users = users;
    console.log("Search results:");
    console.log("");
    if (users && users.length > 0) {
      users.forEach((user, index) => {
        console.log(`${index+1}. ${user.name} [ID: ${user.userId}]`);
      });
    } else {
      console.log("No search results");
    }
    console.log("");
    process.stdout.write(this.enterCommandMessage());
  }

  handleCommand(command) {
    const cmd = command.toLowerCase();
    switch (cmd) {
      case 'b':
        this.context.ui.back();
        break;
      case 'h':
        this.context.ui.goToHomeScreen();
        break;
      default:
        if (!isNaN(parseInt(cmd))) {
          const index = parseInt(cmd);
          if (index >= 1 && index <= this.users.length) {
            this.context.ui.goToScreen(new UserScreen(this.context, this.users[index-1].userId));
          } else {
            process.stdout.write(`Invalid user. ${this.enterCommandMessage()}`);
          }
        } else {
          process.stdout.write(`Invalid command. ${this.enterCommandMessage()}`);
        }
        break;
    }
  }
  

  enterCommandMessage() {
    return "Select a user or enter command [b: back, h: home]: ";
  }
}

module.exports = SearchResultsScreen;