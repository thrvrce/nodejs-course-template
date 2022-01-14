import * as  boardsRepo from './boards.memory.repository';

const {getAll} = boardsRepo;
const {getById} = boardsRepo
const {createboard} = boardsRepo;
const {updateboard} = boardsRepo;
const {deleteboard} = boardsRepo;

export  { getAll, getById, createboard, updateboard, deleteboard };
