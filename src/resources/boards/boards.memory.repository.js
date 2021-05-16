const boardsDB = require('./boards.db');
const Board = require('./boards.model');
const taskService = require('../tasks/tasks.service');

const getAll = async (boardId) => boardId && boardId !== 'undefined' ? boardsDB.filter(board =>  board.id === boardId) : boardsDB;
const getById = async (boardId) => boardsDB.filter((board) => board.id === boardId)
const createboard = async (boardData) => {
  const newboard = new Board(boardData);
  boardsDB.push(newboard);
  return newboard;
}
const updateboard = async (boardId, boardData) => {
  const [board] = await getById(boardId);
  if (board) {
    Object.keys(boardData).forEach(property => {board[property] = boardData[property]});
  }

  return board;
}

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
