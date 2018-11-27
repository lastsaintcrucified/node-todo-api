const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
var {app} = require('./../server.js');
var {Todo} = require('./../models/todo.js');
const todos = [{
  _id: new ObjectID,
  text: 'Some to do'
},{
  _id: new ObjectID,
  text:'Another to do',
  completed: true,
  completedAt: 3333
},{
  _id: new ObjectID,
  text:'What to do'
}];



beforeEach((done) =>{
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
})



describe('POST/todos',() =>{
  it('should create a todo',(done) =>{
    var text = 'Test todo text';
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) =>{
      expect(res.body.text).toBe(text);
    }).end((err, res) =>{
      if(err){
        return done(err);
      }
      Todo.find({text}).then((todos) =>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });


  describe('POST/todos #invalid input',() =>{
    it('should not create todo with invalid body data',(done) =>{
      request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .expect((res) =>{
        expect(res.body.text).tobBe('');
      }).end((err, res) =>{
        if(err){
          return done();
        }
        Todo.find().then((todos) =>{
          expect(todos.length).toBe(3);
          done();
        }).catch((e) => done(e));
      });
    });
  })
});



describe('GET/todos', () =>{
  it('should return todos',(done) =>{

    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) =>{
      expect(res.body.todos.length).toBe(3);
    })
    .end(done);
  })
});


describe('GET /todos/id',() =>{
  it('should return todo doc with valid id',(done) =>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) =>{
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done);
  });
  it('should return a 400 if todo is not found',(done) =>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(400)
    .expect((res) =>{
      expect(res.body.todo).toBe({})
    })
    .end((err,res) =>{
      if(err){
        return done();
      }
      Todo.find().then((todos) =>{
        expect(todos.length).toBe(0)
      }).catch((e) => done(e))
    });
  });

  it('should return 404 for non object id',(done) =>{
    request(app)
    .get('/todos/1234')
    .expect(404)
    .end(done);
  });
});


describe('DELETE /todos/id',() =>{
  it('should remove a todo', (done) =>{
    var id = todos[2]._id.toHexString();
    request(app)
    .delete(`/todos/${id}`)
    .expect(200)
    .expect((res) =>{
      expect(res.body.todo.id).toBe(id);
    })
    .end((err, res) =>{
      if(err){
        return done();
      }
      Todo.findById(id).then((doc) =>{
        expect(res.body.doc).toBeFalsy();
      }).catch((e) => done(e));
    });
  });
  it('should return 400 if todo is not found', (done) =>{
    var id = new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${id}`)
    .expect(400)
    .expect((res) =>{
      expect(res.body.todo).toBeFalsy();
    })
    .end(done);
  });

  it('should return 404 if object id is invalid', (done) =>{
    request(app)
    .get('/todos/1234')
    .expect(404)
    .end(done);
  });
});

describe('PATCH/todos/:id',() =>{
  it('should update the todo',(done) =>{
    var id = todos[1]._id.toHexString();
    var text = "This should be the new text";

    request(app)
    .patch(`/todos/${id}`)
    .send({
      completed: true,
      text
    })
    .expect(200)
    .expect((res) =>{
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
    })
    .end(done)
  })
  it('should clear completedAt when todo is not completed',(done) =>{
    var id = todos[1]._id.toHexString();
    var text = "This should be the new text";
    request(app)
    .patch(`/todos/${id}`)
    .send({
      completed:false,
      text
    })
    .expect(200)
    .expect((res) =>{
      expect(res.body.todo.completedAt).toBeFalsy();
    })
    .end(done);

  });
})
