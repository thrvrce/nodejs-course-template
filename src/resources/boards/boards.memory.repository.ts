import  {boardsDB, IBoard} from './boards.db';
import {Board} from './boards.model';
import * as taskService  from '../tasks/tasks.service';

/**
 * Returns array of all boards
 * @returns {Promise<IBoard[]>} promise with array of all boards or boards with specific id
 */
const getAll = async () => boardsDB;

/**
 * Returns board by id
 * @param {string | undefined} boardId board.id property
 * @returns {Promise<IBoard[]>} promise with board object
 */
const getById = async (boardId: string | undefined) => boardsDB.filter((board) => board.id === boardId)

/**
 * Creates new board object
 * @param {IBoard} boardData object with board properties
 * @returns {Promise<Board>} promise with board object
 */
const createboard = async (boardData: IBoard) => {
  const newboard = new Board(boardData);
  boardsDB.push(newboard);
  return newboard;
}

/**
 * Updates board by id
 * @param {string | undefined} boardId board.id property
 * @param {IBoard} boardData object with board new propertt values
 * @returns {Promise<IBoard>} promise with updated board object
 */
const updateboard = async (boardId: string | undefined, boardData : IBoard) => {
  const [board] = await getById(boardId);
  if (board) {
    board.id = boardData.id ? boardData.id : board.id;
    board.title = boardData.title ? boardData.title : board.title;
    board.columns = boardData.columns ? boardData.columns : board.columns;
  }

  return board;
}

/**
 * Deletes board by id
 * @param {string} boardId board.id property
 * @returns {Promise<IBoard | undefined>} promise with deleted board object
 */
const deleteboard = async (boardId: string) => {
  const [board] = await getById(boardId);

  const boardIndex = boardsDB.indexOf(board);

  let deletedboard;
  if (boardIndex !== -1) {
    [deletedboard] = boardsDB.splice(boardIndex, 1);
    taskService.deleteTaskByDoardId(boardId)
  }

  return deletedboard;
}

export { getAll, getById, createboard, updateboard, deleteboard };
