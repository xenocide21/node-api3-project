const express = require('express');
const server = express();

server.use(express.json());

// const cors = require('cors');
// server.use(cors());

const logger = require('./middleware/logger-middleware');
server.use(logger);

const helmet = require('helmet');
server.use(helmet());

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})
server.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message

  })
})

module.exports = server;