const boardsDB = require('./boards.db');
const Board = require('./boards.model');
const taskService = require('../tasks/tasks.service');
/**
 * Returns array of all boards or by board.id if it specified
 * @param {string | undefined} boardId board.id or undefined
 * @returns {array} array of all boards or boads with specific id
 */
const getAll = async (boardId) => boardId && boardId !== 'undefined' ? boardsDB.filter(board =>  board.id === boardId) : boardsDB;

/**
 * Returns board by id
 * @param {string} boardId board.id property
 * @returns {object} board object
 */
const getById = async (boardId) => boardsDB.filter((board) => board.id === boardId)

/**
 * Creates new board object
 * @param {object} boardData object with board properties
 * @returns {object} board object
 */
const createboard = async (boardData) => {
  const newboard = new Board(boardData);
  boardsDB.push(newboard);
  return newboard;
}

/**
 * Updates board by id
 * @param {string} boardId board.id property
 * @param {object} boardData object with board new propertt values
 * @returns {object | undefined} updated board object
 */
const updateboard = async (boardId, boardData) => {
  const [board] = await getById(boardId);
  if (board) {
    Object.keys(boardData).forEach(property => {board[property] = boardData[property]});
  }

  return board;
}

/**
 * Deletes board by id
 * @param {string} boardId board.id property
 * @returns {object | undefined} deleted board object
 */
const deleteboard = async (boardId) => {
  const [board] = await getById(boardId);

  const boardIndex = boardsDB.indexOf(board);

  let deletedboard;
  if (boardIndex !== -1) {
    [deletedboard] = boardsDB.splice(boardIndex, 1);
    taskService.deleteTaskByDoardId(boardId)
  }

  return deletedboard;
}

module.exports = { getAll, getById, createboard, updateboard, deleteboard };
