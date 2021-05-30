const uuid = require('uuid').v4;

class Board {
  /**
 * Board object constructor
 * @param {string} title board title
 * @param {array} columns board columns array
 * @returns {object} new Board object
 */
  constructor({
    id = uuid(),
    title,
    columns,
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   *
   * @param {object} board board object
   * @returns {object} board object
   */
  static toResponse(board) {




    return board;

  } ;
}

module.exports = Board;
