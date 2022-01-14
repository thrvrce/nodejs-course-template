import {Router, Request, Response, NextFunction } from 'express';
import  {Task, ITask} from './tasks.model';
import * as taskService from './tasks.service';

export const router = Router({mergeParams: true});

router.route('/').get( (req: Request, res: Response, next: NextFunction) => {
  try {
    const task =  taskService.getAll(req.params.boardId);
    res.status(200)
    res.json(task.map(Task.toResponse));
  } catch (err) {
    next(err)
  }
});

router.route('/:taskId').get( (req: Request, res: Response, next: NextFunction) => {
  try {
    const [task] =  taskService.getById(req.params.taskId);
    res.status(task ? 200 : 404)
    res.json(Task.toResponse(task));
  } catch (err) {
    next(err)
  }
})

router.route('/').post( (req: Request<{boardId: string}, Record<string, unknown>, Partial<ITask>>, res: Response, next: NextFunction) => {
  try {
    const taskParams = {...req.body, boardId: req.body.boardId ||  req.params.boardId};
    const task =  taskService.createtask(taskParams);
    res.status(201)
    res.json(Task.toResponse(task));
  } catch (err) {
    next(err)
  }
})

router.route('/:taskId').put( (req: Request<{taskId: string}, Record<string, unknown>, Partial<ITask>>, res: Response, next: NextFunction) => {
  try {
    const task = taskService.updatetask(req.params.taskId, req.body);
    res.status(task? 200 : 400)
    res.json(task? Task.toResponse(task): {});
  } catch (err) {
    next(err)
  }
})

router.route('/:taskId').delete( (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = taskService.deletetask(req.params.taskId);
    res.status(task? 204 : 404)
    res.json(task? Task.toResponse(task): {});
  } catch (err) {
    next(err)
  }
})
