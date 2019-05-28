const USER_ID_LENGTH = 4;

class User {
  constructor(name, gender, phoneNumber, userId, createdAt, lastModifiedAt) {
    this.name = name;
    this.gender = gender;
    this.phoneNumber = phoneNumber;
    this.userId = userId || this.generateRandomUserId();
    this.createdAt = createdAt || new Date();
    this.lastModifiedAt = lastModifiedAt || new Date();
  }

  generateRandomUserId() {
    const chars = '0123456789';
    let result = '';
    for (let i = USER_ID_LENGTH; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }
}

module.exports = User;