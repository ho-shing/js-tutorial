const Screen = require('./Screen');
const User = require('../User');

const INSERT_FIELD_NAME = 0;
const INSERT_FIELD_GENDER = 1;
const INSERT_FIELD_PHONE_NUMBER = 2;
const INSERT_FIELD_CONFIRM = 3;

class InsertScreen extends Screen {
  constructor(context) {
    super(context);
    this.currentField = INSERT_FIELD_NAME;
    this.name = undefined;
    this.gender = undefined;
    this.phoneNumber = undefined;
  }

  show() {
    console.log("Insert a user");
    console.log("");
    this.showEnterName();
  }

  handleCommand(command) {
    switch (this.currentField) {
      case INSERT_FIELD_NAME:
        if (command) {
          this.name = command;
          this.showEnterGender();
          this.currentField = INSERT_FIELD_GENDER;
        } else {
          this.showEnterName();
        }
        break;
      case INSERT_FIELD_GENDER:
        if (command && (command.toUpperCase() === 'M' || command.toUpperCase() === 'F')) {
          this.gender = command.toUpperCase();
          this.showEnterPhoneNumber();
          this.currentField = INSERT_FIELD_PHONE_NUMBER;
        } else {
          this.showEnterGender();
        }
        break;
      case INSERT_FIELD_PHONE_NUMBER:
        if (command && !isNaN(parseInt(command))) {
          this.phoneNumber = command;
          this.showEnterConfirmed();
          this.currentField = INSERT_FIELD_CONFIRM;
        } else {
          this.showEnterPhoneNumber();
        }
        break;
      case INSERT_FIELD_CONFIRM:
        if (command) {
          if (command.toUpperCase() === 'Y') {
            this.createAndSaveUser();
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

  showEnterName() {
    process.stdout.write("Name: ");
  }

  showEnterGender() {
    process.stdout.write("Gender: ");
  }

  showEnterPhoneNumber() {
    process.stdout.write("Phone number: ");
  }

  showEnterConfirmed() {
    process.stdout.write("Confirmed [Y/N]: ");
  }

  createAndSaveUser() {
    const user = new User(this.name, this.gender, this.phoneNumber);
    this.context.storage.saveUser(user);
  }
}

module.exports = InsertScreen;