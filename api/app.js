const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { mongoose } = require('./db/mongoose');



//Load Mongooes models
const { List } = require('./db/models/list.model');
const { Task } = require('./db/models/task.model');



//Middleware
app.use(bodyParser.json());


//ROUTES

/**
 * GET /lists
 * Purpose: Get all lists
 */
app.get("/lists", (req, res)=>{
    //Return array of all list in the database
    List.find({}).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        console.log("Failed GET List");
        console.log(e);
    });
})

/**
 * POST /lists
 * Purpose: Create list
 */
app.post("/lists", (req, res) => {
    //Create new lists and return to the user include id, Lists will be passed in JSON req body

    let newList = new List({
        title: req.body.title,
    });
    
    newList.save().then((list) => {
        //Full list return, include ID
        res.send(list);
    }).catch((e) => {
        console.log("Failed POST List");
        console.log(e);
    });
})


/**
 *  PATH /lists/:id
 *  Purpose: Update list
 */
app.patch("/lists/:id", (req, res) => {
    //Update specified list with the new values specified in the JSON body
    List.findOneAndUpdate({ _id:req.params.id }, { $set: req.body }).then( () => {
        res.sendStatus(200);
    });
});

/**
 * DELETE /list/:id
 * Purpose: Delete list
 */
app.delete("/lists/:id", (req, res) => {
    //Delete specified list
    List.findOneAndRemove({ _id: req.params.id }).then((removeList)=>{
        res.send(removeList);
    })
})


/**
 * GET /lists/:listId/tasks
 * Purpose: Get all task in a specific list
 */
app.get("/lists/:listId/tasks", (req, res) => {
    //return all task that belong to list
    Task.find({
        _listId: req.params.listId
    }).then((tasksDoc) => {
        res.send(tasksDoc);
    });
});

/**
 * POST /lists/:listId/tasks
 * Create new task in a specific list
 */
 app.post("/lists/:listId/tasks", (req, res) => {
     //Create new task in list
     let newTask = Task({
         title: req.body.title,
         _listId: req.params.listId
     });
     newTask.save().then((task) => {
         res.send(task)
     })

 });

 /**
  * PATCH /lists/:listId/tasks/:tasksId
  * Update existing task
  */
 app.patch("/lists/:listId/tasks/:tasksId", (res, req) => {
    //update specify task(id)
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId,
    }, {
        $set: req.body
    }).then(() => {
        res.send(200);
    })
});

/**
 * DELETE /lists/:listId/tasks/:tasksId
 * Delete tasks
 */
app.delete("/lists/:listId/tasks/:tasksId", (res, req) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId,
    }).then((removeTask)=>{
        res.send(removeTask);
    })
});


app.listen(3000, ()=>{
    console.log('Server is listening');
})