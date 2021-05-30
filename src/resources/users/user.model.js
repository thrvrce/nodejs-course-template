const uuid = require('uuid').v4;

class User {
  /**
   * Creates new user object
   * @param {object} param0 object with name, login, password properties
   * @returns {object} new user object
   */
  constructor({
    id = uuid(),
    name,
    login,
    password
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   *
   * @param {object} user user object
   * @returns user object without sensitive data
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
