const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./secret');

const data = require('./server/api/data');
const record = require('./server/api/record');

const uri = 'mongodb://nick:'+process.env.PASS+'@stepsdb-shard-00-00-zpfxq.mongodb.net:27017,stepsdb-shard-00-01-zpfxq.mongodb.net:27017,stepsdb-shard-00-02-zpfxq.mongodb.net:27017/test?ssl=true&replicaSet=stepsdb-shard-0&authSource=admin&retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function mgdb() {
    try {
      await mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log('connected!');
    } catch (err) {
      console.log(err);
    }
  }
  
mgdb();

app.use('/data', data);
app.use('/record', record);

// app.get('/',(req,res)=>{
//     res.send('Hello world!')
// })

app.listen(port, ()=>{
    console.log(`Listening on prot ${port}`)
})