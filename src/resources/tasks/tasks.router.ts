import {Router, Request, Response, NextFunction } from 'express';
import  {Task} from './tasks.model';
import * as taskService from './tasks.service';

export const router = Router({mergeParams: true});

router.route('/').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.getAll(req.params.boardId);
    res.status(200)
    res.json(task.map(Task.toResponse));
  } catch (err) {
    next(err)
  }
});

router.route('/:taskId').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [task] = await taskService.getById(req.params.taskId);
    res.status(task ? 200 : 404)
    res.json(Task.toResponse(task));
  } catch (err) {
    next(err)
  }
})

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskParams: { id?: string | undefined; title?: string | undefined; order?: number | undefined; description?: string | undefined; userId?: null | undefined; boardId?: null | undefined; columnId?: null | undefined; } = {...req.body, boardId: req.body.boardId ||  req.params.boardId};
    const task = await taskService.createtask(taskParams);
    res.status(201)
    res.json(Task.toResponse(task));
  } catch (err) {
    next(err)
  }
})

router.route('/:taskId').put(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task =  await taskService.updatetask(req.params.taskId, req.body);
    res.status(task? 200 : 400)
    res.json(task? Task.toResponse(task): {});
  } catch (err) {
    next(err)
  }
})

router.route('/:taskId').delete(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task =  await taskService.deletetask(req.params.taskId);
    res.status(task? 204 : 404)
    res.json(task? Task.toResponse(task): {});
  } catch (err) {
    next(err)
  }
})
