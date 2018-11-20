// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) =>{
  if(err){
    return console.log('Unable to connect to the MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  //deletemany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) =>{
  //   console.log(result);
  // })

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) =>{
  //   console.log(result);
  // })

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: 'false'}).then((result) =>{
  //   console.log(JSON.stringify(result.value,undefined,2));
  // })
  db.collection('Users').deleteMany({name: 'Towhidul Islam'}).then((result) =>{
    console.log(result);
  });
  db.collection('Users').findOneAndDelete({_id: new ObjectID('5bf1b91030f09f937356724c')}).then((result) =>{
    console.log(`Deleted item is ${JSON.stringify(result.value,undefined,2)}`);
  })
  client.close();
});
