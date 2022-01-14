import * as  usersRepo from './user.memory.repository';

const {getAll} = usersRepo
const {getById} = usersRepo
const {createUser} = usersRepo;
const {updateUser} = usersRepo;
const {deleteUser} = usersRepo;

export { getAll, getById, createUser, updateUser, deleteUser };
