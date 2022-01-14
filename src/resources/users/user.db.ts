import {v4 as uuid} from 'uuid'
import { IUser } from './user.model'

export const usersDB: IUser[] = [
  {
    id : '1',
    name : 'name1',
    login : 'login1',
    password : 'password1',
  },
  {
    id : '2',
    name : 'name2',
    login : 'login2',
    password : 'password2',
  },
  {
    id : uuid(),
    name : 'name3',
    login : 'login3',
    password : 'password4',
  },
]
