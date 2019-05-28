const _ = require('lodash');
const fs = require('fs');

class UserDirectoryStorage {
  constructor(filename) {
    this.filename = filename;
    this.data = {}; //Dictionary of <userId, User>
  }

  loadFile() {
    fs.readFile(this.filename, 'utf8', (error, fileContent) => {
      if (!error) {
        this.data = JSON.parse(fileContent);
      }
    })
  }

  saveFile() {
    fs.writeFile(this.filename, JSON.stringify(this.data), (error) => {
      if (error) {
        console.error("failed to write file!");
      }
    });
  }
  
  listUsers() {
    const users = _.toArray(this.data);
    users.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase());
    return users;
  }

  getUser(userId) {
    if (this.data.hasOwnProperty(userId)) {
      return this.data[userId];
    }
    return undefined;
  }

  saveUser(user) {
    this.data[user.userId] = user;
    this.saveFile();
  }

  searchUsers(nameStartsWith) {
    const users = _.toArray(this.data);
    return users.filter((user) => user.name.toLowerCase().startsWith(nameStartsWith)).sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase());
  }

  deleteUser(userId) {
    if (!userId) {
      return false;
    }
    if (this.data.hasOwnProperty(userId)) {
      delete this.data[userId];
      this.saveFile();
    } else {
      return false;
    }
  }
}

module.exports = UserDirectoryStorage;