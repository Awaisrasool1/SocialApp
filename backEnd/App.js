const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser')

const Port = process.env.Port || 8000;
const app = express();
app.use(cookieParser())
app.use(express.json());


//connection with mongoDb
mongoose
  .connect('mongodb://localhost:27017/socialApp')
  .then(() => {
    console.log('connected to database');
  })
  .catch(e => {
    console.log(e);
  });


//All Routes 
const authRouter = require('./src/routes/AuthRoute');
const requestRoute = require('./src/routes/RequestRoute')

app.use('/account', authRouter);
app.use('/request', requestRoute);



app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});
