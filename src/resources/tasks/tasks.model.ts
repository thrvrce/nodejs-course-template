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
   * @param {{ id?: string | undefined; title?: string | undefined; order?: number | undefined; description?: string | undefined; userId?: null | undefined; boardId?: null | undefined; columnId?: null | undefined; }} param0 object with properties title, order, descriprion, userId, boardId, columnId
   * @returns {ITask} new ITask object with given properties
   */
  constructor({
    id = uuid(),
    title = '',
    order = 0,
    description = '',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
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
