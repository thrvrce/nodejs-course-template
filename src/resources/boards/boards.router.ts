import {Router, Request, Response, NextFunction } from 'express';
import {Board} from './boards.model';
import * as  boardService from './boards.service';
import { IBoard } from './boards.db';

export const router = Router({mergeParams: true});

router.route('/').get( (req: Request, res: Response, next: NextFunction) => {
  try {
    const board =  boardService.getAll();
    res.status(200)
    res.json(board.map(Board.toResponse));
  } catch (err) {
    next(err)
  }
});

router.route('/:boardId').get( (req: Request, res: Response, next: NextFunction) => {
try {
  const [board] =  boardService.getById(req.params.boardId);
  res.status(board ? 200 : 404)
  res.json(Board.toResponse(board));
  } catch (err) {
    next(err)
  }
})

router.route('/').post( (req: Request<Record<string, unknown>, Record<string, unknown>, IBoard>, res: Response, next: NextFunction) => {
  try {
    const board =  boardService.createboard( req.body);
    res.status(201)
    res.json(Board.toResponse(board));
  } catch (err) {
    next(err)
  }
})

router.route('/:boardId').put( (req: Request< {boardId: string}, Record<string, unknown>, IBoard>, res: Response, next: NextFunction) => {
  try {
    const board =   boardService.updateboard(req.params.boardId, req.body);
    res.status(board? 200 : 400)
    res.json(board? Board.toResponse(board): {});
  } catch (err) {
    next(err)
  }
})

router.route('/:boardId').delete( (req: Request, res: Response, next: NextFunction) => {
  try {
    const board =   boardService.deleteboard(req.params.boardId);
    res.status(board? 204 : 404)
    res.json(board? {id : Board.toResponse(board).id}: {});
  } catch (err) {
    next(err)
  }
})
