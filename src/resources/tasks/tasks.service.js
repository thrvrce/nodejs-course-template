const tasksRepo = require('./tasks.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);
const getById = (taskId) => tasksRepo.getById(taskId)
const createtask = (boardId, taskData) => {
  const taskParams = {...taskData, boardId: taskData.boardId ||  boardId};
  return tasksRepo.createtask(taskParams)};
const updatetask = (taskId, taskData) => tasksRepo.updatetask(taskId, taskData);
const deletetask = (boardId, taskId) => tasksRepo.deletetask(boardId, taskId);
const deleteTaskByDoardId = (boardId) => tasksRepo.deleteTaskByDoardId(boardId);

module.exports = { getAll, getById, createtask, updatetask, deletetask, deleteTaskByDoardId };
