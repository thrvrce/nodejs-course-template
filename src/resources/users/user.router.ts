import {Router, Request, Response } from 'express';
import {User} from './user.model';
import * as usersService from './user.service';

export const router = Router();

router.route('/').get(async (req: Request, res: Response) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.status(200)
  res.json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req: Request, res: Response) => {
  const [user] = await usersService.getById(req.params.userId);
  res.status(200)
  res.json(User.toResponse(user));
})

router.route('/').post(async (req: Request, res: Response) => {
  const user = await usersService.createUser(req.body);
  res.status(201)
  res.json(User.toResponse(user));
})

router.route('/:userId').put(async (req: Request, res: Response) => {
  const user =  await usersService.updateUser(req.params.userId, req.body);
  res.status(user? 200 : 400)
  res.json(user? User.toResponse(user): {});
})

router.route('/:userId').delete(async (req: Request, res: Response) => {
  const user =  await usersService.deleteUser(req.params.userId);
  res.status(user? 204 : 404)
  res.json(user? User.toResponse(user): {});
})