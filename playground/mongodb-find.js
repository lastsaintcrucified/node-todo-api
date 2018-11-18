// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) =>{
  if(err){
    return console.log('Unable to connect to the MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5bef173954cf820e1c4a166c')
  // }).toArray().then((docs) =>{
  //   console.log(JSON.stringify(docs, undefined, 2));
  // },(err) =>{
  //   if(err){
  //     console.log('Unable to fetch data', err);
  //   }
  // });

  // db.collection('Todos').find().count().then((count) =>{
  //   console.log(`Todos count: ${count}`);
  // },(err) =>{
  //   if(err){
  //     console.log('Unable to fetch data', err);
  //   }
  // });

  db.collection('Users').find({name: 'Towhidul Islam'}).toArray().then((docs) =>{
    console.log(JSON.stringify(docs, undefined, 2));
  },(err) =>{
    if (err) {
      console.log('Unable to fetch', err);
    }
  })



  client.close();
});
