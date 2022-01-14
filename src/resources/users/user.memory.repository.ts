import * as taskService from '../tasks/tasks.service';
import {usersDB} from './user.db';
import {User, IUser} from './user.model';

/**
 * Returns array of all users
 * @returns { Promise<IUser[]>} Promise with array of users
 */
const getAll = async () => usersDB;

/**
 * Returns user object by given id
 * @param {string} userId user id
 * @returns {Promise<IUser[]>} Promise with array of users with given id
 */
const getById = async (userId: string) => usersDB.filter((user) => user.id === userId)

/**
 * Creates user with given properties
 * @param {IUser} userData object with user data
 * @returns {Promise<User>} Promise with new object with user data
 */
const createUser = async (userData: IUser) => {
  const newUser = new User(userData);
  usersDB.push(newUser);
  return newUser;
}

/**
 * Updates user by id
 * @param {string} userId user id
 * @param {IUser} userData object with user data for update
 * @returns {Promise<IUser>} Promise with updated user object
 */
const updateUser = async (userId: string, userData: IUser) => {
  const [user] = await getById(userId);
  if (user) {
    user.id = userData.id ? userData.id : user.id;
    user.name = userData.name ? userData.name : user.name;
    user.login = userData.login ? userData.login : user.login;
    user.password = userData.password ? userData.password : user.password;
  }

  return user;
}

/**
 * Deletes user by id
 * @param {string} userId
 * @returns {Promise<IUser | undefined>} Promise with deleted user object
 */
const deleteUser = async (userId: string) => {
  const [user] = await getById(userId);

  const userIndex = usersDB.indexOf(user);

  let deletedUser;
  if (userIndex !== -1) {
    [deletedUser] = usersDB.splice(userIndex, 1);
    taskService.unassignTaskByUserId(deletedUser.id);
  }

  return deletedUser;
}

export { getAll, getById, createUser, updateUser, deleteUser };
