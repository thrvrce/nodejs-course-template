import  {tasksDB} from './tasks.db';
import  {Task, ITask } from './tasks.model';
/**
 * Returns array of tasks
 * @param {string | undefined} boardId if given, filter tasks by board id
 * @returns {Promise<ITask[]>} Promise with array of all tasks or array of all tasks by board id
 */
export const getAll =  (boardId: string | undefined) => boardId && boardId !== 'undefined' ? tasksDB.filter(task =>  task.boardId === boardId) : tasksDB;

/**
 * Returns array with task filterred by id
 * @param {string} taskId task id
 * @returns {Promise<ITask[]>} array with task filterred by id
 */
export const getById =  (taskId: string) => tasksDB.filter((task) => task.id === taskId)
/**
 * Creates task
 * @param {Partial<ITask>} taskData data for new task
 * @returns {Promise<Task>} returns promise with created task
 */
export const createtask = (taskData: Partial<ITask>) => {
  const newtask = new Task(taskData);
  tasksDB.push(newtask);
  return newtask;
}

/**
 * Updates task by id
 * @param {string} taskId task id
 * @param {Partial<ITask>} taskData tasks new values
 * @returns {Promise<ITask>} Promise with updated task
 */
export const updatetask =  (taskId: string, taskData: Partial<ITask>) => {
  const [task] =  getById(taskId);
  if (task) {
    task.id = taskData.id ? taskData.id : task.id;
    task.title = taskData.title ? taskData.title : task.title;
    task.order = taskData.order ? taskData.order : task.order;
    task.description = taskData.description ? taskData.description : task.description;
    task.userId = taskData.userId ? taskData.userId : task.userId;
    task.boardId = taskData.boardId ? taskData.boardId : task.boardId;
    task.columnId = taskData.columnId ? taskData.columnId : task.columnId;
  }

  return task;
}

/**
 * Deletes task by id
 * @param {string} taskId task id
 * @returns {Promise<ITask | undefined>} Promise with deleted task
 */
export const deletetask =  (taskId: string) => {
  const [task] =  getById(taskId);

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
 * @returns {void} Promise with nothing
 */
export const deleteTaskByDoardId = (boardId: string): void => {
  let boardIndex = tasksDB.findIndex(task => task.boardId=== boardId);
  while( boardIndex !== -1) {
    tasksDB.splice(boardIndex, 1)
    boardIndex = tasksDB.findIndex(task => task.boardId=== boardId);
  }
}

/**
 * Unassigns tasks for given user by user it
 * @param {string} userId user id
 * @returns {Promise<void>} Promise with nothing
 */
export const unassignTaskByUserId = (userId: string) => {
  tasksDB.forEach( task => {
    const updatetTask = task;
    updatetTask.userId = task.userId === userId ? null : task.userId;
  });
}


