const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
var cors = require('cors');

const app = express();
app.use(cors());
// const jsonParser = express.json();
const jsonParser = express.json();
 
const mongoClient = new MongoClient("mongodb://localhost:27017/");
 
let dbClient;
 
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client.db("netproject");
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

//INCIDENTS
app.get("/api/incidents", function(req, res){
        
    const collection = dbClient.collection("incidents");
    collection.find({}).toArray(function(err, incidents){
         
        if(err) throw err;
        res.send(incidents)
    });
});

app.get("/api/incidents/:id", function(req, res){
    const id = new objectId(req.params.id);
    const collection = dbClient.collection("incidents");
    collection.findOne({_id: id}, function(err, incident){
               
        if(err) throw err;
        res.send(incident);
    });
});

app.post("/api/incidents", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    const collection = dbClient.collection("incidents");
    collection.insertOne(req.body, function(err, result){

        if(err) throw err;
        res.send(req.body);
    });
});

app.delete("/api/incidents/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = dbClient.collection("incidents");
    collection.findOneAndDelete({_id: id}, function(err, result){
               
        if(err) throw err;    
        let incident = result.value;
        res.send(incident);
    });
});

app.put("/api/incidents", jsonParser, function(req, res){
        
    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body._id);
       
    const collection = dbClient.collection("incidents");
    collection.findOneAndUpdate({_id: id}, { $set: {dueDate: req.body.dueDate, assignee: req.body.assignee, status: req.body.status, description: req.body.description}},
         {returnDocument: "after" },function(err, result){
               
        if(err) return console.log(err);     
        const incident = result.value;
        res.send(incident);
    });
});

app.patch("/api/incidents", jsonParser, function(req, res){
        
    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body._id);
       
    const collection = dbClient.collection("incidents");
    collection.findOneAndUpdate({_id: id}, { $set: {assignee: req.body.assignee}},
         {returnDocument: "after" },function(err, result){
               
        if(err) return console.log(err);     
        const incident = result.value;
        res.send(incident);
    });
});


// //USERS
app.get("/api/users", function(req, res){
        
    const collection = dbClient.collection("users");
    collection.find({}).toArray(function(err, users){
         
        if(err) throw err;
        res.send(users)
    });
});

app.get("/api/users/:id", function(req, res){
    const id = new objectId(req.params.id);
    const collection = dbClient.collection("users");
    collection.findOne({_id: id}, function(err, user){
               
        if(err) throw err;
        res.send(user);
    });
});

app.post("/api/users", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    const collection = dbClient.collection("users");
    collection.insertOne(req.body, function(err, result){

        if(err) throw err;
        res.send(req.body);
    });
})

app.delete("/api/users/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = dbClient.collection("users");
    collection.findOneAndDelete({_id: id}, function(err, result){
               
        if(err) throw err;    
        let user = result.value;
        res.send(user);
    });
});

app.put("/api/users", jsonParser, function(req, res){
        
    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body._id);
       
    const collection = dbClient.collection("users");
    collection.findOneAndUpdate({_id: id}, { $set: {
        fullname: req.body.fullname, 
        incidents: req.body.incidents, 
        dateOfBirth: req.body.dateOfBirth, 
        login: req.body.login,
        position: req.body.position
        }},
         {returnDocument: "after" },function(err, result){
               
        if(err) return console.log(err);     
        const user = result.value;
        res.send(user);
    });
});

app.patch("/api/users", jsonParser, function(req, res){// изменить инцидент
        
    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body._id);
       
    const collection = dbClient.collection("users");
    collection.findOneAndUpdate({_id: id}, { $set: {incidents: req.body.incidents}},
         {returnDocument: "after" },function(err, result){
               
        if(err) return console.log(err);     
        const user = result.value;
        res.send(user);
    });
});


// //PROCESS
app.get("/api/process", function(req, res){
        
    const collection = dbClient.collection("process");
    collection.find({}).toArray(function(err, users){
        if(err) throw err;
        res.send(users)
    });
});

app.patch("/api/process", jsonParser, function(req, res){// изменить инцидент
        
    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body._id);
       
    const collection = dbClient.collection("process");
    collection.findOneAndUpdate({_id: id}, { $set: {toStatus: req.body.toStatus}},
         {returnDocument: "after" },function(err, result){
               
        if(err) return console.log(err);     
        const process = result.value;
        res.send(process);
    });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});




// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const url = 'mongodb://localhost:27017/netcracker';

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended : false}));

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.on('connected', () => {
//     console.log('Мы успешно подключились к БД');
// });
// mongoose.connection.on('error', (err) => {
//     console.log('Мы не подключились к БД: ' + err);
// });


// app.get('/', (req, res) => {
//     res.send('Главная страница');
// })

// app.get('/api/incidents', (req, res) => {
//     // res.send('Инциденты');
//     console.log(req);
//     // const collection = req.app.locals.collection;
//     // collection.find({}).toArray(function(err, incidents){
         
//     //     if(err) return console.log(err);
//     //     res.send(incidents);
//     // });
// });

// app.get('/api/process', (req, res) => {
//     res.send('Процесс');
// });

// app.get('/api/users', (req, res) => {
//     res.send('Процесс');
// });

// app.listen(port, () => {
//     console.log("Сервер был запущен по порту: " + port);
// });
