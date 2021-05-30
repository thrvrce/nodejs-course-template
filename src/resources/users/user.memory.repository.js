const usersDB = require('./user.db.js');
const User = require('./user.model');
const taskService = require('../tasks/tasks.service');

/**
 * Returns array of all users
 * @returns {array} arrayof users
 */
const getAll = async () => usersDB;

/**
 * Returns user object by givn id
 * @param {string} userId user id
 * @returns {aray} array of users with given id
 */
const getById = async (userId) => usersDB.filter((user) => user.id === userId)

/**
 * reates user with given properties
 * @param {object} userData object with user data
 * @returns {object} new object with user data
 */
const createUser = async (userData) => {
  const newUser = new User(userData);
  usersDB.push(newUser);
  return newUser;
}

/**
 * Updates user by id
 * @param {string} userId user id
 * @param {object} userData object with user data for update
 * @returns {object | undefined} updated user object
 */
const updateUser = async (userId, userData) => {
  const [user] = await getById(userId);
  if (user) {
    Object.keys(userData).forEach(property => {user[property] = userData[property]});
  }

  return user;
}

/**
 * Deletes user by id
 * @param {string} userId
 * @returns {object | undefined} deleted user object
 */
const deleteUser = async (userId) => {
  const [user] = await getById(userId);

  const userIndex = usersDB.indexOf(user);

  let deletedUser;
  if (userIndex !== -1) {
    [deletedUser] = usersDB.splice(userIndex, 1);
    taskService.unassignTaskByUserId(deletedUser.id);
  }

  return deletedUser;
}

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
