import {v4 as uuid} from 'uuid'

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export class User implements IUser{
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * Creates new user object
   * @param {IUser} param0 object with name, login, password properties
   * @returns {IUser} new user object
   */
  constructor({
    id = uuid(),
    name='',
    login='',
    password='',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   *  Returns object (based on given IUser) without sensitive data
   * @param {IUser} user user object
   * @returns {{ id: string, name: string, login: string }} user object without sensitive data
   */
  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
