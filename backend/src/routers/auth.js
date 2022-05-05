const express = require('express');
const router = express.Router();
const authService = require('../services/auth');

router.post('/login', async (req, res) => res.json(await authService.login(req.body)));

module.exports = router;