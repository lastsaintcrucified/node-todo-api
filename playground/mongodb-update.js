// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) =>{
  if(err){
    return console.log('Unable to connect to the MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5bf1c13e30f09f937356749e')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // },{
  //   returnOriginal: false
  // }).then((result) =>{
  //   console.log(result);
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5bf02ae6c28723225c8d3f69')
  }, {
    $set: {
      name: 'Towhidul Islam'
    }, $inc: {
        age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) =>{
    console.log(result);
  });



  client.close();
});
