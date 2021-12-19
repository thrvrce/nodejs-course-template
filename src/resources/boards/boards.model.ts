import {v4 as uuid} from 'uuid'
import {IBoard, Column} from './boards.db'

export class Board implements IBoard{
  id: string;

  title: string;

  columns: Array<Column>;

  /**
 * Board object constructor
 * @param {string} title board title
 * @param {Array<Column>} columns board columns array
 * @returns {IBoard} new Board object
 */
  constructor({
    id = uuid(),
    title = '',
    columns = [] as Array<Column>,
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Returns IBoard object
   * @param {IBoard} board board object
   * @returns {IBoard} board object
   */
  static toResponse(board: Board) {
    return board;
  }
}
