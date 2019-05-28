const Screen = require('./Screen');
const UserScreen = require('./UserScreen');

class ListUsersScreen extends Screen {
  constructor(context) {
    super(context);
    this.users = [];
  }

  show() {
    console.log("All users");
    console.log("");
    const users = this.context.storage.listUsers();
    this.users = users;
    if (users.length > 0) {
      users.forEach((user, i) => {
        console.log(`${i+1}. ${user.name} [ID: ${user.userId}]`);
      });
    } else {
      console.log("The directory is empty!");
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

module.exports = ListUsersScreen;