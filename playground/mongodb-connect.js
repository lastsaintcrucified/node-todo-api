// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) =>{
  if(err){
    return console.log('Unable to connect to the MongoDB server');
  }

  console.log('Connected to MongoDB server');

//   const db = client.db('TodoApp');
//
//   // db.collection('Todos').insertOne({
//   //   text: 'something to do',
//   //   completed: 'false'
//   // },(err, result) =>{
//   //   if(err){
//   //     return console.log('Unable to insert todo',err);
//   //   }
//   //
//   //
//   //   console.log(JSON.stringify(result.ops, undefined, 2));
//   // });
//
//   db.collection('Users').insertOne({
//     name: 'Towhidul Islam',
//     age: 26,
//     location: 'Halishahar,I block, Chittagong'
//   },(err, result) =>{
//     if(err){
//       return console.log('Unable to insert Users',err);
//     }
//
//     console.log(JSON.stringify(result.ops, undefined, 2));
//   });
//
  client.close();
});

// const MongoClient = require('mongodb').MongoClient;
//
// MongoClient.connect('mongodb://localhost:27017/Whassup',(err, client) =>{
//   if(err){
//     return console.log('Unable to connect to mongodb', err);
//   }
//   console.log('COnnected to the mongodb');
//
//   const db = client.db('Whassup');
//
//   db.collection('wait_what').insertOne({
//     question: 'Whassup ma\'nigga?',
//     answer: 'Nothing upp',
//     surprise:'Wait What!!'
//   },(err, result) =>{
//     if(err){
//       return console.log('Unable to insert data', err);
//     }
//     console.log('inserted successfully to "Whassup"');
//     console.log(JSON.stringify(result.ops, undefined, 2));
//   })
// })
