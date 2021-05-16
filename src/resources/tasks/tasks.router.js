const router = require('express').Router({mergeParams: true});
const Task = require('./tasks.model');
const taskService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  const task = await taskService.getAll(req.params.boardId);

  res.status(200)
  res.json(task.map(Task.toResponse));
});

router.route('/:taskId').get(async (req, res) => {

  const [task] = await taskService.getById(req.params.taskId);

  res.status(task ? 200 : 404)
  res.json(Task.toResponse(task));
})

router.route('/').post(async (req, res) => {

  const task = await taskService.createtask(req.params.boardId, req.body);
  res.status(201)
  res.json(Task.toResponse(task));
})

router.route('/:taskId').put(async (req, res) => {
  const task =  await taskService.updatetask(req.params.taskId, req.body);
  res.status(task? 200 : 400)
  res.json(task? Task.toResponse(task): {});
})

router.route('/:taskId').delete(async (req, res) => {
  const task =  await taskService.deletetask(req.params.boardId, req.params.taskId);
  res.status(task? 204 : 404)
  res.json(task? Task.toResponse(task): {});
})

module.exports = router;
