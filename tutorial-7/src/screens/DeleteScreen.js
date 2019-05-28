const Screen = require('./Screen');

class DeleteScreen extends Screen {
  constructor(context, userId) {
    super(context);
    this.userId = userId;
  }

  show() {
    console.log("Delete a user");
    console.log("");
    const user = this.context.storage.getUser(this.userId);
    if (user) {
      console.log(`User ID: ${user.userId}`);
      console.log(`Name: ${user.name}`);
    } else {
      console.log("No such user");
    }
    console.log("");
    process.stdout.write("Confirmed [Y/N]: ");
  }

  handleCommand(command) {
    const cmd = command.toLowerCase();
    switch (cmd) {
      case 'y':
        this.context.storage.deleteUser(this.userId);
        this.context.ui.back(); //user screen of deleted user
        this.context.ui.back();
        break;
      default:
        this.context.ui.back();
        break;
    }
  }
}

module.exports = DeleteScreen;