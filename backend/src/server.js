require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI, PORT, ALLOWED_ORIGINS } = require('./config');
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const cors = require('cors');
const { errorHandler,unknownEndpoint, requestLogger } = require('./middleware');

const app = express();
app.use(cors({ origin: ALLOWED_ORIGINS, optionsSuccessStatus: 200 }));

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });

app.use(express.json());
app.use(requestLogger);

app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT);
console.log('Server is running in port: ' + PORT);
