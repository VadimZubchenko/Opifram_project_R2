const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/login', async (req, res) => {
  const loggedUser = await authService.login(req.body);
  res.json(loggedUser);
});

router.post('/register', async (req, res) => {
  const loggedUser = await authService.register(req.body);
  res.json(loggedUser);
});

module.exports = router;