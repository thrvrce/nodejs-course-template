let tasksDB = require('./tasks.db');
const Task = require('./tasks.model');

const getAll = async (boardId) => boardId && boardId !== 'undefined' ? tasksDB.filter(task =>  task.boardId === boardId) : tasksDB;
const getById = async (taskId) => tasksDB.filter((task) => task.id === taskId)
const createtask = async (taskData) => {
  const newtask = new Task(taskData);
  tasksDB.push(newtask);
  return newtask;
}
const updatetask = async (taskId, taskData) => {
  const [task] = await getById(taskId);
  if (task) {
    Object.keys(taskData).forEach(property => {task[property] = taskData[property]});
  }

  return task;
}

const deletetask = async (boardId, taskId) => {
  const [task] = await getById(taskId);

  const taskIndex = tasksDB.indexOf(task);

  let deletedtask;
  if (taskIndex !== -1) {
    [deletedtask] = tasksDB.splice(taskIndex, 1);
  }

  return deletedtask;
}

const deleteTaskByDoardId = async (boardId) => {
  tasksDB = tasksDB.filter( task => task.boardId !== boardId);
}

const unassignTaskByUserId = async (userId) => {
  tasksDB = tasksDB.map( task => {
    const updatetTask = task;
    updatetTask.userId = task.userId === userId ? null : task.userId;
    return updatetTask});
}

module.exports = { getAll, getById, createtask, updatetask, deletetask, deleteTaskByDoardId, unassignTaskByUserId };
