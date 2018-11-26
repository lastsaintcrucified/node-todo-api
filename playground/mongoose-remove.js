const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');


// Todo.remove({}).then((res) =>{
//   console.log(res);
// });

Todo.findOneAndRemove({_id:'5bfb61d8b624d9049ef186ae'}).then((todo) =>{

});

Todo.findByIdAndRemove('5bfb61d8b624d9049ef186ae').then((todo) =>{
  console.log(todo);
})
