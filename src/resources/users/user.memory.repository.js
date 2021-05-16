const usersDB = require('./user.db.js');
const User = require('./user.model');
const taskService = require('../tasks/tasks.service');

const getAll = async () => usersDB;
const getById = async (userId) => usersDB.filter((user) => user.id === userId)
const createUser = async (userData) => {
  const newUser = new User(userData);
  usersDB.push(newUser);
  return newUser;
}
const updateUser = async (userId, userData) => {
  const [user] = await getById(userId);
  if (user) {
    Object.keys(userData).forEach(property => {user[property] = userData[property]});
  }

  return user;
}

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
