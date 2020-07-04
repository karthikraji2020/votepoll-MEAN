require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const api = require('./server/api');
const cors = require('cors');
const PORT =process.env.PORT || 8080;
const mongooseSets={
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

app.use(express.json());
mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DBName;
const collectionName = process.env.MONGODB_CollectionName;
const client = new MongoClient(uri, mongooseSets);

client.connect(err => {
    console.log('db connected');
  const collection = client.db(dbName).collection(collectionName);
  client.close();
});

//middlewares 
app.use(cors());
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
