const UserDirectoryUI = require('./UserDirectoryUI');
const UserDirectoryStorage = require('./UserDirectoryStorage');

const FILENAME = "user-directory.json";

const storage = new UserDirectoryStorage(FILENAME);
storage.loadFile();
const userDirectoryUI = new UserDirectoryUI(storage);
userDirectoryUI.start();