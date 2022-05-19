/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const express = require('express');
const app = express();
const _port = process.env.PORT || 4100;
const _app_folder = 'dist/admin-app';

// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, { maxAge: '1y' }));

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
  res.status(200).sendFile('/', { root: _app_folder });
});

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
  console.log('Node Express server for ' + app.name + ' listening on http://localhost:' + _port);
});