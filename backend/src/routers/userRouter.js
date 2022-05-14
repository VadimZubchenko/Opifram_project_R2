const express = require('express');
const { checkPermission, authenticate } = require('../middleware');
const router = express.Router();
const userService = require('../services/userService');

router.get('/', authenticate, checkPermission, async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
});

router.get('/:id', authenticate, checkPermission, async (req, res) => {
  const user = await userService.getUser(req.params.id);
  res.json(user);
});

router.post('/', async (req, res) => {
  const createdUser = await userService.createUser(req.body);
  res.json(createdUser);
});

router.put('/:id', authenticate, checkPermission, async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);
  res.json(updatedUser);
});

router.delete('/:id', authenticate, checkPermission, async (req, res) => {
  const deletedUser = await userService.deleteUser(req.params.id);
  res.json(deletedUser);
});

module.exports = router;
