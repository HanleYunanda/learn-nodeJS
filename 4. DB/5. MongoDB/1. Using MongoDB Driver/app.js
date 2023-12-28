import { MongoClient } from 'mongodb';
import { equal } from 'assert';

const url = "mongodb://localhost:27017";
const dbName = "fruitsDB";
const client = new MongoClient(url);

client.connect(function(err) {
    equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    client.close();
});