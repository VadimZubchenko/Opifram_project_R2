require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('./config');
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const { errorHandler, unknownEndpoint, requestLogger } = require('./middleware');

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

//Simple request logger
app.use(requestLogger);

//Routes
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

//Handle unknown routes
app.use(unknownEndpoint);

//Handle errors
app.use(errorHandler);

//Start
app.listen(PORT);
console.log('Server is running in port: ' + PORT);
