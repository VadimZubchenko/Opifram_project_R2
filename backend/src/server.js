require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('./config');
const productRouter = require('./controllers/product');
const { errorHandler, unknownEndpoint } = require('./middleware');

const app = express();

//MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to MongoDB: ${MONGODB_URI}`);
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });

//JSON parser
app.use(express.json());

//Routes
app.use('/api/product', productRouter);

//Very simple error handler so that the app won't crash
app.use(errorHandler);

//Handle unknown routes
app.use(unknownEndpoint);

//Start
app.listen(PORT);
console.log('Server is running in port: ' + PORT);
