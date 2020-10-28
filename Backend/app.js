const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const app = express();
app.get('/', (req, res) => {
  res.send('Welcome to TT World!');
});

app.use( express.json() );
app.use(cookieParser());
app.use(cors());


app.use('/api/v1/users', userRouter);
module.exports = app;