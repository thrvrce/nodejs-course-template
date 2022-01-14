import {Router, Request, Response, NextFunction } from 'express';
import {User, IUser} from './user.model';
import * as usersService from './user.service';

export const router = Router();

router.route('/').get( (req: Request, res: Response, next: NextFunction) => {
  try {
    const users =  usersService.getAll();
    res.status(200)
    res.json(users.map(User.toResponse));
  } catch (err) {
    next(err)
  }
});

router.route('/:userId').get( (req: Request, res: Response, next: NextFunction) => {
  try {
    const [user] =  usersService.getById(req.params.userId);
    res.status(200)
    res.json(User.toResponse(user));
  } catch (err) {
    next(err)
  }
})

router.route('/').post( (req: Request<Record<string, unknown>, Record<string, unknown>, IUser>, res: Response, next: NextFunction) => {
  try {
    const user =  usersService.createUser(req.body);
    res.status(201)
    res.json(User.toResponse(user));
  } catch (err) {
    next(err)
  }
})

router.route('/:userId').put( (req: Request<{userId: string}, Record<string, unknown>, IUser>, res: Response, next: NextFunction) => {
  try {
    const user =   usersService.updateUser(req.params.userId, req.body);
    res.status(user? 200 : 400)
    res.json(user? User.toResponse(user): {});
  } catch (err) {
    next(err)
  }
})

router.route('/:userId').delete( (req: Request, res: Response, next: NextFunction) => {
  try {
    const user =   usersService.deleteUser(req.params.userId);
    res.status(user? 204 : 404)
    res.json(user? User.toResponse(user): {});
  } catch (err) {
    next(err)
  }
})
