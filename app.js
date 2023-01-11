require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const http = require('http');
const { errorHandler } = require('./middlewares/error');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();
require('./db');
const io = new Server(server, {
  cors: 'https://movie-review-pi.vercel.app',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
});
const userRouter = require('./routes/user');
const actorRouter = require('./routes/actor');
const movieRouter = require('./routes/movie');
const reviewRouter = require('./routes/review');
const adminRouter = require('./routes/admin');
const { handleNotFound } = require('./utils/helper');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/user', userRouter);
app.use('/api/actor', actorRouter);
app.use('/api/movie', movieRouter);
app.use('/api/review', reviewRouter);
app.use('/api/admin', adminRouter);
app.use('/*', handleNotFound);

app.use(errorHandler);
app.set('socketio', io);
// app.post("/sign-in",
//   (req, res, next) => {
//     const { email, password } = req.body
//     if (!email || !password)
//       return res.json({ error: 'email/ password missing!' })
//     next()
//   },
//   (req, res) => {
//     res.send("<h1>Hello I am from your backend about</h1>");
//   });

app.listen(8000, () => {
  console.log('the port is listening on port 8000');
});
