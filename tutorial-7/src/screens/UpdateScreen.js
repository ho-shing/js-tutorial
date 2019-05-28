const Screen = require('./Screen');
const User = require('../User');

const UPDATE_FIELD_NAME = 0;
const UPDATE_FIELD_GENDER = 1;
const UPDATE_FIELD_PHONE_NUMBER = 2;
const UPDATE_FIELD_CONFIRM = 3;

class UpdateScreen extends Screen {
  constructor(context, userId) {
    super(context);
    this.userId = userId;
    this.currentField = UPDATE_FIELD_NAME;
    this.name = undefined;
    this.gender = undefined;
    this.phoneNumber = undefined;
  }

  show() {
    console.log("Update");
    console.log("");
    const user = this.context.storage.getUser(this.userId);
    this.showEnterName(user.name);
  }

  handleCommand(command) {
    const user = this.context.storage.getUser(this.userId);
    switch (this.currentField) {
      case UPDATE_FIELD_NAME:
        if (command) {
          this.name = command;
        }
        this.showEnterGender(user.gender);
        this.currentField = UPDATE_FIELD_GENDER;
        break;
      case UPDATE_FIELD_GENDER: 
        if (command && (command.toUpperCase() === 'M' || command.toUpperCase() === 'F')) {
          this.gender = command.toUpperCase();
        }
        this.showEnterPhoneNumber(user.phoneNumber);
        this.currentField = UPDATE_FIELD_PHONE_NUMBER;
        break;
      case UPDATE_FIELD_PHONE_NUMBER:
        if (command && !isNaN(parseInt(command))) {
          this.phoneNumber = command;
        }
        console.log("");
        console.log(`User ID: ${user.userId}`);
        console.log(`Name: ${this.name || user.name}`);
        console.log(`Gender: ${this.gender || user.gender}`);
        console.log(`Phone number: ${this.phoneNumber || user.phoneNumber}`);
        console.log("");
        this.showEnterConfirmed();
        this.currentField = UPDATE_FIELD_CONFIRM;
        break;
      case UPDATE_FIELD_CONFIRM:
        if (command) {
          if (command.toUpperCase() === 'Y') {
            this.updateAndSaveUser();
            this.context.ui.back();
          } else {
            this.context.ui.back();
          }
        } else {
          this.showEnterConfirmed();
        }
        break;
    }
  }

  showEnterName(defaultName) {
    process.stdout.write(`Name [${defaultName}]: `);
  }

  showEnterGender(defaultGender) {
    process.stdout.write(`Gender [${defaultGender}]: `);
  }

  showEnterPhoneNumber(defaultPhoneNumber) {
    process.stdout.write(`Phone number [${defaultPhoneNumber}]: `);
  }

  showEnterConfirmed() {
    process.stdout.write("Confirmed [Y/N]: ");
  }

  updateAndSaveUser() {
    const user = this.context.storage.getUser(this.userId);
    const updatedUser = new User(this.name || user.name, this.gender || user.gender, this.phoneNumber || user.phoneNumber, user.userId, user.createdAt, new Date());
    this.context.storage.saveUser(updatedUser);
  }
}

module.exports = UpdateScreen;