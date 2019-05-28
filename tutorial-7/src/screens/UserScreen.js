const Screen = require('./Screen');
const UpdateScreen = require('./UpdateScreen');
const DeleteScreen = require('./DeleteScreen');
const moment = require('moment');

class UserScreen extends Screen {
  constructor(context, userId) {
    super(context);
    this.userId = userId;
    this.user = undefined;
  }

  show() {
    console.log("User profile");
    console.log("");
    const user = this.context.storage.getUser(this.userId);
    this.user = user;
    if (user) {
      console.log(`User ID: ${user.userId}`);
      console.log(`Name: ${user.name}`);
      console.log(`Gender: ${user.gender}`);
      console.log(`Phone number: ${user.phoneNumber}`);
      console.log(`Created: ${moment(user.createdAt).format("YYYY-MM-DD HH:mm:ss")}`);
      console.log(`Last modified: ${moment(user.lastModifiedAt).format("YYYY-MM-DD HH:mm:ss")}`);
    } else {
      console.log("No such user");
    }
    console.log("");
    process.stdout.write(this.getMessage());
  }

  handleCommand(command) {
    const cmd = command.toLowerCase();
    switch (cmd) {
      case 'u':
        this.context.ui.goToScreen(new UpdateScreen(this.context, this.userId));
        break;
      case 'd':
        this.context.ui.goToScreen(new DeleteScreen(this.context, this.userId));
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
    return `Enter command [${this.user ? "u: update, d: delete, " : ""}b: back, h: home]: `;
  }
}

module.exports = UserScreen;