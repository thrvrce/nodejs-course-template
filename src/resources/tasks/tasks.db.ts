import {v4 as uuid} from 'uuid'
import { ITask } from './tasks.model'

export const tasksDB: ITask[] = [
  {
    id : '1',
    title : 'title_1',
    order : 0,
    description : 'description_1',
    userId : '1',
    boardId : '1',
    columnId : '1',
  },
  {
    id : 'undefined',
    title : 'title_1',
    order : 0,
    description : 'description_1',
    userId : '1',
    boardId : 'undefined',
    columnId : '1',
  },
  {
    id : '2',
    title : 'title_2',
    order : 0,
    description : 'description_2',
    userId : '2',
    boardId : '2',
    columnId : '1',
  },
  {
    id : uuid(),
    title : 'title_3',
    order : 1,
    description : 'description_3',
    userId : '1',
    boardId : '1',
    columnId : '1',
  },
]
