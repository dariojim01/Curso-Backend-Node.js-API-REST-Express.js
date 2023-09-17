const express = require('express');
const { faker }  = require('@faker-js/faker');

const cors = require('cors');

const routerApi = require('./routes');

const {logErrors, errorHandler, boomErrorHandler}= require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

const whiteList = ['http://localhost','https://myapp.com'];
const options = {
  origin: (origin, callback) =>{
    if (whiteList.includes(origin)) {
      callback(null,true);
    }else{
      callback(new Error('no permitido'));
    }
  }
}

app.use(cors(options));
//app.use(cors());

app.get('/',(req, res)=>{
  res.send('Hello my server in express');
})

app.get('/new-route',(req, res)=>{
  res.send('Hello my new route');
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(port, ()=>{
  console.log('My port' + port);
})
