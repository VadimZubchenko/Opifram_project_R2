require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('./config');
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const { errorHandler,unknownEndpoint, requestLogger, extractToken } = require('./middleware');

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB: ${MONGODB_URI}`);
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });

app.use(express.json());
app.use(requestLogger);

app.use('/api/product', extractToken, productRouter);
app.use('/api/order', extractToken, orderRouter);
app.use('/api/user', extractToken, userRouter);
app.use('/api/auth', authRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT);
console.log('Server is running in port: ' + PORT);
