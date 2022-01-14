const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = (userId) => usersRepo.getById(userId)
const createUser = (userData) => usersRepo.createUser(userData);
const updateUser = (userId, userData) => usersRepo.updateUser(userId, userData);
const deleteUser = (userId) => usersRepo.deleteUser(userId);

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
