const uuid = require('uuid').v4;

class Task {
  /**
   * Creates new Task object
   * @param {object} param0 object with properties title, order, descriprion, userId, boardId, columnId
   * @returns {object} new user object with given properties
   */
  constructor({
    id = uuid(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
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
   * @param {object} task task object
   * @returns Task object without sensitive data
   */
  static toResponse(task) {



    return task;

  } ;
}

module.exports = Task;
