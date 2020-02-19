const express = require('express');
const server = express();
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const helmet = require('helmet')
const logger = require('./middleware/logger')

server.use(logger('short'))
server.use(helmet())
server.use(express.json());
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((req,res)=>{
  res.status(404).json({message: "Not Found"})
})

server.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({message: err.message})
})




module.exports = server;
