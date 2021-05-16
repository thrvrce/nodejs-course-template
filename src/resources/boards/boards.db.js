const uuid = require('uuid').v4;


const boardsDB = [
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

module.exports = boardsDB;