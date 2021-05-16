const router = require('express').Router({mergeParams: true});
const Board = require('./boards.model');
const boardService = require('./boards.service');

router.route('/').get(async (req, res) => {

  const board = await boardService.getAll();

  res.status(200)
  res.json(board.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {

  const [board] = await boardService.getById(req.params.boardId);

  res.status(board ? 200 : 404)
  res.json(Board.toResponse(board));
})

router.route('/').post(async (req, res) => {

  const board = await boardService.createboard( req.body);
  res.status(201)
  res.json(Board.toResponse(board));
})

router.route('/:boardId').put(async (req, res) => {

  const board =  await boardService.updateboard(req.params.boardId, req.body);
  res.status(board? 200 : 400)
  res.json(board? Board.toResponse(board): {});
})

router.route('/:boardId').delete(async (req, res) => {
  const board =  await boardService.deleteboard(req.params.boardId);
  res.status(board? 204 : 404)
  // res.json(board? {id : Board.toResponse(board).id}: {});
  res.json({id: '123'})
})

module.exports = router;
