import {Router, Request, Response, NextFunction } from 'express';
import {Board} from './boards.model';
import * as  boardService from './boards.service';

export const router = Router({mergeParams: true});

router.route('/').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const board = await boardService.getAll();
    res.status(200)
    res.json(board.map(Board.toResponse));
  } catch (err) {
    next(err)
  }
});

router.route('/:boardId').get(async (req: Request, res: Response, next: NextFunction) => {
try {
  const [board] = await boardService.getById(req.params.boardId);
  res.status(board ? 200 : 404)
  res.json(Board.toResponse(board));
  } catch (err) {
    next(err)
  }
})

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const board = await boardService.createboard( req.body);
    res.status(201)
    res.json(Board.toResponse(board));
  } catch (err) {
    next(err)
  }
})

router.route('/:boardId').put(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const board =  await boardService.updateboard(req.params.boardId, req.body);
    res.status(board? 200 : 400)
    res.json(board? Board.toResponse(board): {});
  } catch (err) {
    next(err)
  }
})

router.route('/:boardId').delete(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const board =  await boardService.deleteboard(req.params.boardId);
    res.status(board? 204 : 404)
    res.json(board? {id : Board.toResponse(board).id}: {});
  } catch (err) {
    next(err)
  }
})
