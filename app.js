const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const keys = require('./keys')
const kudoRouter = require('./routes/kud')

const CONNECTION_URL = "mongodb+srv://kudos:kudos@clusterkudos-m11u8.azure.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "Kudos";

var app = Express();
app.use('/api/kudo', kudoRouter)

//app.use(BodyParser.json());
//app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("company");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.get("/", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send('result');
    });
});

app.get("/kudos", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/person", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});