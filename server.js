require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const api = require('./server/api');
const Post = require('./server/models/post');
const cors = require('cors');
const PORT =process.env.PORT || 5000;
const mongooseSets={
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};
var collection;


mongoose.Promise = global.Promise;


const MongoClient = require('mongodb').MongoClient;
// const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/votingpoll";
const uri = process.env.MONGODB_URI ;
const dbName = process.env.MONGODB_DBName || "testdb";
const collectionName = process.env.MONGODB_CollectionName || "testcollection";
  const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true,});
  // const client = new MongoClient(uri, mongooseSets);
client.connect(err => {
  console.log('db connected');
   collection = client.db(dbName).collection(collectionName);
  client.close();
});


//middlewares 
app.use(cors());

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use('/api', api);

app.use(express.static('./dist/votingpoll'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.post('/testapi/posts', function(req, res) {
  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    url: req.body.url
  })
  
  console.log(req.body.title);
  console.log(req.body.url);
  post.save(function(err, rec) {
    if(err) {
      return res.status(400).send("error while creting a post")
    }
    console.log(rec);
    res.send(rec);
  })
});

app.post("/person", (request, response) => {

  console.log(request.body.title);
  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    title: request.body.title,
    url: request.body.url
  })
  collection.insertOne(post, (error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result.result);
  });
});

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/votingpoll/'}),
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
