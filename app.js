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

    dbClient = client.db("KudosDB").collection("Billennium");
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});


 
app.get("/api/kudos", function(req, res){
        
   
        dbClient.find({}).toArray(function(err, users){
         
        if(err) return console.log(err);
        res.send(users)
    });
     
});

app.post("/api/kudos", function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       
    const kudosValue = req.body.value;
    const kudosFrom = req.body.from;
    const kudosTo = req.body.to;
    const kudosDate = req.body.date;
    const kudosMessage = req.body.message;

    const user = {
                    value: kudosValue,
                    from: kudosFrom,
                    to: kudosTo,
                    date:kudosDate,
                    message:kudosMessage
                 };
    console.log(user)
     
    dbClient.insertOne(user, function(err, result){
               
        if(err) return console.log(err);
        res.send(user);
    });
});

//-----------------
let user = {
    "company":"billennium",
    "value":
        [
            "Zaufanie","Kreatywność","Rozwój","Energia","Profesjonalizm"],
    "users":
        [   
            {"name":"Arkadiusz Brzostowski","email":"a.brzostowski@neonet.pl"},
            {"name":"Adam Adam","email":"Adam.Adam@billennium.com"}
        ]
     }
 
 //----------------    PUSH NEW USERS INTO LIST
app.post("/api/configuration/users", function (req, res) {
       
        if(!req.body) return res.sendStatus(400);
           
        const newUsers = req.body.users;
        const user = {
            usersArray : newUsers
        }
         
        dbClient.findOneAndUpdate({company:"billennium"},
            {$set: {usersArray: user}},
            function(err, result){
                   
                if(err) return console.log(err);
                console.log(newUsers);
                //res.send(user);
        });
});    

//-------------------
app.post("/api/configuration", function (req, res) {
       
        if(!req.body) return res.sendStatus(400);
           
        const companyName = req.body.company;
        const companyValue = req.body.value;
        const usersList = req.body.users;
    
        const user = {
                        company: companyName,
                        valueCompany: companyValue,
                        usersArray: usersList
                     };
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