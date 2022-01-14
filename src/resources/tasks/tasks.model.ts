import {v4 as uuid} from 'uuid'

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

export class Task implements ITask {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  /**
   * Creates new Task object
   * @param {Partial<ITask>} param0 object with properties title, order, descriprion, userId, boardId, columnId
   * @returns {ITask} new ITask object with given properties
   */
  constructor(taskData: Partial<ITask>) {
    this.id = taskData.id ??  uuid();
    this.title = taskData.title ??  '';
    this.order = taskData.order ??  0;
    this.description = taskData.description ??  '';
    this.userId = taskData.userId ??  null;
    this.boardId = taskData.boardId ??  null;
    this.columnId = taskData.columnId ??  null;
  }

  /**
   * Return Task object without sensitive data
   * @param {ITask} task task object
   * @returns {ITask} Task object without sensitive data
   */
  static toResponse(task: ITask) {
    return task;
  }
}
