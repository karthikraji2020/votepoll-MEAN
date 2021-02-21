require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const api = require('./server/api');
const cors = require('cors');
const PORT =process.env.PORT || 5000;
const mongooseSets={
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.Promise = global.Promise;
/*const MongoClient = require('mongodb').MongoClient;
 const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/votingpoll";
const uri = process.env.MONGODB_URI ;
const dbName = process.env.MONGODB_DBName || "testdb";
const collectionName = process.env.MONGODB_CollectionName || "testcollection";
  const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true,});
  // const client = new MongoClient(uri, mongooseSets);
client.connect(err => {
  console.log('db connected');
   collection = client.db(dbName).collection(collectionName);
  client.close();
//});*/

  // Connecting to the database
  mongoose.connect(process.env.MONGODB_URI, mongooseSets).then(() => {
      console.log("Successfully connected to the database");    
  }).catch(err => {
      console.log('Could not connect to the database. Exiting now...', err);
      process.exit();
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

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/votingpoll/'}),
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
