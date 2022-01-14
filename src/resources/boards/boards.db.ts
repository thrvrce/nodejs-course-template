import {v4 as uuid} from 'uuid'

export type Column = {
  title: string;
  order: number;
}

export interface IBoard  {
  id: string;
  title: string;
  columns: Array<Column>
}
export const boardsDB: Array<IBoard> = [
  {
    id : '1',
    title : 'title_1',
    columns : [],
  },
  {
    id : 'undefined',
    title : 'title_1',
    columns : [],
  },
  {
    id : '2',
    title : 'title_2',
    columns : [],
  },
  {
    id : uuid(),
    title : 'title_3',
    columns : [],
  },
]
