const express = require('express');
const { checkPermission } = require('../middleware');
const router = express.Router();
const userService = require('../services/userService');

router.get('/', checkPermission, async (req, res) => res.json(await userService.getUsers()));
router.get('/:id', checkPermission, async (req, res) =>res.json(await userService.getUser(req.params.id)));
router.put('/:id', checkPermission, async (req, res) =>res.json(await userService.updateUser(req.params.id, req.body)));
router.delete('/:id', checkPermission, async (req, res) =>res.json(await userService.deleteUser(req.params.id)));

module.exports = router;
