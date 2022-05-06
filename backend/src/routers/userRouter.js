const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.get('/', async (req, res) => res.json(await userService.getUsers()));
router.get('/:id', async (req, res) => res.json(await userService.getUser(req.params.id)));
router.put('/:id', async (req, res) => res.json(await userService.updateUser(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json(await userService.deleteUser(req.params.id)));

module.exports = router;