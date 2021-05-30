let tasksDB = require('./tasks.db');
const Task = require('./tasks.model');

/**
 * Returns array of tasks
 * @param {string | undefined} boardId if given, filter tasks by board id
 * @returns {array} array of all tasks or array of all tasks by board id
 */
const getAll = async (boardId) => boardId && boardId !== 'undefined' ? tasksDB.filter(task =>  task.boardId === boardId) : tasksDB;

/**
 * Returns array with task filterred by id
 * @param {string} taskId task id
 * @returns {array} array with task filterred by id
 */
const getById = async (taskId) => tasksDB.filter((task) => task.id === taskId)
const createtask = async (taskData) => {
  const newtask = new Task(taskData);
  tasksDB.push(newtask);
  return newtask;
}

/**
 * Updates task by id
 * @param {string} taskId task id
 * @param {object} taskData tasks new values
 * @returns {object} updated task
 */
const updatetask = async (taskId, taskData) => {
  const [task] = await getById(taskId);
  if (task) {
    Object.keys(taskData).forEach(property => {task[property] = taskData[property]});
  }

  return task;
}

/**
 * Deletes task by board and task id
 * @param {string} boardId board id
 * @param {string} taskId task id
 * @returns {object} deleted task
 */
const deletetask = async (boardId, taskId) => {
  const [task] = await getById(taskId);

  const taskIndex = tasksDB.indexOf(task);

  let deletedtask;
  if (taskIndex !== -1) {
    [deletedtask] = tasksDB.splice(taskIndex, 1);
  }

  return deletedtask;
}

/**
 * Deletes all tasks by board id
 * @param {string} boardId board id
 * @returns {undefined} nothing
 */
const deleteTaskByDoardId = async (boardId) => {
  tasksDB = tasksDB.filter( task => task.boardId !== boardId);
}

/**
 * Unassigns tasks for given user by user it
 * @param {string} userId user id
 * @returns {undefined} nothing
 */
const unassignTaskByUserId = async (userId) => {
  tasksDB = tasksDB.map( task => {
    const updatetTask = task;
    updatetTask.userId = task.userId === userId ? null : task.userId;
    return updatetTask});
}

module.exports = { getAll, getById, createtask, updatetask, deletetask, deleteTaskByDoardId, unassignTaskByUserId };
