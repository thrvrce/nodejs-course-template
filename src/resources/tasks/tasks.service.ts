import * as tasksRepo from './tasks.memory.repository';

export const {getAll} = tasksRepo;
export const {getById} = tasksRepo
export const {createtask} = tasksRepo;
export const {updatetask} = tasksRepo;
export const {deletetask} = tasksRepo;
export const {deleteTaskByDoardId} = tasksRepo;
export const {unassignTaskByUserId} = tasksRepo;
