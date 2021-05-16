const uuid = require('uuid').v4;

class Task {
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

  static toResponse(task) {

    // console.log(task)
    if (task) {
      const { columnId, description, order, title, userId } = task;

      // console.log(typeof )
    return { columnId, description, order, title, userId };
    }

    return task;

  } ;
}

module.exports = Task;
