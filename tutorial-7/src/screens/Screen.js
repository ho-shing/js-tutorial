class Screen {
  constructor(context) {
    this.context = context;
  }

  show() {
    throw new Error("Not implemented! You should show the screen.");
  }

  handleCommand(command) {
    throw new Error("Not implemented! You should handle command.");
  }
}

module.exports = Screen;