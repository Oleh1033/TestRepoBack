const express = require("express");
const MongoClient = require("mongodb").MongoClient;
// const objectId = require("mongodb").ObjectID;
const bodyParser = require("body-parser");
   
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

 
const mongoClient = new MongoClient("mongodb+srv://kud:kud@clusterkudos-m11u8.azure.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
 
let dbClient;
let dbClientClose;
 
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    //dbClient = client;
    dbClientClose = client;

    dbClient = client.db("usersdb").collection("users");
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});


 
app.get("/api/users", function(req, res){
        
   
        dbClient.find({}).toArray(function(err, users){
         
        if(err) return console.log(err);
        res.send(users)
    });
     
});

app.post("/api/users", function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       
    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {name: userName, age: userAge};
    console.log(user)
     
    dbClient.insertOne(user, function(err, result){
               
        if(err) return console.log(err);
        res.send(user);
    });
});
 
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClientClose.close();
    process.exit();
});