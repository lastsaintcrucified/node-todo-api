const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var{User} = require('./models/user')
var port = process.env.PORT || 3000;
var app = express();


app.use(bodyParser.json());



app.post('/todos', (req, res) =>{
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) =>{
    res.send(doc);
  },(e) =>{
    res.status(400).send(e);
  })
});



app.get('/todos',(req, res) =>{
  Todo.find().then((todos) =>{
    res.send({todos});
  }, (e) =>{
    res.status(400).send(e);
  })
});



// GET /todos/1233121212
app.get('/todos/:id',(req, res) =>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) =>{
    if(!todo){
      return res.status(400).send();
    }
    res.send({todo});
  }, (e) =>{
    return console.log(e);
  });
});



app.delete('/todos/:id',(req, res) =>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) =>{
    if(!todo){
      return res.status(400).send();
    }
    res.send({todo});
  }).catch((e) => res.status(400).send(e));
});



app.patch('/todos/:id',(req, res) =>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);
  if(!ObjectID.isValid(id)){
    return res.status(400).send();
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
    if(!todo){
      return res.status(404).send({});
    }
    res.send({todo});
  }).catch((e) => res.status(400).send());

});



app.listen(port,() =>{
  console.log(`Uploaded on ${port}....`);
});


module.exports = {app};
