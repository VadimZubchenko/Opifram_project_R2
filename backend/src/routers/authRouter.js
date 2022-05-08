const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/login', async (req, res) => res.json(await authService.login(req.body)));
router.post('/register', async (req, res) => res.json(await authService.register(req.body)));

module.exports = router;