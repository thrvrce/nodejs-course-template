const boardsRepo = require('./boards.memory.repository');

const getAll = (boardId) => boardsRepo.getAll(boardId);
const getById = (boardId) => boardsRepo.getById(boardId)
const createboard = (boardData) => 
  // const boardParams = {...boardData, boardId: boardData.boardId ||  boardId};
   boardsRepo.createboard(boardData);
const updateboard = (boardId, boardData) => boardsRepo.updateboard(boardId, boardData);
const deleteboard = (boardId ) => boardsRepo.deleteboard(boardId);

module.exports = { getAll, getById, createboard, updateboard, deleteboard };
